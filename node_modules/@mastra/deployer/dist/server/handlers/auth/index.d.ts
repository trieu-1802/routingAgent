import type { ContextWithMastra } from '@mastra/core/server';
import type { Next } from 'hono';
export declare const authenticationMiddleware: (c: ContextWithMastra, next: Next) => Promise<void | (Response & import("hono").TypedResponse<{
    error: string;
}, 401, "json">)>;
export declare const authorizationMiddleware: (c: ContextWithMastra, next: Next) => Promise<void | (Response & import("hono").TypedResponse<{
    error: string;
}, 403, "json">) | (Response & import("hono").TypedResponse<{
    error: string;
}, 500, "json">)>;
//# sourceMappingURL=index.d.ts.map