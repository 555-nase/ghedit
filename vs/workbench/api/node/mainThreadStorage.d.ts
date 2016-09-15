import { TPromise } from 'vs/base/common/winjs.base';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { MainThreadStorageShape } from './extHost.protocol';
export declare class MainThreadStorage extends MainThreadStorageShape {
    private _storageService;
    constructor(storageService: IStorageService);
    $getValue<T>(shared: boolean, key: string): TPromise<T>;
    $setValue(shared: boolean, key: string, value: any): TPromise<any>;
}
