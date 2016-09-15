import { TPromise } from 'vs/base/common/winjs.base';
import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
export declare class ExtHostStorage {
    private _proxy;
    constructor(threadService: IThreadService);
    getValue<T>(shared: boolean, key: string, defaultValue?: T): TPromise<T>;
    setValue(shared: boolean, key: string, value: any): TPromise<void>;
}
