import { TPromise } from 'vs/base/common/winjs.base';
import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
export declare class ExtHostLanguages {
    private _proxy;
    constructor(threadService: IThreadService);
    getLanguages(): TPromise<string[]>;
}
