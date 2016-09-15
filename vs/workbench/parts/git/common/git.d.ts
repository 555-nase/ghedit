import { TPromise } from 'vs/base/common/winjs.base';
import { EditorInput } from 'vs/workbench/common/editor';
import { IEventEmitter } from 'vs/base/common/eventEmitter';
import { IDisposable } from 'vs/base/common/lifecycle';
import Event from 'vs/base/common/event';
export interface IRawFileStatus {
    x: string;
    y: string;
    path: string;
    mimetype: string;
    rename?: string;
}
export interface IRemote {
    name: string;
    url: string;
}
export declare enum RefType {
    Head = 0,
    RemoteHead = 1,
    Tag = 2,
}
export interface IRef {
    name: string;
    commit: string;
    type: RefType;
    remote?: string;
}
export interface IBranch extends IRef {
    upstream?: string;
    ahead?: number;
    behind?: number;
}
export interface IRawStatus {
    repositoryRoot: string;
    state?: ServiceState;
    status: IRawFileStatus[];
    HEAD: IBranch;
    refs: IRef[];
    remotes: IRemote[];
}
export declare enum StatusType {
    INDEX = 0,
    WORKING_TREE = 1,
    MERGE = 2,
}
export declare enum Status {
    INDEX_MODIFIED = 0,
    INDEX_ADDED = 1,
    INDEX_DELETED = 2,
    INDEX_RENAMED = 3,
    INDEX_COPIED = 4,
    MODIFIED = 5,
    DELETED = 6,
    UNTRACKED = 7,
    IGNORED = 8,
    ADDED_BY_US = 9,
    ADDED_BY_THEM = 10,
    DELETED_BY_US = 11,
    DELETED_BY_THEM = 12,
    BOTH_ADDED = 13,
    BOTH_DELETED = 14,
    BOTH_MODIFIED = 15,
}
export declare const ModelEvents: {
    MODEL_UPDATED: string;
    STATUS_MODEL_UPDATED: string;
    HEAD_UPDATED: string;
    REFS_UPDATED: string;
    REMOTES_UPDATED: string;
};
export interface IFileStatus {
    getId(): string;
    getType(): StatusType;
    getPath(): string;
    getPathComponents(): string[];
    getMimetype(): string;
    getStatus(): Status;
    getRename(): string;
    clone(): IFileStatus;
    update(other: IFileStatus): void;
}
export interface IStatusGroup extends IEventEmitter {
    getType(): StatusType;
    update(statusList: IFileStatus[]): void;
    all(): IFileStatus[];
    find(path: string): IFileStatus;
}
export interface IStatusSummary {
    hasWorkingTreeChanges: boolean;
    hasIndexChanges: boolean;
    hasMergeChanges: boolean;
}
export interface IStatusModel extends IEventEmitter {
    getSummary(): IStatusSummary;
    update(status: IRawFileStatus[]): void;
    getIndexStatus(): IStatusGroup;
    getWorkingTreeStatus(): IStatusGroup;
    getMergeStatus(): IStatusGroup;
    getGroups(): IStatusGroup[];
    find(path: string, type: StatusType): IFileStatus;
}
export interface IModel extends IEventEmitter {
    getRepositoryRoot(): string;
    getStatus(): IStatusModel;
    getHEAD(): IBranch;
    getRefs(): IRef[];
    getRemotes(): IRemote[];
    update(status: IRawStatus): void;
    getPS1(): string;
}
export interface IGitOperation extends IDisposable {
    id: string;
    run(): TPromise<any>;
}
export declare enum ServiceState {
    NotInitialized = 0,
    NotARepo = 1,
    NotAtRepoRoot = 2,
    OK = 3,
    Huge = 4,
    NoGit = 5,
    Disabled = 6,
    NotAWorkspace = 7,
}
export declare enum RawServiceState {
    OK = 0,
    GitNotFound = 1,
    Disabled = 2,
}
export declare const GitErrorCodes: {
    BadConfigFile: string;
    AuthenticationFailed: string;
    NoUserNameConfigured: string;
    NoUserEmailConfigured: string;
    NoRemoteRepositorySpecified: string;
    NotAGitRepository: string;
    NotAtRepositoryRoot: string;
    Conflict: string;
    UnmergedChanges: string;
    PushRejected: string;
    RemoteConnectionError: string;
    DirtyWorkTree: string;
    CantOpenResource: string;
    GitNotFound: string;
    CantCreatePipe: string;
    CantAccessRemote: string;
    RepositoryNotFound: string;
};
export declare enum AutoFetcherState {
    Disabled = 0,
    Inactive = 1,
    Active = 2,
    Fetching = 3,
}
export declare const ServiceEvents: {
    STATE_CHANGED: string;
    REPO_CHANGED: string;
    OPERATION_START: string;
    OPERATION_END: string;
    OPERATION: string;
    ERROR: string;
    DISPOSE: string;
};
export declare const ServiceOperations: {
    STATUS: string;
    INIT: string;
    ADD: string;
    STAGE: string;
    BRANCH: string;
    CHECKOUT: string;
    CLEAN: string;
    UNDO: string;
    RESET: string;
    COMMIT: string;
    COMMAND: string;
    BACKGROUND_FETCH: string;
    PULL: string;
    PUSH: string;
    SYNC: string;
};
export interface IGitConfiguration {
    enabled: boolean;
    path: string;
    autorefresh: boolean;
    autofetch: boolean;
    enableLongCommitWarning: boolean;
    allowLargeRepositories: boolean;
    confirmSync: boolean;
}
export interface IAutoFetcher {
    state: AutoFetcherState;
    activate(): void;
    deactivate(): void;
}
export interface IGitCredentialScope {
    protocol: string;
    host: string;
    path: string;
}
export interface ICredentials {
    username: string;
    password: string;
}
export interface IGitServiceError extends Error {
    gitErrorCode: string;
}
export interface IPushOptions {
    setUpstream?: boolean;
}
export interface IRawGitService {
    onOutput: Event<string>;
    getVersion(): TPromise<string>;
    serviceState(): TPromise<RawServiceState>;
    statusCount(): TPromise<number>;
    status(): TPromise<IRawStatus>;
    init(): TPromise<IRawStatus>;
    add(filesPaths?: string[]): TPromise<IRawStatus>;
    stage(filePath: string, content: string): TPromise<IRawStatus>;
    branch(name: string, checkout?: boolean): TPromise<IRawStatus>;
    checkout(treeish?: string, filePaths?: string[]): TPromise<IRawStatus>;
    clean(filePaths: string[]): TPromise<IRawStatus>;
    undo(): TPromise<IRawStatus>;
    reset(treeish: string, hard?: boolean): TPromise<IRawStatus>;
    revertFiles(treeish: string, filePaths?: string[]): TPromise<IRawStatus>;
    fetch(): TPromise<IRawStatus>;
    pull(rebase?: boolean): TPromise<IRawStatus>;
    push(remote?: string, name?: string, options?: IPushOptions): TPromise<IRawStatus>;
    sync(): TPromise<IRawStatus>;
    commit(message: string, amend?: boolean, stage?: boolean): TPromise<IRawStatus>;
    detectMimetypes(path: string, treeish?: string): TPromise<string[]>;
    show(path: string, treeish?: string): TPromise<string>;
    getCommitTemplate(): TPromise<string>;
}
export declare const GIT_SERVICE_ID: string;
export declare const IGitService: {
    (...args: any[]): void;
    type: IGitService;
};
export interface IGitService extends IEventEmitter {
    _serviceBrand: any;
    allowHugeRepositories: boolean;
    onOutput: Event<string>;
    status(): TPromise<IModel>;
    init(): TPromise<IModel>;
    add(files?: IFileStatus[]): TPromise<IModel>;
    stage(filePath: string, content: string): TPromise<IModel>;
    branch(name: string, checkout?: boolean): TPromise<IModel>;
    checkout(treeish?: string, files?: IFileStatus[]): TPromise<IModel>;
    clean(files: IFileStatus[]): TPromise<IModel>;
    undo(): TPromise<IModel>;
    reset(treeish: string, hard?: boolean): TPromise<IModel>;
    revertFiles(treeish: string, files?: IFileStatus[]): TPromise<IModel>;
    fetch(): TPromise<IModel>;
    pull(rebase?: boolean): TPromise<IModel>;
    push(remote?: string, name?: string, options?: IPushOptions): TPromise<IModel>;
    sync(): TPromise<IModel>;
    commit(message: string, amend?: boolean, stage?: boolean): TPromise<IModel>;
    detectMimetypes(path: string, treeish?: string): TPromise<string[]>;
    buffer(path: string, treeish?: string): TPromise<string>;
    getState(): ServiceState;
    getModel(): IModel;
    show(path: string, status: IFileStatus, treeish?: string, mimetype?: string): TPromise<string>;
    getInput(status: IFileStatus): TPromise<EditorInput>;
    isInitialized(): boolean;
    isIdle(): boolean;
    getRunningOperations(): IGitOperation[];
    getAutoFetcher(): IAutoFetcher;
    getCommitTemplate(): TPromise<string>;
}
export interface IAskpassService {
    askpass(id: string, host: string, command: string): TPromise<ICredentials>;
}
export declare function isValidBranchName(value: string): boolean;
