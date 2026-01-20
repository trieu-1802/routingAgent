import type { Context } from 'hono';
export declare function getLegacyWorkflowsHandler(c: Context): Promise<Response>;
export declare function getLegacyWorkflowByIdHandler(c: Context): Promise<Response>;
export declare function startAsyncLegacyWorkflowHandler(c: Context): Promise<Response>;
export declare function createLegacyWorkflowRunHandler(c: Context): Promise<Response>;
export declare function startLegacyWorkflowRunHandler(c: Context): Promise<Response>;
export declare function watchLegacyWorkflowHandler(c: Context): Response | Promise<Response>;
export declare function resumeAsyncLegacyWorkflowHandler(c: Context): Promise<Response>;
export declare function resumeLegacyWorkflowHandler(c: Context): Promise<Response>;
export declare function getLegacyWorkflowRunsHandler(c: Context): Promise<Response>;
//# sourceMappingURL=legacyWorkflows.d.ts.map