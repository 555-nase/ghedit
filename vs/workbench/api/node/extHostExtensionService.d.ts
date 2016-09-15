import { IDisposable } from 'vs/base/common/lifecycle';
import Severity from 'vs/base/common/severity';
import { TPromise } from 'vs/base/common/winjs.base';
import { AbstractExtensionService, ActivatedExtension } from 'vs/platform/extensions/common/abstractExtensionService';
import { IMessage, IExtensionDescription } from 'vs/platform/extensions/common/extensions';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
/**
 * Represents the source code (module) of an extension.
 */
export interface IExtensionModule {
    activate(ctx: IExtensionContext): TPromise<IExtensionAPI>;
    deactivate(): void;
}
/**
 * Represents the API of an extension (return value of `activate`).
 */
export interface IExtensionAPI {
}
export declare class ExtHostExtension extends ActivatedExtension {
    module: IExtensionModule;
    exports: IExtensionAPI;
    subscriptions: IDisposable[];
    constructor(activationFailed: boolean, module: IExtensionModule, exports: IExtensionAPI, subscriptions: IDisposable[]);
}
export declare class ExtHostEmptyExtension extends ExtHostExtension {
    constructor();
}
export interface IExtensionMemento {
    get<T>(key: string, defaultValue: T): T;
    update(key: string, value: any): Thenable<boolean>;
}
export interface IExtensionContext {
    subscriptions: IDisposable[];
    workspaceState: IExtensionMemento;
    globalState: IExtensionMemento;
    extensionPath: string;
    storagePath: string;
    asAbsolutePath(relativePath: string): string;
}
export declare class ExtHostExtensionService extends AbstractExtensionService<ExtHostExtension> {
    private _threadService;
    private _storage;
    private _proxy;
    private _telemetryService;
    private _workspaceStoragePath;
    /**
     * This class is constructed manually because it is a service, so it doesn't use any ctor injection
     */
    constructor(threadService: IThreadService, telemetryService: ITelemetryService, args: {
        _serviceBrand: any;
        workspaceStoragePath: string;
    });
    $localShowMessage(severity: Severity, msg: string): void;
    get(extensionId: string): IExtensionAPI;
    deactivate(extensionId: string): void;
    registrationDone(messages: IMessage[]): void;
    protected _showMessage(severity: Severity, msg: string): void;
    protected _createFailedExtension(): ExtHostExtension;
    private _loadExtensionContext(extensionDescription);
    protected _actualActivateExtension(extensionDescription: IExtensionDescription): TPromise<ActivatedExtension>;
    private _doActualActivateExtension(extensionDescription);
    private static _callActivate(extensionModule, context);
    private static _callActivateOptional(extensionModule, context);
    $activateExtension(extensionDescription: IExtensionDescription): TPromise<void>;
}
