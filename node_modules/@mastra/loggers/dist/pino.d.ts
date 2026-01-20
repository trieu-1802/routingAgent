import type { LoggerTransport } from '@mastra/core/logger';
import { LogLevel, MastraLogger } from '@mastra/core/logger';
import pino from 'pino';
type TransportMap = Record<string, LoggerTransport>;
export type { LogLevel } from '@mastra/core/logger';
export declare class PinoLogger extends MastraLogger {
    protected logger: pino.Logger;
    constructor(options?: {
        name?: string;
        level?: LogLevel;
        transports?: TransportMap;
        overrideDefaultTransports?: boolean;
        formatters?: pino.LoggerOptions['formatters'];
    });
    debug(message: string, args?: Record<string, any>): void;
    info(message: string, args?: Record<string, any>): void;
    warn(message: string, args?: Record<string, any>): void;
    error(message: string, args?: Record<string, any>): void;
}
//# sourceMappingURL=pino.d.ts.map