import Severity from 'vs/base/common/severity';
import { TPromise } from 'vs/base/common/winjs.base';
import { IExtensionDescription, IExtensionService, IExtensionsStatus } from 'vs/platform/extensions/common/extensions';
export declare abstract class ActivatedExtension {
    activationFailed: boolean;
    constructor(activationFailed: boolean);
}
export interface IActivatedExtensionMap<T extends ActivatedExtension> {
    [extensionId: string]: T;
}
export declare abstract class AbstractExtensionService<T extends ActivatedExtension> implements IExtensionService {
    _serviceBrand: any;
    private _activatingExtensions;
    protected _activatedExtensions: IActivatedExtensionMap<T>;
    private _onReady;
    private _onReadyC;
    constructor(isReadyByDefault: boolean);
    protected _triggerOnReady(): void;
    onReady(): TPromise<boolean>;
    getExtensionsStatus(): {
        [id: string]: IExtensionsStatus;
    };
    isActivated(extensionId: string): boolean;
    activateByEvent(activationEvent: string): TPromise<void>;
    activateById(extensionId: string): TPromise<void>;
    /**
     * Handle semantics related to dependencies for `currentExtension`.
     * semantics: `redExtensions` must wait for `greenExtensions`.
     */
    private _handleActivateRequest(currentExtension, greenExtensions, redExtensions);
    private _activateExtensions(extensionDescriptions, recursionLevel);
    protected _activateExtension(extensionDescription: IExtensionDescription): TPromise<void>;
    protected abstract _showMessage(severity: Severity, message: string): void;
    protected abstract _createFailedExtension(): T;
    protected abstract _actualActivateExtension(extensionDescription: IExtensionDescription): TPromise<T>;
}
