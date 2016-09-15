import { IStorageService, StorageScope } from 'vs/platform/storage/common/storage';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
export interface IStorage {
    length: number;
    key(index: number): string;
    clear(): void;
    setItem(key: string, value: any): void;
    getItem(key: string): string;
    removeItem(key: string): void;
}
export declare class Storage implements IStorageService {
    _serviceBrand: any;
    private static COMMON_PREFIX;
    private static GLOBAL_PREFIX;
    private static WORKSPACE_PREFIX;
    private static WORKSPACE_IDENTIFIER;
    private static NO_WORKSPACE_IDENTIFIER;
    private workspaceStorage;
    private globalStorage;
    private workspaceKey;
    constructor(globalStorage: IStorage, workspaceStorage: IStorage, contextService: IWorkspaceContextService);
    private getWorkspaceKey(workspace?);
    private calculateWorkspaceKey(workspaceUrl);
    private cleanupWorkspaceScope(workspaceId, workspaceName);
    clear(): void;
    store(key: string, value: any, scope?: StorageScope): void;
    get(key: string, scope?: StorageScope, defaultValue?: any): string;
    remove(key: string, scope?: StorageScope): void;
    swap(key: string, valueA: any, valueB: any, scope?: StorageScope, defaultValue?: any): void;
    getInteger(key: string, scope?: StorageScope, defaultValue?: number): number;
    getBoolean(key: string, scope?: StorageScope, defaultValue?: boolean): boolean;
    private toStorageKey(key, scope);
}
export declare class InMemoryLocalStorage implements IStorage {
    private store;
    constructor();
    length: number;
    key(index: number): string;
    clear(): void;
    setItem(key: string, value: any): void;
    getItem(key: string): string;
    removeItem(key: string): void;
}
export declare const inMemoryLocalStorageInstance: InMemoryLocalStorage;
