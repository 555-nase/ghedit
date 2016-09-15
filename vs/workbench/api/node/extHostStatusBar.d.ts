import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { StatusBarAlignment as ExtHostStatusBarAlignment, Disposable } from './extHostTypes';
import { StatusBarItem, StatusBarAlignment } from 'vscode';
import { MainThreadStatusBarShape } from './extHost.protocol';
export declare class ExtHostStatusBarEntry implements StatusBarItem {
    private static ID_GEN;
    private _id;
    private _alignment;
    private _priority;
    private _disposed;
    private _visible;
    private _text;
    private _tooltip;
    private _color;
    private _command;
    private _timeoutHandle;
    private _proxy;
    constructor(proxy: MainThreadStatusBarShape, alignment?: ExtHostStatusBarAlignment, priority?: number);
    id: number;
    alignment: StatusBarAlignment;
    priority: number;
    text: string;
    tooltip: string;
    color: string;
    command: string;
    show(): void;
    hide(): void;
    private update();
    dispose(): void;
}
export declare class ExtHostStatusBar {
    private _proxy;
    private _statusMessage;
    constructor(threadService: IThreadService);
    createStatusBarEntry(alignment?: ExtHostStatusBarAlignment, priority?: number): StatusBarItem;
    setStatusBarMessage(text: string, timeoutOrThenable?: number | Thenable<any>): Disposable;
}
