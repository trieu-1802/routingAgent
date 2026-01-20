import type { Client, InValue } from '@libsql/client';
import { StoreOperations } from '@mastra/core/storage';
import type { StorageColumn, TABLE_NAMES } from '@mastra/core/storage';
export declare class StoreOperationsLibSQL extends StoreOperations {
    private client;
    /**
     * Maximum number of retries for write operations if an SQLITE_BUSY error occurs.
     * @default 5
     */
    maxRetries: number;
    /**
     * Initial backoff time in milliseconds for retrying write operations on SQLITE_BUSY.
     * The backoff time will double with each retry (exponential backoff).
     * @default 100
     */
    initialBackoffMs: number;
    constructor({ client, maxRetries, initialBackoffMs, }: {
        client: Client;
        maxRetries?: number;
        initialBackoffMs?: number;
    });
    hasColumn(table: string, column: string): Promise<boolean>;
    private getCreateTableSQL;
    createTable({ tableName, schema, }: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
    }): Promise<void>;
    protected getSqlType(type: StorageColumn['type']): string;
    private doInsert;
    insert(args: {
        tableName: TABLE_NAMES;
        record: Record<string, any>;
    }): Promise<void>;
    load<R>({ tableName, keys }: {
        tableName: TABLE_NAMES;
        keys: Record<string, string>;
    }): Promise<R | null>;
    loadMany<R>({ tableName, whereClause, orderBy, offset, limit, args, }: {
        tableName: TABLE_NAMES;
        whereClause?: {
            sql: string;
            args: InValue[];
        };
        orderBy?: string;
        offset?: number;
        limit?: number;
        args?: any[];
    }): Promise<R[]>;
    loadTotalCount({ tableName, whereClause, }: {
        tableName: TABLE_NAMES;
        whereClause?: {
            sql: string;
            args: InValue[];
        };
    }): Promise<number>;
    update(args: {
        tableName: TABLE_NAMES;
        keys: Record<string, any>;
        data: Record<string, any>;
    }): Promise<void>;
    private executeUpdate;
    private doBatchInsert;
    batchInsert(args: {
        tableName: TABLE_NAMES;
        records: Record<string, any>[];
    }): Promise<void>;
    /**
     * Public batch update method with retry logic
     */
    batchUpdate(args: {
        tableName: TABLE_NAMES;
        updates: Array<{
            keys: Record<string, any>;
            data: Record<string, any>;
        }>;
    }): Promise<void>;
    /**
     * Updates multiple records in batch. Each record can be updated based on single or composite keys.
     */
    private executeBatchUpdate;
    /**
     * Public batch delete method with retry logic
     */
    batchDelete({ tableName, keys }: {
        tableName: TABLE_NAMES;
        keys: Array<Record<string, any>>;
    }): Promise<void>;
    /**
     * Deletes multiple records in batch. Each record can be deleted based on single or composite keys.
     */
    private executeBatchDelete;
    /**
     * Alters table schema to add columns if they don't exist
     * @param tableName Name of the table
     * @param schema Schema of the table
     * @param ifNotExists Array of column names to add if they don't exist
     */
    alterTable({ tableName, schema, ifNotExists, }: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
        ifNotExists: string[];
    }): Promise<void>;
    clearTable({ tableName }: {
        tableName: TABLE_NAMES;
    }): Promise<void>;
    dropTable({ tableName }: {
        tableName: TABLE_NAMES;
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map