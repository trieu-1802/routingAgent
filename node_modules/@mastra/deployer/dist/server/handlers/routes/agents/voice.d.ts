import type { Context } from 'hono';
/**
 * Get available speakers for an agent
 */
export declare function getSpeakersHandler(c: Context): Promise<Response>;
/**
 * Convert text to speech using the agent's voice provider
 */
export declare function speakHandler(c: Context): Promise<Response>;
/**
 * Get available speakers for an agent
 */
export declare function getListenerHandler(c: Context): Promise<Response>;
/**
 * Convert speech to text using the agent's voice provider
 */
export declare function listenHandler(c: Context): Promise<Response>;
//# sourceMappingURL=voice.d.ts.map