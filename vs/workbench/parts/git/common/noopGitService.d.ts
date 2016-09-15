import { IRawGitService, IRawStatus, RawServiceState } from 'vs/workbench/parts/git/common/git';
import { TPromise } from 'vs/base/common/winjs.base';
import Event from 'vs/base/common/event';
export declare class NoOpGitService implements IRawGitService {
    private _onOutput;
    onOutput: Event<string>;
    private static STATUS;
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
    push(): TPromise<IRawStatus>;
    sync(): TPromise<IRawStatus>;
    commit(message: string, amend?: boolean, stage?: boolean): TPromise<IRawStatus>;
    detectMimetypes(path: string, treeish?: string): TPromise<string[]>;
    show(path: string, treeish?: string): TPromise<string>;
    getCommitTemplate(): TPromise<string>;
}
