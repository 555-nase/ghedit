import { TPromise } from 'vs/base/common/winjs.base';
import { IManyHandler } from 'vs/base/common/remote';
import { ProxyIdentifier } from 'vs/workbench/services/thread/common/threadService';
export declare abstract class AbstractThreadService implements IManyHandler {
    private _isMain;
    protected _locals: {
        [id: string]: any;
    };
    private _proxies;
    constructor(isMain: boolean);
    handle(rpcId: string, methodName: string, args: any[]): any;
    get<T>(identifier: ProxyIdentifier<T>): T;
    private _createProxy<T>(id, methodNames);
    private createMethodProxy(id, methodName);
    set<T>(identifier: ProxyIdentifier<T>, value: T): void;
    protected abstract _callOnRemote(proxyId: string, path: string, args: any[]): TPromise<any>;
}
