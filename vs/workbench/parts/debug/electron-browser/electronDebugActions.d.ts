import actions = require('vs/base/common/actions');
import { TPromise } from 'vs/base/common/winjs.base';
import { IDebugService } from 'vs/workbench/parts/debug/common/debug';
export declare class CopyValueAction extends actions.Action {
    private value;
    private debugService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, value: any, debugService: IDebugService);
    run(): TPromise<any>;
}
export declare class CopyAction extends actions.Action {
    static ID: string;
    static LABEL: string;
    run(): TPromise<any>;
}
