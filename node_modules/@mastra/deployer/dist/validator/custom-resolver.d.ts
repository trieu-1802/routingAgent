import type { ResolveHookContext } from 'node:module';
export declare function resolve(specifier: string, context: ResolveHookContext, nextResolve: (specifier: string, context: ResolveHookContext) => Promise<{
    url: string;
}>): Promise<{
    url: string;
}>;
//# sourceMappingURL=custom-resolver.d.ts.map