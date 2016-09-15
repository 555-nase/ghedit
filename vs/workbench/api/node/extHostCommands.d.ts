import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { ICommandHandlerDescription } from 'vs/platform/commands/common/commands';
import { TPromise } from 'vs/base/common/winjs.base';
import { ExtHostEditors } from 'vs/workbench/api/node/extHostEditors';
import * as extHostTypes from 'vs/workbench/api/node/extHostTypes';
import { ExtHostCommandsShape } from './extHost.protocol';
export declare class ExtHostCommands extends ExtHostCommandsShape {
    private _commands;
    private _proxy;
    private _extHostEditors;
    constructor(threadService: IThreadService, extHostEditors: ExtHostEditors);
    registerCommand(id: string, callback: <T>(...args: any[]) => T | Thenable<T>, thisArg?: any, description?: ICommandHandlerDescription): extHostTypes.Disposable;
    executeCommand<T>(id: string, ...args: any[]): Thenable<T>;
    $executeContributedCommand<T>(id: string, ...args: any[]): Thenable<T>;
    getCommands(filterUnderscoreCommands?: boolean): Thenable<string[]>;
    $getContributedCommandHandlerDescriptions(): TPromise<{
        [id: string]: string | ICommandHandlerDescription;
    }>;
}
