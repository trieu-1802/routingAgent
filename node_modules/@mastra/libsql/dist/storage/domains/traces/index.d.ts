import type { Client } from '@libsql/client';
import { TracesStorage } from '@mastra/core/storage';
import type { StorageGetTracesArg, StorageGetTracesPaginatedArg, PaginationInfo } from '@mastra/core/storage';
import type { Trace } from '@mastra/core/telemetry';
import type { StoreOperationsLibSQL } from '../operations/index.js';
export declare class TracesLibSQL extends TracesStorage {
    private client;
    private operations;
    constructor({ client, operations }: {
        client: Client;
        operations: StoreOperationsLibSQL;
    });
    getTraces(args: StorageGetTracesArg): Promise<Trace[]>;
    getTracesPaginated(args: StorageGetTracesPaginatedArg): Promise<PaginationInfo & {
        traces: Trace[];
    }>;
    batchTraceInsert({ records }: {
        records: Record<string, any>[];
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map