import { ObservabilityStorage } from '@mastra/core/storage';
import type { AISpanRecord, CreateAISpanRecord, UpdateAISpanRecord, AITraceRecord, AITracesPaginatedArg, PaginationInfo } from '@mastra/core/storage';
import type { StoreOperationsLibSQL } from '../operations/index.js';
export declare class ObservabilityLibSQL extends ObservabilityStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsLibSQL;
    });
    createAISpan(span: CreateAISpanRecord): Promise<void>;
    getAITrace(traceId: string): Promise<AITraceRecord | null>;
    updateAISpan({ spanId, traceId, updates, }: {
        spanId: string;
        traceId: string;
        updates: Partial<UpdateAISpanRecord>;
    }): Promise<void>;
    getAITracesPaginated({ filters, pagination, }: AITracesPaginatedArg): Promise<{
        pagination: PaginationInfo;
        spans: AISpanRecord[];
    }>;
    batchCreateAISpans(args: {
        records: CreateAISpanRecord[];
    }): Promise<void>;
    batchUpdateAISpans(args: {
        records: {
            traceId: string;
            spanId: string;
            updates: Partial<UpdateAISpanRecord>;
        }[];
    }): Promise<void>;
    batchDeleteAITraces(args: {
        traceIds: string[];
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map