import type { BaseLogMessage, LogLevel } from '@mastra/core/logger';
import type { Mastra } from '@mastra/core/mastra';
type LogsContext = {
    mastra: Mastra;
    transportId?: string;
    runId?: string;
    params?: {
        fromDate?: Date;
        toDate?: Date;
        logLevel?: LogLevel;
        filters?: string | string[];
        page?: number;
        perPage?: number;
    };
};
export declare function getLogsHandler({ mastra, transportId, params, }: Pick<LogsContext, 'mastra' | 'transportId' | 'params'>): Promise<{
    logs: BaseLogMessage[];
    total: number;
    page: number;
    perPage: number;
    hasMore: boolean;
}>;
export declare function getLogsByRunIdHandler({ mastra, runId, transportId, params, }: Pick<LogsContext, 'mastra' | 'runId' | 'transportId' | 'params'>): Promise<{
    logs: import("@mastra/core/logger").BaseLogMessage[];
    total: number;
    page: number;
    perPage: number;
    hasMore: boolean;
}>;
export declare function getLogTransports({ mastra }: Pick<LogsContext, 'mastra'>): Promise<{
    transports: string[];
}>;
export {};
//# sourceMappingURL=logs.d.ts.map