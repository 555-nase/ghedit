import Severity from 'vs/base/common/severity';
import { TPromise } from 'vs/base/common/winjs.base';
export interface IExtensionDescription {
    id: string;
    name: string;
    version: string;
    publisher: string;
    isBuiltin: boolean;
    extensionFolderPath: string;
    extensionDependencies?: string[];
    activationEvents?: string[];
    engines: {
        vscode: string;
    };
    main?: string;
    contributes?: {
        [point: string]: any;
    };
}
export interface IActivationEventListener {
    (): void;
}
export interface IPointListener {
    (desc: IExtensionDescription[]): void;
}
export declare const IExtensionService: {
    (...args: any[]): void;
    type: IExtensionService;
};
export interface IMessage {
    type: Severity;
    message: string;
    source: string;
}
export interface IExtensionsStatus {
    messages: IMessage[];
}
export interface IExtensionService {
    _serviceBrand: any;
    /**
     * Send an activation event and activate interested extensions.
     */
    activateByEvent(activationEvent: string): TPromise<void>;
    /**
     * Block on this signal any interactions with extensions.
     */
    onReady(): TPromise<boolean>;
    /**
     * Get information about extensions status.
     */
    getExtensionsStatus(): {
        [id: string]: IExtensionsStatus;
    };
}
