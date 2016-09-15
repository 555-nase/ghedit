import { TPromise } from 'vs/base/common/winjs.base';
import { IAskpassService } from 'vs/workbench/parts/git/common/git';
export interface ICredentials {
    username: string;
    password: string;
}
export declare class GitAskpassService implements IAskpassService {
    private askpassCache;
    constructor();
    askpass(id: string, host: string, command: string): TPromise<ICredentials>;
}
