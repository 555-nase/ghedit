import { IExtensionIdentity, ILocalExtension, IGalleryExtension, IExtensionManagementService, IExtensionGalleryService } from 'vs/platform/extensionManagement/common/extensionManagement';
import { TPromise } from 'vs/base/common/winjs.base';
export declare function extensionEquals(one: IExtensionIdentity, other: IExtensionIdentity): boolean;
export declare function getTelemetryData(extension: ILocalExtension | IGalleryExtension): any;
export declare function getOutdatedExtensions(extensionsService: IExtensionManagementService, galleryService: IExtensionGalleryService): TPromise<ILocalExtension[]>;
