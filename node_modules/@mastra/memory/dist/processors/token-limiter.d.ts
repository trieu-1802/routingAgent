import type { CoreMessage } from '@mastra/core/llm';
import { MemoryProcessor } from '@mastra/core/memory';
import type { MemoryProcessorOpts } from '@mastra/core/memory';
import type { TiktokenBPE } from 'js-tiktoken/lite';
/**
 * Configuration options for TokenLimiter
 */
interface TokenLimiterOptions {
    /** Maximum number of tokens to allow */
    limit: number;
    /** Optional encoding to use (defaults to o200k_base which is used by gpt-4o) */
    encoding?: TiktokenBPE;
}
/**
 * Limits the total number of tokens in the messages.
 * Uses js-tiktoken with o200k_base encoding by default for accurate token counting with modern models.
 */
export declare class TokenLimiter extends MemoryProcessor {
    private encoder;
    private maxTokens;
    TOKENS_PER_MESSAGE: number;
    TOKENS_PER_CONVERSATION: number;
    /**
     * Create a token limiter for messages.
     * @param options Either a number (token limit) or a configuration object
     */
    constructor(options: number | TokenLimiterOptions);
    process(messages: CoreMessage[], { systemMessage, memorySystemMessage, newMessages }?: MemoryProcessorOpts): CoreMessage[];
    countTokens(message: string | CoreMessage): number;
}
export {};
//# sourceMappingURL=token-limiter.d.ts.map