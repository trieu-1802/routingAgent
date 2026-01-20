import { createTool as createTool$1, Mastra } from '@mastra/core';
import { MastraModelGateway } from '@mastra/core/llm';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible-v5';
import { Agent } from '@mastra/core/agent';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { tavily } from '@tavily/core';

"use strict";
class MyPrivateGateway extends MastraModelGateway {
  /** Unique gateway ID; prefix in model IDs */
  id = "private";
  name = "LiteLLM Gateway (TrustSoft)";
  /** 
   * Declare providers + model list
   */
  async fetchProviders() {
    return {
      litellm: {
        name: "LiteLLM (TrustSoft)",
        gateway: this.id,
        apiKeyEnvVar: "LITELLM_API_KEY",
        url: process.env.LITELLM_BASE_URL,
        models: [
          "openai/gpt-5-mini",
          "vertex_ai/gemini-2.5-flash-preview-05"
        ]
      }
    };
  }
  /** Base URL cho API OpenAI-compatible */
  buildUrl() {
    const baseUrl = process.env.LITELLM_BASE_URL;
    if (!baseUrl) {
      throw new Error("Missing LITELLM_BASE_URL environment variable");
    }
    return baseUrl;
  }
  /** Lấy API key từ env */
  async getApiKey() {
    const apiKey = process.env.LITELLM_API_KEY;
    if (!apiKey) {
      throw new Error("Missing LITELLM_API_KEY environment variable");
    }
    return apiKey;
  }
  /** Tạo LanguageModel từ AI SDK */
  async resolveLanguageModel({
    modelId,
    providerId,
    apiKey
  }) {
    return createOpenAICompatible({
      name: providerId,
      apiKey,
      baseURL: this.buildUrl(),
      supportsStructuredOutputs: true
    }).chatModel(modelId);
  }
}

