export declare function getCustomInstrumentationBundler(entryFile: string, result: {
    hasCustomConfig: false;
}): Promise<import("rollup").RollupBuild>;
export declare function writeCustomInstrumentation(entryFile: string, outputDir: string, options?: {
    sourcemap?: boolean;
}): Promise<{
    hasCustomConfig: boolean;
    externalDependencies: string[];
}>;
//# sourceMappingURL=customInstrumentation.d.ts.map