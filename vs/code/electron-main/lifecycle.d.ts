import { TPromise } from 'vs/base/common/winjs.base';
import { VSCodeWindow } from 'vs/code/electron-main/window';
import { IEnvironmentService } from 'vs/code/electron-main/env';
import { ILogService } from 'vs/code/electron-main/log';
import { IStorageService } from 'vs/code/electron-main/storage';
export declare const ILifecycleService: {
    (...args: any[]): void;
    type: ILifecycleService;
};
export interface ILifecycleService {
    _serviceBrand: any;
    /**
     * Will be true if an update was applied. Will only be true for each update once.
     */
    wasUpdated: boolean;
    onBeforeQuit(clb: () => void): () => void;
    ready(): void;
    registerWindow(vscodeWindow: VSCodeWindow): void;
    unload(vscodeWindow: VSCodeWindow): TPromise<boolean>;
    quit(fromUpdate?: boolean): TPromise<boolean>;
}
export declare class LifecycleService implements ILifecycleService {
    private envService;
    private logService;
    private storageService;
    _serviceBrand: any;
    private static QUIT_FROM_UPDATE_MARKER;
    private eventEmitter;
    private windowToCloseRequest;
    private quitRequested;
    private pendingQuitPromise;
    private pendingQuitPromiseComplete;
    private oneTimeListenerTokenGenerator;
    private _wasUpdated;
    constructor(envService: IEnvironmentService, logService: ILogService, storageService: IStorageService);
    private handleUpdated();
    wasUpdated: boolean;
    /**
     * Due to the way we handle lifecycle with eventing, the general app.on('before-quit')
     * event cannot be used because it can be called twice on shutdown. Instead the onBeforeQuit
     * handler in this module can be used and it is only called once on a shutdown sequence.
     */
    onBeforeQuit(clb: () => void): () => void;
    ready(): void;
    private registerListeners();
    registerWindow(vscodeWindow: VSCodeWindow): void;
    unload(vscodeWindow: VSCodeWindow): TPromise<boolean>;
    /**
     * A promise that completes to indicate if the quit request has been veto'd
     * by the user or not.
     */
    quit(fromUpdate?: boolean): TPromise<boolean>;
}
