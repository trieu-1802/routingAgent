import type { Template } from './template-utils.js';
export interface CloneTemplateOptions {
    template: Template;
    projectName: string;
    targetDir?: string;
}
export declare function cloneTemplate(options: CloneTemplateOptions): Promise<string>;
export declare function installDependencies(projectPath: string, packageManager?: string): Promise<void>;
//# sourceMappingURL=clone-template.d.ts.map