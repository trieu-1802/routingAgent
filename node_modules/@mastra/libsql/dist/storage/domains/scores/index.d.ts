import type { Client } from '@libsql/client';
import type { ScoreRowData, ScoringSource } from '@mastra/core/scores';
import { ScoresStorage } from '@mastra/core/storage';
import type { PaginationInfo, StoragePagination } from '@mastra/core/storage';
import type { StoreOperationsLibSQL } from '../operations/index.js';
export declare class ScoresLibSQL extends ScoresStorage {
    private operations;
    private client;
    constructor({ client, operations }: {
        client: Client;
        operations: StoreOperationsLibSQL;
    });
    getScoresByRunId({ runId, pagination, }: {
        runId: string;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    getScoresByScorerId({ scorerId, entityId, entityType, source, pagination, }: {
        scorerId: string;
        entityId?: string;
        entityType?: string;
        source?: ScoringSource;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    private transformScoreRow;
    getScoreById({ id }: {
        id: string;
    }): Promise<ScoreRowData | null>;
    saveScore(score: Omit<ScoreRowData, 'id' | 'createdAt' | 'updatedAt'>): Promise<{
        score: ScoreRowData;
    }>;
    getScoresByEntityId({ entityId, entityType, pagination, }: {
        pagination: StoragePagination;
        entityId: string;
        entityType: string;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    getScoresBySpan({ traceId, spanId, pagination, }: {
        traceId: string;
        spanId: string;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
}
//# sourceMappingURL=index.d.ts.map