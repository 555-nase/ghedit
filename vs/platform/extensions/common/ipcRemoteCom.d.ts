import remote = require('vs/base/common/remote');
export interface IMainProcessExtHostIPC extends remote.IRemoteCom {
    handle(msg: string[]): void;
}
export declare function create(send: (obj: string[]) => void): IMainProcessExtHostIPC;
