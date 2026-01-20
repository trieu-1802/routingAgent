import { ReadableStream } from 'node:stream/web';
import type { RuntimeContext } from '@mastra/core/runtime-context';
import type { LegacyWorkflowRuns } from '@mastra/core/storage';
import type { LegacyWorkflow } from '@mastra/core/workflows/legacy';
import type { Context } from '../types.js';
interface WorkflowContext extends Context {
    workflowId?: string;
    runId?: string;
}
export declare function getLegacyWorkflowsHandler({ mastra }: WorkflowContext): Promise<any>;
export declare function getLegacyWorkflowByIdHandler({ mastra, workflowId }: WorkflowContext): Promise<{
    stepGraph: import("@mastra/core/workflows/legacy").StepGraph;
    stepSubscriberGraph: Record<string, import("@mastra/core/workflows/legacy").StepGraph>;
    serializedStepGraph: import("@mastra/core/workflows/legacy").StepGraph;
    serializedStepSubscriberGraph: Record<string, import("@mastra/core/workflows/legacy").StepGraph>;
    name: string;
    triggerSchema: string | undefined;
    steps: any;
}>;
export declare function startAsyncLegacyWorkflowHandler({ mastra, runtimeContext, workflowId, runId, triggerData, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'> & {
    triggerData?: unknown;
    runtimeContext: RuntimeContext;
}): Promise<import("@mastra/core/workflows/legacy").LegacyWorkflowRunResult<any, import("@mastra/core/workflows/legacy").LegacyStep<string, any, any, import("@mastra/core/workflows/legacy").StepExecutionContext<any, import("@mastra/core/workflows/legacy").WorkflowContext<any, import("@mastra/core/workflows/legacy").LegacyStep<string, any, any, any>[], Record<string, any>>>>[], any>>;
export declare function getLegacyWorkflowRunHandler({ mastra, workflowId, runId, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'>): Promise<ReturnType<LegacyWorkflow['getRun']>>;
export declare function createLegacyWorkflowRunHandler({ mastra, workflowId, runId: prevRunId, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'>): Promise<{
    runId: string;
}>;
export declare function startLegacyWorkflowRunHandler({ mastra, runtimeContext, workflowId, runId, triggerData, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'> & {
    triggerData?: unknown;
    runtimeContext: RuntimeContext;
}): Promise<{
    message: string;
}>;
export declare function watchLegacyWorkflowHandler({ mastra, workflowId, runId, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'>): Promise<ReadableStream<string>>;
export declare function resumeAsyncLegacyWorkflowHandler({ mastra, workflowId, runId, body, runtimeContext, }: WorkflowContext & {
    body: {
        stepId: string;
        context: any;
    };
    runtimeContext: RuntimeContext;
}): Promise<Omit<import("@mastra/core/workflows/legacy").LegacyWorkflowRunResult<any, import("@mastra/core/workflows/legacy").LegacyStep<string, any, any, import("@mastra/core/workflows/legacy").StepExecutionContext<any, import("@mastra/core/workflows/legacy").WorkflowContext<any, import("@mastra/core/workflows/legacy").LegacyStep<string, any, any, any>[], Record<string, any>>>>[], any>, "runId"> | undefined>;
export declare function resumeLegacyWorkflowHandler({ mastra, workflowId, runId, body, runtimeContext, }: WorkflowContext & {
    body: {
        stepId: string;
        context: any;
    };
    runtimeContext: RuntimeContext;
}): Promise<{
    message: string;
}>;
export declare function getLegacyWorkflowRunsHandler({ mastra, workflowId, fromDate, toDate, limit, offset, resourceId, }: WorkflowContext & {
    fromDate?: Date;
    toDate?: Date;
    limit?: number;
    offset?: number;
    resourceId?: string;
}): Promise<LegacyWorkflowRuns>;
export {};
//# sourceMappingURL=legacyWorkflows.d.ts.map