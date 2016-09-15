import { TPromise } from 'vs/base/common/winjs.base';
import { ICompatWorkerService, ICompatMode } from 'vs/editor/common/services/compatWorkerService';
import { IResourceService } from 'vs/editor/common/services/resourceService';
import { ILanguageExtensionPoint, IModeService } from 'vs/editor/common/services/modeService';
import { ILegacyLanguageDefinition } from 'vs/editor/common/modes/modesRegistry';
export declare class CompatWorkerServiceWorker implements ICompatWorkerService {
    private resourceService;
    private modeService;
    _serviceBrand: any;
    isInMainThread: boolean;
    private _compatModes;
    constructor(resourceService: IResourceService, modeService: IModeService, modesRegistryData: {
        compatModes: ILegacyLanguageDefinition[];
        languages: ILanguageExtensionPoint[];
    });
    registerCompatMode(compatMode: ICompatMode): void;
    handleMainRequest(rpcId: string, methodName: string, args: any[]): any;
    CompatWorker(obj: ICompatMode, methodName: string, target: Function, param: any[]): TPromise<any>;
    private _acceptNewModel(data);
    private _acceptDidDisposeModel(uri);
    private _acceptModelEvents(uri, events);
    private _acceptCompatModes(modes);
    private _acceptLanguages(languages);
    private _instantiateCompatMode(modeId);
}
