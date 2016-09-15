import { TPromise } from 'vs/base/common/winjs.base';
import { IChannel } from 'vs/base/parts/ipc/common/ipc';
import Event from 'vs/base/common/event';
import { IRawGitService, RawServiceState, IRawStatus, IPushOptions, IAskpassService, ICredentials, ServiceState, RefType } from './git';
export declare type IPCRawFileStatus = [string, string, string, string, string];
export declare type IPCBranch = [string, string, RefType, string, string, number, number];
export declare type IPCRef = [string, string, RefType, string];
export declare type IPCRemote = [string, string];
export declare type IPCRawStatus = [string, ServiceState, IPCRawFileStatus[], IPCBranch, IPCRef[], IPCRemote[]];
export interface IGitChannel extends IChannel {
    call(command: 'getVersion'): TPromise<string>;
    call(command: 'serviceState'): TPromise<RawServiceState>;
    call(command: 'statusCount'): TPromise<number>;
    call(command: 'status'): TPromise<IPCRawStatus>;
    call(command: 'init'): TPromise<IPCRawStatus>;
    call(command: 'add', filesPaths?: string[]): TPromise<IPCRawStatus>;
    call(command: 'stage', args: [string, string]): TPromise<IPCRawStatus>;
    call(command: 'branch', args: [string, boolean]): TPromise<IPCRawStatus>;
    call(command: 'checkout', args: [string, string[]]): TPromise<IPCRawStatus>;
    call(command: 'clean', filePaths: string[]): TPromise<IPCRawStatus>;
    call(command: 'undo'): TPromise<IPCRawStatus>;
    call(command: 'reset', args: [string, boolean]): TPromise<IPCRawStatus>;
    call(command: 'revertFiles', args: [string, string[]]): TPromise<IPCRawStatus>;
    call(command: 'fetch'): TPromise<IPCRawStatus>;
    call(command: 'pull', rebase?: boolean): TPromise<IPCRawStatus>;
    call(command: 'push', args: [string, string, IPushOptions]): TPromise<IPCRawStatus>;
    call(command: 'sync'): TPromise<IPCRawStatus>;
    call(command: 'commit', args: [string, boolean, boolean]): TPromise<IPCRawStatus>;
    call(command: 'detectMimetypes', args: [string, string]): TPromise<string[]>;
    call(command: 'show', args: [string, string]): TPromise<string>;
    call(command: 'onOutput'): TPromise<void>;
    call(command: 'getCommitTemplate'): TPromise<string>;
    call(command: string, args: any): TPromise<any>;
}
export declare class GitChannel implements IGitChannel {
    private service;
    constructor(service: TPromise<IRawGitService>);
    call(command: string, args: any): TPromise<any>;
}
export declare class UnavailableGitChannel implements IGitChannel {
    call(command: string): TPromise<any>;
}
export declare class GitChannelClient implements IRawGitService {
    private channel;
    constructor(channel: IGitChannel);
    private _onOutput;
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
export interface IAskpassChannel extends IChannel {
    call(command: 'askpass', id: string, host: string, gitCommand: string): TPromise<ICredentials>;
    call(command: string, ...args: any[]): TPromise<any>;
}
export declare class AskpassChannel implements IAskpassChannel {
    private service;
    constructor(service: IAskpassService);
    call(command: string, ...args: any[]): TPromise<any>;
}
export declare class AskpassChannelClient implements IAskpassService {
    private channel;
    constructor(channel: IAskpassChannel);
    askpass(id: string, host: string, command: string): TPromise<ICredentials>;
}
