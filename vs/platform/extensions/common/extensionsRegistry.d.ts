import { IJSONSchema } from 'vs/base/common/jsonSchema';
import { IActivationEventListener, IMessage, IExtensionDescription } from 'vs/platform/extensions/common/extensions';
export interface IExtensionMessageCollector {
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
}
export declare function isValidExtensionDescription(extensionFolderPath: string, extensionDescription: IExtensionDescription, notices: string[]): boolean;
export interface IExtensionPointUser<T> {
    description: IExtensionDescription;
    value: T;
    collector: IExtensionMessageCollector;
}
export interface IExtensionPointHandler<T> {
    (extensions: IExtensionPointUser<T>[]): void;
}
export interface IExtensionPoint<T> {
    name: string;
    setHandler(handler: IExtensionPointHandler<T>): void;
}
export interface IExtensionsRegistry {
    registerExtensions(extensionDescriptions: IExtensionDescription[]): void;
    getExtensionDescriptionsForActivationEvent(activationEvent: string): IExtensionDescription[];
    getAllExtensionDescriptions(): IExtensionDescription[];
    getExtensionDescription(extensionId: string): IExtensionDescription;
    registerOneTimeActivationEventListener(activationEvent: string, listener: IActivationEventListener): void;
    triggerActivationEventListeners(activationEvent: string): void;
    registerExtensionPoint<T>(extensionPoint: string, jsonSchema: IJSONSchema): IExtensionPoint<T>;
    handleExtensionPoints(messageHandler: (msg: IMessage) => void): void;
}
export declare const ExtensionsRegistry: IExtensionsRegistry;
