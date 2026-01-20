import type { InValue } from '@libsql/client';
import type { IMastraLogger } from '@mastra/core/logger';
import type { PaginationArgs, StorageColumn, TABLE_NAMES } from '@mastra/core/storage';
export declare function createExecuteWriteOperationWithRetry({ logger, maxRetries, initialBackoffMs, }: {
    logger: IMastraLogger;
    maxRetries: number;
    initialBackoffMs: number;
}): <T>(operationFn: () => Promise<T>, operationDescription: string) => Promise<T>;
export declare function prepareStatement({ tableName, record }: {
    tableName: TABLE_NAMES;
    record: Record<string, any>;
}): {
    sql: string;
    args: InValue[];
};
export declare function prepareUpdateStatement({ tableName, updates, keys, }: {
    tableName: TABLE_NAMES;
    updates: Record<string, any>;
    keys: Record<string, any>;
}): {
    sql: string;
    args: InValue[];
};
export declare function transformToSqlValue(value: any): InValue;
export declare function prepareDeleteStatement({ tableName, keys }: {
    tableName: TABLE_NAMES;
    keys: Record<string, any>;
}): {
    sql: string;
    args: InValue[];
};
type WhereValue = InValue | {
    startAt?: InValue;
    endAt?: InValue;
};
export declare function prepareWhereClause(filters: Record<string, WhereValue>, schema: Record<string, StorageColumn>): {
    sql: string;
    args: InValue[];
};
type DateRangeFilter = {
    startAt?: string;
    endAt?: string;
};
/**
 * Converts pagination date range to where clause date range format
 * @param dateRange - The date range from pagination
 * @param columnName - The timestamp column to filter on (defaults to 'createdAt')
 * @returns Object with the date range filter, or empty object if no date range
 */
export declare function buildDateRangeFilter(dateRange?: PaginationArgs['dateRange'], columnName?: string): Record<string, DateRangeFilter>;
/**
 * Transforms SQL row data back to a typed object format
 * Reverses the transformations done in prepareStatement
 */
export declare function transformFromSqlRow<T>({ tableName, sqlRow, }: {
    tableName: TABLE_NAMES;
    sqlRow: Record<string, any>;
}): T;
export {};
//# sourceMappingURL=utils.d.ts.map