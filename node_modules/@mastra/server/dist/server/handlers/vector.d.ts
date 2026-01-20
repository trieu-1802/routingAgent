import type { QueryResult } from '@mastra/core/vector';
import type { Context } from '../types.js';
interface VectorContext extends Context {
    vectorName?: string;
}
interface UpsertRequest {
    indexName: string;
    vectors: number[][];
    metadata?: Record<string, any>[];
    ids?: string[];
}
interface CreateIndexRequest {
    indexName: string;
    dimension: number;
    metric?: 'cosine' | 'euclidean' | 'dotproduct';
}
interface QueryRequest {
    indexName: string;
    queryVector: number[];
    topK?: number;
    filter?: Record<string, any>;
    includeVector?: boolean;
}
export declare function upsertVectors({ mastra, vectorName, index }: VectorContext & {
    index: UpsertRequest;
}): Promise<{
    ids: string[];
}>;
export declare function createIndex({ mastra, vectorName, index, }: Pick<VectorContext, 'mastra' | 'vectorName'> & {
    index: CreateIndexRequest;
}): Promise<{
    success: boolean;
}>;
export declare function queryVectors({ mastra, vectorName, query, }: Pick<VectorContext, 'mastra' | 'vectorName'> & {
    query: QueryRequest;
}): Promise<QueryResult[]>;
export declare function listIndexes({ mastra, vectorName }: Pick<VectorContext, 'mastra' | 'vectorName'>): Promise<string[]>;
export declare function describeIndex({ mastra, vectorName, indexName, }: Pick<VectorContext, 'mastra' | 'vectorName'> & {
    indexName?: string;
}): Promise<{
    dimension: number;
    count: number;
    metric: string | undefined;
}>;
export declare function deleteIndex({ mastra, vectorName, indexName, }: Pick<VectorContext, 'mastra' | 'vectorName'> & {
    indexName?: string;
}): Promise<{
    success: boolean;
}>;
export {};
//# sourceMappingURL=vector.d.ts.map