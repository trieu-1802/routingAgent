import { createTool } from "@mastra/core";
import { z } from "zod"; 
import { tavily } from "@tavily/core";

export const tavilyTool = createTool({
    id: "tavily-tool",
    description: ` Search the web for general information, news and facts
    `,
    inputSchema: z.object({
        query: z.string(),
    }),
    outputSchema: z.object({
        answer: z.string().optional(),
        sources: z.array(
            z.object({
                content: z.string()
            })
        ),
    }),
    execute: async ({ context }) => {
        const client = tavily({apiKey: process.env.TAVILY_API_KEY})
        
        const response = await client.search(context.query, {
            searchDepth: "advanced",
            includeAnswer: true,
            maxResults: 5,
        })
        return { 
            answer: response.answer,
            sources: response.results.map((r) => ({
                content: r.content,
            })),
        }
    }
});