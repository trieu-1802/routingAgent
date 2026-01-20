import type { CoreMessage } from '@mastra/core/llm';
import { MemoryProcessor } from '@mastra/core/memory';
/**
 * Filters out tool calls and results from messages.
 * By default (with no arguments), excludes all tool calls and their results.
 * Can be configured to exclude only specific tools by name.
 */
export declare class ToolCallFilter extends MemoryProcessor {
    private exclude;
    /**
     * Create a filter for tool calls and results.
     * @param options Configuration options
     * @param options.exclude List of specific tool names to exclude. If not provided, all tool calls are excluded.
     */
    constructor(options?: {
        exclude?: string[];
    });
    process(messages: CoreMessage[]): CoreMessage[];
}
//# sourceMappingURL=tool-call-filter.d.ts.map