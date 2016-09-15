import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { ICommandService } from 'vs/platform/commands/common/commands';
import { TPromise } from 'vs/base/common/winjs.base';
import { MainThreadCommandsShape } from './extHost.protocol';
export declare class MainThreadCommands extends MainThreadCommandsShape {
    private _threadService;
    private _commandService;
    private _proxy;
    constructor(_threadService: IThreadService, _commandService: ICommandService);
    $registerCommand(id: string): TPromise<any>;
    $executeCommand<T>(id: string, args: any[]): Thenable<T>;
    $getCommands(): Thenable<string[]>;
}
