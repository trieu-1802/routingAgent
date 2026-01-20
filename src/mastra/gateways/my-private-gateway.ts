import { MastraModelGateway, type ProviderConfig } from '@mastra/core/llm';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible-v5';
import type { LanguageModelV2 } from '@ai-sdk/provider-v5';

export class MyPrivateGateway extends MastraModelGateway {
  /** Unique gateway ID; prefix in model IDs */
  readonly id = 'private';

  readonly name = 'LiteLLM Gateway (TrustSoft)';

  /** 
   * Declare providers + model list
   */
  async fetchProviders(): Promise<Record<string, ProviderConfig>> {
    return {
      litellm: {
        name: 'LiteLLM (TrustSoft)',
        gateway: this.id,
        apiKeyEnvVar: 'LITELLM_API_KEY',
        url: process.env.LITELLM_BASE_URL,
        models: [
          'openai/gpt-5-mini',
          'vertex_ai/gemini-2.5-flash-preview-05',
        ],
      },
    };
  }

  /** Base URL cho API OpenAI-compatible */
  buildUrl(): string {
    const baseUrl = process.env.LITELLM_BASE_URL;
    if (!baseUrl) {
      throw new Error('Missing LITELLM_BASE_URL environment variable');
    }
    return baseUrl;
  }

  /** Lấy API key từ env */
  async getApiKey(): Promise<string> {
    const apiKey = process.env.LITELLM_API_KEY;
    if (!apiKey) {
      throw new Error('Missing LITELLM_API_KEY environment variable');
    }
    return apiKey;
  }

  /** Tạo LanguageModel từ AI SDK */
  async resolveLanguageModel({
    modelId,
    providerId,
    apiKey,
  }: {
    modelId: string;
    providerId: string;
    apiKey: string;
  }): Promise<LanguageModelV2> {
    return createOpenAICompatible({
      name: providerId,
      apiKey,
      baseURL: this.buildUrl(),
      supportsStructuredOutputs: true,
    }).chatModel(modelId);
  }
}
