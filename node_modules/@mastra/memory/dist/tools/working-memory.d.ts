import type { MemoryConfig } from '@mastra/core/memory';
import { z } from 'zod';
export declare const updateWorkingMemoryTool: (memoryConfig?: MemoryConfig) => import("@mastra/core/tools").Tool<z.ZodType<any, z.ZodTypeDef, any>, undefined, any, any, import("@mastra/core").ToolExecutionContext<z.ZodType<any, z.ZodTypeDef, any>, any, any>>;
export declare const __experimental_updateWorkingMemoryToolVNext: (config: MemoryConfig) => import("@mastra/core/tools").Tool<z.ZodObject<{
    newMemory: z.ZodOptional<z.ZodString>;
    searchString: z.ZodOptional<z.ZodString>;
    updateReason: z.ZodOptional<z.ZodEnum<["append-new-memory", "clarify-existing-memory", "replace-irrelevant-memory"]>>;
}, "strip", z.ZodTypeAny, {
    newMemory?: string | undefined;
    searchString?: string | undefined;
    updateReason?: "append-new-memory" | "clarify-existing-memory" | "replace-irrelevant-memory" | undefined;
}, {
    newMemory?: string | undefined;
    searchString?: string | undefined;
    updateReason?: "append-new-memory" | "clarify-existing-memory" | "replace-irrelevant-memory" | undefined;
}>, undefined, any, any, import("@mastra/core").ToolExecutionContext<z.ZodObject<{
    newMemory: z.ZodOptional<z.ZodString>;
    searchString: z.ZodOptional<z.ZodString>;
    updateReason: z.ZodOptional<z.ZodEnum<["append-new-memory", "clarify-existing-memory", "replace-irrelevant-memory"]>>;
}, "strip", z.ZodTypeAny, {
    newMemory?: string | undefined;
    searchString?: string | undefined;
    updateReason?: "append-new-memory" | "clarify-existing-memory" | "replace-irrelevant-memory" | undefined;
}, {
    newMemory?: string | undefined;
    searchString?: string | undefined;
    updateReason?: "append-new-memory" | "clarify-existing-memory" | "replace-irrelevant-memory" | undefined;
}>, any, any>>;
//# sourceMappingURL=working-memory.d.ts.map