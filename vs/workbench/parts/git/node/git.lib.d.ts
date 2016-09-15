import { Promise, TPromise } from 'vs/base/common/winjs.base';
import { IRawFileStatus, IRef, IBranch, IRemote, IPushOptions } from 'vs/workbench/parts/git/common/git';
import { ChildProcess } from 'child_process';
export interface IExecutionResult {
    exitCode: number;
    stdout: string;
    stderr: string;
}
export interface IGitErrorData {
    error?: Error;
    message?: string;
    stdout?: string;
    stderr?: string;
    exitCode?: number;
    gitErrorCode?: string;
    gitCommand?: string;
}
export declare class GitError {
    error: Error;
    message: string;
    stdout: string;
    stderr: string;
    exitCode: number;
    gitErrorCode: string;
    gitCommand: string;
    constructor(data: IGitErrorData);
    toString(): string;
}
export interface IGitOptions {
    gitPath: string;
    version: string;
    tmpPath: string;
    defaultEncoding?: string;
    env?: any;
}
export declare class Git {
    gitPath: string;
    version: string;
    env: any;
    private tmpPath;
    private defaultEncoding;
    private outputListeners;
    constructor(options: IGitOptions);
    run(cwd: string, args: string[], options?: any): TPromise<IExecutionResult>;
    stream(cwd: string, args: string[], options?: any): ChildProcess;
    open(repository: string, env?: any): Repository;
    clone(repository: string, repoURL: string): TPromise<boolean>;
    config(name: string, value: string): Promise;
    private exec(args, options?);
    spawn(args: string[], options?: any): ChildProcess;
    onOutput(listener: (output: string) => void): () => void;
    private log(output);
}
export declare class Repository {
    private git;
    private repository;
    private defaultEncoding;
    private env;
    constructor(git: Git, repository: string, defaultEncoding: string, env?: any);
    version: string;
    path: string;
    run(args: string[], options?: any): TPromise<IExecutionResult>;
    stream(args: string[], options?: any): ChildProcess;
    spawn(args: string[], options?: any): ChildProcess;
    init(): Promise;
    config(scope: string, key: string, value: any, options: any): TPromise<string>;
    show(object: string): ChildProcess;
    buffer(object: string): TPromise<string>;
    private doBuffer(object);
    add(paths: string[]): Promise;
    stage(path: string, data: string): Promise;
    checkout(treeish: string, paths: string[]): Promise;
    commit(message: string, all: boolean, amend: boolean): Promise;
    branch(name: string, checkout: boolean): Promise;
    clean(paths: string[]): Promise;
    undo(): Promise;
    reset(treeish: string, hard?: boolean): Promise;
    revertFiles(treeish: string, paths: string[]): Promise;
    fetch(): Promise;
    pull(rebase?: boolean): Promise;
    push(remote?: string, name?: string, options?: IPushOptions): Promise;
    sync(): Promise;
    getRoot(): TPromise<string>;
    getStatus(): TPromise<IRawFileStatus[]>;
    getHEAD(): TPromise<IRef>;
    getRefs(): TPromise<IRef[]>;
    getRemotes(): TPromise<IRemote[]>;
    getBranch(branch: string): TPromise<IBranch>;
    getCommitTemplate(): TPromise<string>;
    onOutput(listener: (output: string) => void): () => void;
}
