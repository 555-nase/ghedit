import { TPromise } from 'vs/base/common/winjs.base';
import { ICompatWorkerService, ICompatMode } from 'vs/editor/common/services/compatWorkerService';
import { IModelService } from 'vs/editor/common/services/modelService';
export declare class MainThreadCompatWorkerService implements ICompatWorkerService {
    _serviceBrand: any;
    isInMainThread: boolean;
    private _workerFactory;
    private _worker;
    private _workerCreatedPromise;
    private _triggerWorkersCreatedPromise;
    private _modelListeners;
    constructor(modelService: IModelService);
    registerCompatMode(compatMode: ICompatMode): void;
    CompatWorker(obj: ICompatMode, methodName: string, target: Function, param: any[]): TPromise<any>;
    private _ensureWorkers();
    private _afterWorkers();
    private _createWorker(isRetry?);
    private _call(rpcId, methodName, args);
}
