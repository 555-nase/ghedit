import { EventEmitter } from 'vs/base/common/eventEmitter';
import { IStatusModel, IStatusSummary, IRawFileStatus, IFileStatus, IStatusGroup, Status, StatusType, IBranch, IRef, IRemote, IModel, IRawStatus } from 'vs/workbench/parts/git/common/git';
export declare class FileStatus implements IFileStatus {
    private path;
    private mimetype;
    private status;
    private rename;
    private id;
    private pathComponents;
    constructor(path: string, mimetype: string, status: Status, rename?: string, isModifiedInIndex?: boolean);
    getPath(): string;
    getPathComponents(): string[];
    getMimetype(): string;
    getStatus(): Status;
    getRename(): string;
    getId(): string;
    getType(): StatusType;
    clone(): IFileStatus;
    update(other: FileStatus): void;
    static typeOf(s: Status): string;
}
export declare class StatusGroup extends EventEmitter implements IStatusGroup {
    private type;
    private statusSet;
    private statusList;
    private statusByName;
    private statusByRename;
    constructor(type: StatusType);
    getType(): StatusType;
    update(statusList: FileStatus[]): void;
    all(): IFileStatus[];
    find(path: string): IFileStatus;
    dispose(): void;
}
export declare class StatusModel extends EventEmitter implements IStatusModel {
    private indexStatus;
    private workingTreeStatus;
    private mergeStatus;
    private toDispose;
    constructor();
    getSummary(): IStatusSummary;
    update(status: IRawFileStatus[]): void;
    getIndexStatus(): IStatusGroup;
    getWorkingTreeStatus(): IStatusGroup;
    getMergeStatus(): IStatusGroup;
    getGroups(): IStatusGroup[];
    find(path: string, type: StatusType): IFileStatus;
    dispose(): void;
}
export declare class Model extends EventEmitter implements IModel {
    private repositoryRoot;
    private status;
    private HEAD;
    private refs;
    private remotes;
    private toDispose;
    constructor();
    getRepositoryRoot(): string;
    getStatus(): IStatusModel;
    getHEAD(): IBranch;
    getRefs(): IRef[];
    getRemotes(): IRemote[];
    update(status: IRawStatus): void;
    getStatusSummary(): IStatusSummary;
    getPS1(): string;
    dispose(): void;
}
