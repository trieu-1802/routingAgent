import type { MastraVector } from '@mastra/core/vector';
import type { Context } from 'hono';
export declare const getVector: (c: Context, vectorName: string) => MastraVector;
export declare function upsertVectors(c: Context): Promise<Response>;
export declare function createIndex(c: Context): Promise<Response>;
export declare function queryVectors(c: Context): Promise<Response>;
export declare function listIndexes(c: Context): Promise<Response>;
export declare function describeIndex(c: Context): Promise<Response>;
export declare function deleteIndex(c: Context): Promise<Response>;
//# sourceMappingURL=handlers.d.ts.map