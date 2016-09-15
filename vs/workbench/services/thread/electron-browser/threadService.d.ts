import { TPromise } from 'vs/base/common/winjs.base';
import { IMessageService } from 'vs/platform/message/common/message';
import { AbstractThreadService } from 'vs/workbench/services/thread/common/abstractThreadService';
import { ILifecycleService } from 'vs/platform/lifecycle/common/lifecycle';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { IWindowService } from 'vs/workbench/services/window/electron-browser/windowService';
import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
export declare const EXTENSION_LOG_BROADCAST_CHANNEL: string;
export declare const EXTENSION_ATTACH_BROADCAST_CHANNEL: string;
export declare const EXTENSION_TERMINATE_BROADCAST_CHANNEL: string;
export interface ILogEntry {
    type: string;
    severity: string;
    arguments: any;
}
export declare class MainThreadService extends AbstractThreadService implements IThreadService {
    _serviceBrand: any;
    private extensionHostProcessManager;
    private remoteCom;
    constructor(contextService: IWorkspaceContextService, messageService: IMessageService, windowService: IWindowService, lifecycleService: ILifecycleService);
    dispose(): void;
    protected _callOnRemote(proxyId: string, path: string, args: any[]): TPromise<any>;
}
