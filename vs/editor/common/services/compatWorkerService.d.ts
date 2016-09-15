import URI from 'vs/base/common/uri';
import { TPromise } from 'vs/base/common/winjs.base';
import { IRawText } from 'vs/editor/common/editorCommon';
export declare var ICompatWorkerService: {
    (...args: any[]): void;
    type: ICompatWorkerService;
};
export interface IRawModelData {
    url: URI;
    versionId: number;
    value: IRawText;
    modeId: string;
}
export interface ICompatMode {
    getId(): string;
    compatWorkerService: ICompatWorkerService;
}
export interface ICompatWorkerService {
    _serviceBrand: any;
    isInMainThread: boolean;
    registerCompatMode(compatMode: ICompatMode): void;
    CompatWorker(obj: ICompatMode, methodName: string, target: Function, param: any[]): TPromise<any>;
}
export declare function CompatWorkerAttr(type: Function, target: Function): void;
