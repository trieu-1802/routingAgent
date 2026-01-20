import type { Context } from 'hono';
/**
 * Handler for Streamable HTTP requests (POST, GET, DELETE) to /api/mcp/:serverId/mcp
 */
export declare const getMcpServerMessageHandler: (c: Context) => Promise<Response | undefined>;
/**
 * Handler for SSE related routes for an MCP server.
 * This function will be called for both establishing the SSE connection (GET)
 * and for posting messages to it (POST).
 */
export declare const getMcpServerSseHandler: (c: Context) => Promise<Response | undefined>;
/**
 * Handler for GET /api/mcp/v0/servers - List MCP Servers (Registry Style)
 */
export declare const listMcpRegistryServersHandler: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
    error: string;
}, 500, "json">) | (Response & import("hono").TypedResponse<{
    servers: {
        id: string;
        name: string;
        description?: string | undefined;
        repository?: {
            url: string;
            source: "github" | "gitlab" | string;
            id: string;
        } | undefined;
        version_detail: {
            version: string;
            release_date: string;
            is_latest: boolean;
        };
    }[];
    next: string | null;
    total_count: number;
}, import("hono/utils/http-status").ContentfulStatusCode, "json">)>;
/**
 * Handler for GET /api/mcp/v0/servers/:id - Get MCP Server Details (Registry Style)
 */
export declare const getMcpRegistryServerDetailHandler: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
    error: string;
}, 500, "json">) | (Response & import("hono").TypedResponse<{
    error: string;
}, 404, "json">) | (Response & import("hono").TypedResponse<{
    package_canonical?: string | undefined;
    packages?: {
        registry_name: "npm" | "docker" | "pypi" | "homebrew" | string;
        name: string;
        version: string;
        command?: {
            name: "npx" | "docker" | "pypi" | "uvx" | string;
            subcommands?: {
                name: string;
                description: string;
                is_required?: boolean | undefined;
                subcommands?: /*elided*/ any[] | undefined;
                positional_arguments?: {
                    position: number;
                    name: string;
                    description: string;
                    is_required: boolean;
                    is_repeatable?: boolean | undefined;
                    is_editable?: boolean | undefined;
                    choices?: string[] | undefined;
                    default_value?: string | number | boolean | undefined;
                }[] | undefined;
                named_arguments?: {
                    short_flag?: string | undefined;
                    long_flag?: string | undefined;
                    requires_value?: boolean | undefined;
                    name: string;
                    description: string;
                    is_required: boolean;
                    is_repeatable?: boolean | undefined;
                    is_editable?: boolean | undefined;
                    choices?: string[] | undefined;
                    default_value?: string | number | boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            positional_arguments?: {
                position: number;
                name: string;
                description: string;
                is_required: boolean;
                is_repeatable?: boolean | undefined;
                is_editable?: boolean | undefined;
                choices?: string[] | undefined;
                default_value?: string | number | boolean | undefined;
            }[] | undefined;
            named_arguments?: {
                short_flag?: string | undefined;
                long_flag?: string | undefined;
                requires_value?: boolean | undefined;
                name: string;
                description: string;
                is_required: boolean;
                is_repeatable?: boolean | undefined;
                is_editable?: boolean | undefined;
                choices?: string[] | undefined;
                default_value?: string | number | boolean | undefined;
            }[] | undefined;
        } | undefined;
        environment_variables?: {
            name: string;
            description: string;
            required?: boolean | undefined;
            default_value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
    remotes?: {
        transport_type: "streamable" | "sse" | string;
        url: string;
    }[] | undefined;
    id: string;
    name: string;
    description?: string | undefined;
    repository?: {
        url: string;
        source: "github" | "gitlab" | string;
        id: string;
    } | undefined;
    version_detail: {
        version: string;
        release_date: string;
        is_latest: boolean;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">)>;
/**
 * Handler for GET /api/mcp/:serverId/tools - List tools for a specific MCP Server
 */
export declare const listMcpServerToolsHandler: (c: Context) => Promise<Response>;
/**
 * Handler for GET /api/mcp/:serverId/tools/:toolId - Get details for a specific tool on an MCP Server
 */
export declare const getMcpServerToolDetailHandler: (c: Context) => Promise<Response>;
/**
 * Handler for POST /api/mcp/:serverId/tools/:toolId/execute - Execute a tool on an MCP Server
 */
export declare const executeMcpServerToolHandler: (c: Context) => Promise<Response>;
//# sourceMappingURL=handlers.d.ts.map