"use strict";
const weatherTool = createTool({
  id: "weather-tool",
  description: "Get current weather for a location",
  inputSchema: z.object({
    location: z.string().describe("City name")
  }),
  outputSchema: z.object({
    temperature: z.number(),
    feelsLike: z.number(),
    humidity: z.number(),
    windSpeed: z.number(),
    windGust: z.number(),
    conditions: z.string(),
    location: z.string()
  }),
  execute: async ({ context }) => {
    return await getWeather(context.location);
  }
});
const getWeather = async (location) => {
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
  const geocodingResponse = await fetch(geocodingUrl);
  const geocodingData = await geocodingResponse.json();
  if (!geocodingData.results?.[0]) {
    throw new Error(`Location '${location}' not found`);
  }
  const { latitude, longitude, name } = geocodingData.results[0];
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,weather_code`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  return {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windGust: data.current.wind_gusts_10m,
    conditions: getWeatherCondition(data.current.weather_code),
    location: name
  };
};
function getWeatherCondition(code) {
  const conditions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };
  return conditions[code] || "Unknown";
}

"use strict";
const weatherAgent = new Agent({
  name: "weather-agent",
  instructions: `
    You are a helpful weather assistant that provides accurate weather information in a location at current time.

    Rules:
    - If the user sends a greeting without mentioning weather, reply with a brief greeting only.
    - You only can provide weather data in a location at current time
    - You can not forecast
    - If location is missing, ask for it.
    - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
    - You can provide temperature, apparent temperature, humidity, wind speed, wind guts and weather condition
    - Do NOT include additional weather fields even if available from the tool.
    - Keep responses concise but informative
    - For general requests (e.g., "What is the weather?"): Provide a summary using ONLY the allowed fields listed above.
    - Do not answer the query that does not relate to weather
    - If user query include information that you can not provide, refuse.
    - If the user asks about what you can do, your role, or capabilities:
      + Respond only by stating your limited scope (current weather only).
      + Do NOT describe general assistant abilities.
      + Do NOT mention tools, AI, or internal logic.
    - If multiple locations are requested, even with different weather fields:
      + Each location MUST be rendered as a separate paragraph
      + Each paragraph MUST start with "Current weather in <location>:"
      + Only include fields explicitly requested for that location
      + Separate paragraphs by exactly one blank line
      + Do NOT merge multiple locations into a single paragraph


    Refusal behavior:
    - If the query is not about weather, respond with a brief refusal.
    - Do NOT suggest asking about weather.
    - Do NOT ask follow-up questions.
    - Do NOT introduce new topics.
    - Use one short sentence only.

    Use the weatherTool to fetch current weather data.

    Output:
    - If unit for wind speed is not provided, set it km/h as default
    - If user asks for specific weather attributes that you can answer, follow these rules:
      + Output ONLY the weather attributes requested by the user.
      + Do not include any other attributes.
    - If location is not exist, return Location is not found
    `,
  model: `private/litellm/openai/gpt-5-mini`,
  tools: { weatherTool },
  memory: new Memory({
    options: {
      lastMessages: 20
    },
    storage: new LibSQLStore({
      url: "file:./local.db"
    })
  })
});

"use strict";
const tavilyTool = createTool$1({
  id: "tavily-tool",
  description: ` Search the web for general information, news and facts
    `,
  inputSchema: z.object({
    query: z.string()
  }),
  outputSchema: z.object({
    answer: z.string().optional(),
    sources: z.array(
      z.object({
        content: z.string()
      })
    )
  }),
  execute: async ({ context }) => {
    const client = tavily({ apiKey: process.env.TAVILY_API_KEY });
    const response = await client.search(context.query, {
      searchDepth: "advanced",
      includeAnswer: true,
      maxResults: 5
    });
    return {
      answer: response.answer,
      sources: response.results.map((r) => ({
        content: r.content
      }))
    };
  }
});

"use strict";
const webSearchAgent = new Agent({
  name: "websearch-agent",
  instructions: `
    You are a helpful web research agent.
    
    Rules:
    - You must call the 'tavily-tool' for every user query except greeting. In that case, just reply politely.
    - Never answer from your own knowledge.
    - Do not guess or speculate.
    - If the tool returns no results, say you could not find reliable information.
    - Follow-up queries (e.g. "tell me more", "continue", "early life", "early career") are treated as NEW queries and MUST call the tavily tool.
    - When send query to tavily tool, limit in 350 characters
    - DO NOT enrich or expand the query with additional aspects, criteria, or dimensions.
    - The query sent to the tool must be semantically equivalent to the user request.

    Tool usage rule:
    - If the tool is already called once in this turn, you MUST immediately stop.
    - Do NOT attempt clarification, reformulation, or retry.

    Output format:
    - Do NOT mention searching, tools, sources, or "information found".
    - Do NOT use phrases like:
      "Here's", "Based on", "I found", "This method", "According to".
    - No meta commentary.
    - Do NOT ask follow-up questions.
    - Do NOT suggest additional topics or options.
    - Write information you searched in clear paragraphs.
    `,
  model: `private/litellm/openai/gpt-5-mini`,
  tools: { tavilyTool },
  memory: new Memory({
    options: {
      lastMessages: 20
    },
    storage: new LibSQLStore({
      url: "file:./local.db"
    })
  })
});

"use strict";
const routingAgent = new Agent({
  name: "routing-agent",
  instructions: `
    You are a smart routing assistant.
    User will ask you to research a topic.

    Routing rules:
    - If the topic is about weather:
      + You can only get weather data at current time
      + If location is missing, ask user for it
      + If location is found, call 'weather-agent' follow these rules:
        - Use the user's message as the ONLY source of meaning. Do NOT introduce external concepts. Preserve meaning, not wording.
    - If the topic is about news, facts, definitions, general information, call 'websearch-agent'.When calling websearch-agent:
      + Use the user's message as the ONLY source of meaning.
        Do NOT introduce external concepts.
        Do NOT preserve the original sentence structure.
        Preserve meaning, not wording.

      + Extract only:
        - nouns
        - proper nouns
        - named entities
        - attributes explicitly present or clearly implied

      + Keyword Transformation Rules:
        - If the user uses a verb that implies a mechanism or state (e.g., "work", "run", "cost"), CONVERT it into its corresponding noun attribute (e.g., "mechanism", "operation", "price").
        - ONLY remove auxiliary verbs (is, are, do, does) that serve purely grammatical functions.
        - RESOLVE pronouns (it, they, this) to the referenced entity from context BEFORE extraction.

      + If the user's intent is expressed via verbs or question words (e.g. compare, how, where, why), convert that intent into an implied noun or attribute
        ONLY if it is directly implied by the user's wording.

      + Do NOT add:
        - adjectives not present or implied
        - instructions
        - explanations
        - timeframes not stated by the user

      + Send exactly ONE query:
        - No splitting
        - No batching
        - No iteration

      + Query format:
        - Flat keyword list only
        - No sentences
        - No verbs
        - No punctuation except commas
        - Maximum 350 characters

      + Validation before sending:
        - If any keyword is not implied by the user, remove it
        - Ensure the query preserves the user's original intent

      + Each message of user can call websearch-agent ONLY once

      + If no concrete entity can be extracted, do NOT call websearch-agent.
    - If the user request is subjective or advisory (e.g. suggest, recommend, itinerary, ideas, things to explore), answer by yourself.


    Follow-up Rule:
    - If the user asks a follow-up such as "tell me more", "continue", "more details":
      + Resolve pronouns to the last concrete entity.
      + Treat the request as an EXPANSION of the SAME topic.
      + Focus on aspects not yet covered
      + Generate only ONE query.
      + Call appropriate agent.

    Output rules:
    - If you answered by yourself, you may generate content normally.
    - If an agent is called, you must return text output of that agent
    - Do NOT add summaries, transitions, clarifications, or commentary.
    - Do NOT ask follow-up questions. Do NOT offer further assistance.
    `,
  model: `private/litellm/openai/gpt-5-mini`,
  agents: {
    weatherAgent,
    webSearchAgent
  },
  memory: new Memory({
    options: {
      lastMessages: 20
    },
    storage: new LibSQLStore({
      url: "file:../mastra.db"
    })
  })
});

"use strict";
const mastra = new Mastra({
  gateways: {
    myGateway: new MyPrivateGateway()
  },
  agents: {
    weatherAgent,
    webSearchAgent,
    routingAgent
  },
  logger: false
});

export { mastra };
