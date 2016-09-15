import { IRemoteCom } from 'vs/base/common/remote';
import { TPromise } from 'vs/base/common/winjs.base';
import { AbstractThreadService } from 'vs/workbench/services/thread/common/abstractThreadService';
import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
export declare class ExtHostThreadService extends AbstractThreadService implements IThreadService {
    _serviceBrand: any;
    protected _remoteCom: IRemoteCom;
    constructor(remoteCom: IRemoteCom);
    protected _callOnRemote(proxyId: string, path: string, args: any[]): TPromise<any>;
}
