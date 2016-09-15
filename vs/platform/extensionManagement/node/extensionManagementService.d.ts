import { TPromise } from 'vs/base/common/winjs.base';
import { IExtensionManagementService, ILocalExtension, IGalleryExtension, InstallExtensionEvent, DidInstallExtensionEvent } from 'vs/platform/extensionManagement/common/extensionManagement';
import { IEnvironmentService } from 'vs/platform/environment/common/environment';
import Event from 'vs/base/common/event';
export declare class ExtensionManagementService implements IExtensionManagementService {
    private environmentService;
    _serviceBrand: any;
    private extensionsPath;
    private obsoletePath;
    private obsoleteFileLimiter;
    private disposables;
    private _onInstallExtension;
    onInstallExtension: Event<InstallExtensionEvent>;
    private _onDidInstallExtension;
    onDidInstallExtension: Event<DidInstallExtensionEvent>;
    private _onUninstallExtension;
    onUninstallExtension: Event<string>;
    private _onDidUninstallExtension;
    onDidUninstallExtension: Event<string>;
    constructor(environmentService: IEnvironmentService);
    install(extension: IGalleryExtension): TPromise<void>;
    install(zipPath: string): TPromise<void>;
    private installFromGallery(extension);
    private getLastValidExtensionVersion(extension);
    private _getLastValidExtensionVersion(extension, versions);
    private installValidExtension(zipPath, id, metadata?);
    uninstall(extension: ILocalExtension): TPromise<void>;
    getInstalled(includeDuplicateVersions?: boolean): TPromise<ILocalExtension[]>;
    private getAllInstalled();
    removeDeprecatedExtensions(): TPromise<void>;
    private getOutdatedExtensionIds();
    private isObsolete(id);
    private setObsolete(id);
    private unsetObsolete(id);
    private getObsoleteExtensions();
    private withObsoleteExtensions<T>(fn);
    private request(url);
    dispose(): void;
}
