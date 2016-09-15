import { TPromise } from 'vs/base/common/winjs.base';
import { TypeConstraint } from 'vs/base/common/types';
import { ServicesAccessor } from 'vs/platform/instantiation/common/instantiation';
export declare const ICommandService: {
    (...args: any[]): void;
    type: ICommandService;
};
export interface ICommandService {
    _serviceBrand: any;
    executeCommand<T>(commandId: string, ...args: any[]): TPromise<T>;
    executeCommand(commandId: string, ...args: any[]): TPromise<any>;
}
export interface ICommandsMap {
    [id: string]: ICommand;
}
export interface ICommandHandler {
    (accessor: ServicesAccessor, ...args: any[]): void;
}
export interface ICommand {
    handler: ICommandHandler;
    description?: ICommandHandlerDescription;
}
export interface ICommandHandlerDescription {
    description: string;
    args: {
        name: string;
        description?: string;
        constraint?: TypeConstraint;
    }[];
    returns?: string;
}
export interface ICommandRegistry {
    registerCommand(id: string, command: ICommandHandler): void;
    registerCommand(id: string, command: ICommand): void;
    getCommand(id: string): ICommand;
    getCommands(): ICommandsMap;
}
export declare const CommandsRegistry: ICommandRegistry;
export declare const NullCommandService: ICommandService;
