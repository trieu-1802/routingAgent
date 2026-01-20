import type { MessageSendParams, TaskQueryParams, TaskIdParams, AgentCard } from '@mastra/core/a2a';
import type { Agent } from '@mastra/core/agent';
import type { IMastraLogger } from '@mastra/core/logger';
import type { RuntimeContext } from '@mastra/core/runtime-context';
import type { InMemoryTaskStore } from '../a2a/store.js';
import type { Context } from '../types.js';
export declare function getAgentCardByIdHandler({ mastra, agentId, executionUrl, provider, version, runtimeContext, }: Context & {
    runtimeContext: RuntimeContext;
    agentId: keyof ReturnType<typeof mastra.getAgents>;
    executionUrl?: string;
    version?: string;
    provider?: {
        organization: string;
        url: string;
    };
}): Promise<AgentCard>;
export declare function handleMessageSend({ requestId, params, taskStore, agent, agentId, logger, runtimeContext, }: {
    requestId: string;
    params: MessageSendParams;
    taskStore: InMemoryTaskStore;
    agent: Agent;
    agentId: string;
    logger?: IMastraLogger;
    runtimeContext: RuntimeContext;
}): Promise<import("@mastra/core/a2a").JSONRPCResponse<null, unknown> | import("@mastra/core/a2a").JSONRPCResponse<import("@a2a-js/sdk").Task, unknown>>;
export declare function handleTaskGet({ requestId, taskStore, agentId, taskId, }: {
    requestId: string;
    taskStore: InMemoryTaskStore;
    agentId: string;
    taskId: string;
}): Promise<import("@mastra/core/a2a").JSONRPCResponse<import("@a2a-js/sdk").Task, unknown>>;
export declare function handleMessageStream({ requestId, params, taskStore, agent, agentId, logger, runtimeContext, }: {
    requestId: string;
    params: MessageSendParams;
    taskStore: InMemoryTaskStore;
    agent: Agent;
    agentId: string;
    logger?: IMastraLogger;
    runtimeContext: RuntimeContext;
}): AsyncGenerator<import("@mastra/core/a2a").JSONRPCResponse<null, unknown> | import("@mastra/core/a2a").JSONRPCResponse<import("@a2a-js/sdk").Task, unknown> | import("@mastra/core/a2a").JSONRPCResponse<{
    state: string;
    message: {
        messageId: `${string}-${string}-${string}-${string}-${string}`;
        kind: string;
        role: string;
        parts: {
            kind: string;
            text: string;
        }[];
    };
}, unknown>, void, unknown>;
export declare function handleTaskCancel({ requestId, taskStore, agentId, taskId, logger, }: {
    requestId: string;
    taskStore: InMemoryTaskStore;
    agentId: string;
    taskId: string;
    logger?: IMastraLogger;
}): Promise<import("@mastra/core/a2a").JSONRPCResponse<import("@a2a-js/sdk").Task, unknown>>;
export declare function getAgentExecutionHandler({ requestId, mastra, agentId, runtimeContext, method, params, taskStore, logger, }: Context & {
    requestId: string;
    runtimeContext: RuntimeContext;
    agentId: string;
    method: 'message/send' | 'message/stream' | 'tasks/get' | 'tasks/cancel';
    params: MessageSendParams | TaskQueryParams | TaskIdParams;
    taskStore: InMemoryTaskStore;
    logger?: IMastraLogger;
}): Promise<any>;
//# sourceMappingURL=a2a.d.ts.map