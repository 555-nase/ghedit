import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { MainThreadOutputServiceShape } from './extHost.protocol';
export declare class ExtHostOutputChannel implements vscode.OutputChannel {
    private static _idPool;
    private _proxy;
    private _name;
    private _id;
    private _disposed;
    constructor(name: string, proxy: MainThreadOutputServiceShape);
    name: string;
    dispose(): void;
    append(value: string): void;
    appendLine(value: string): void;
    clear(): void;
    show(columnOrPreserveFocus?: vscode.ViewColumn | boolean, preserveFocus?: boolean): void;
    hide(): void;
}
export declare class ExtHostOutputService {
    private _proxy;
    constructor(threadService: IThreadService);
    createOutputChannel(name: string): vscode.OutputChannel;
}
