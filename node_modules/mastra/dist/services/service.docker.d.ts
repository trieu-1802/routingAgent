export declare class DockerService {
    sanitizeName(name: string): string;
    isPortOpen(port: number): Promise<boolean>;
    provision(projectName: string): Promise<{
        dbUrl: string;
    }>;
    private getNextOpenPort;
    getInfraPorts({ defaultPostgresPort, }?: {
        defaultAdminPort?: number;
        defaultInngestPort?: number;
        defaultPostgresPort?: number;
    }): Promise<{
        postgresPort: number;
    }>;
    checkDockerRunning(): Promise<boolean>;
    startDockerContainer(dockerComposeFile: string): Promise<boolean>;
    stopDockerContainer(dockerComposeFile: string): Promise<boolean>;
    prepareComposeFile({ sanitizedProjectName, postgresPort, }: {
        sanitizedProjectName: string;
        postgresPort: number;
    }): Promise<{
        dbUrl: string;
    }>;
    private editComposeFile;
    getComposeFile(composePath?: string): string;
}
//# sourceMappingURL=service.docker.d.ts.map