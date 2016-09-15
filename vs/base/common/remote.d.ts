import { TPromise } from 'vs/base/common/winjs.base';
export interface IManyHandler {
    handle(rpcId: string, method: string, args: any[]): any;
}
export interface IProxyHelper {
    callOnRemote(proxyId: string, path: string, args: any[]): TPromise<any>;
}
export interface IRemoteCom extends IProxyHelper {
    setManyHandler(handler: IManyHandler): void;
}
