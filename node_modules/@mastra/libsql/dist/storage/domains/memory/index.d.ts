import type { Client } from '@libsql/client';
import type { MastraMessageContentV2 } from '@mastra/core/agent';
import type { MastraMessageV1, MastraMessageV2, StorageThreadType } from '@mastra/core/memory';
import type { PaginationInfo, StorageGetMessagesArg, StorageResourceType, ThreadSortOptions } from '@mastra/core/storage';
import { MemoryStorage } from '@mastra/core/storage';
import type { StoreOperationsLibSQL } from '../operations/index.js';
export declare class MemoryLibSQL extends MemoryStorage {
    private client;
    private operations;
    constructor({ client, operations }: {
        client: Client;
        operations: StoreOperationsLibSQL;
    });
    private parseRow;
    private _getIncludedMessages;
    /**
     * @deprecated use getMessagesPaginated instead for paginated results.
     */
    getMessages(args: StorageGetMessagesArg & {
        format?: 'v1';
    }): Promise<MastraMessageV1[]>;
    getMessages(args: StorageGetMessagesArg & {
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    getMessagesById({ messageIds, format, }: {
        messageIds: string[];
        format: 'v1';
    }): Promise<MastraMessageV1[]>;
    getMessagesById({ messageIds, format, }: {
        messageIds: string[];
        format?: 'v2';
    }): Promise<MastraMessageV2[]>;
    getMessagesPaginated(args: StorageGetMessagesArg & {
        format?: 'v1' | 'v2';
    }): Promise<PaginationInfo & {
        messages: MastraMessageV1[] | MastraMessageV2[];
    }>;
    saveMessages(args: {
        messages: MastraMessageV1[];
        format?: undefined | 'v1';
    }): Promise<MastraMessageV1[]>;
    saveMessages(args: {
        messages: MastraMessageV2[];
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    updateMessages({ messages, }: {
        messages: (Partial<Omit<MastraMessageV2, 'createdAt'>> & {
            id: string;
            content?: {
                metadata?: MastraMessageContentV2['metadata'];
                content?: MastraMessageContentV2['content'];
            };
        })[];
    }): Promise<MastraMessageV2[]>;
    deleteMessages(messageIds: string[]): Promise<void>;
    getResourceById({ resourceId }: {
        resourceId: string;
    }): Promise<StorageResourceType | null>;
    saveResource({ resource }: {
        resource: StorageResourceType;
    }): Promise<StorageResourceType>;
    updateResource({ resourceId, workingMemory, metadata, }: {
        resourceId: string;
        workingMemory?: string;
        metadata?: Record<string, unknown>;
    }): Promise<StorageResourceType>;
    getThreadById({ threadId }: {
        threadId: string;
    }): Promise<StorageThreadType | null>;
    /**
     * @deprecated use getThreadsByResourceIdPaginated instead for paginated results.
     */
    getThreadsByResourceId(args: {
        resourceId: string;
    } & ThreadSortOptions): Promise<StorageThreadType[]>;
    getThreadsByResourceIdPaginated(args: {
        resourceId: string;
        page: number;
        perPage: number;
    } & ThreadSortOptions): Promise<PaginationInfo & {
        threads: StorageThreadType[];
    }>;
    saveThread({ thread }: {
        thread: StorageThreadType;
    }): Promise<StorageThreadType>;
    updateThread({ id, title, metadata, }: {
        id: string;
        title: string;
        metadata: Record<string, unknown>;
    }): Promise<StorageThreadType>;
    deleteThread({ threadId }: {
        threadId: string;
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map