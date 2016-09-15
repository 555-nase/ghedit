import { ICommandLineArguments, IProcessEnvironment } from 'vs/code/electron-main/env';
import { IWindowsService } from 'vs/code/electron-main/windows';
import { TPromise } from 'vs/base/common/winjs.base';
import { IChannel } from 'vs/base/parts/ipc/common/ipc';
import { ILogService } from 'vs/code/electron-main/log';
export interface ILaunchService {
    start(args: ICommandLineArguments, userEnv: IProcessEnvironment): TPromise<void>;
}
export interface ILaunchChannel extends IChannel {
    call(command: 'start', args: ICommandLineArguments, userEnv: IProcessEnvironment): TPromise<void>;
    call(command: string, ...args: any[]): TPromise<any>;
}
export declare class LaunchChannel implements ILaunchChannel {
    private service;
    constructor(service: ILaunchService);
    call(command: string, ...args: any[]): TPromise<any>;
}
export declare class LaunchChannelClient implements ILaunchService {
    private channel;
    constructor(channel: ILaunchChannel);
    start(args: ICommandLineArguments, userEnv: IProcessEnvironment): TPromise<void>;
}
export declare class LaunchService implements ILaunchService {
    private logService;
    private windowsService;
    constructor(logService: ILogService, windowsService: IWindowsService);
    start(args: ICommandLineArguments, userEnv: IProcessEnvironment): TPromise<void>;
}
