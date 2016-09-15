import { TPromise } from 'vs/base/common/winjs.base';
import { Action } from 'vs/base/common/actions';
import { IEventEmitter } from 'vs/base/common/eventEmitter';
import { TerminateResponse } from 'vs/base/common/processes';
import { ITaskSummary, TaskDescription, TaskEvent, TaskType } from 'vs/workbench/parts/tasks/common/taskSystem';
export { ITaskSummary, TaskDescription, TaskEvent, TaskType };
export declare const ITaskService: {
    (...args: any[]): void;
    type: ITaskService;
};
export declare namespace TaskServiceEvents {
    let Active: string;
    let Inactive: string;
    let ConfigChanged: string;
    let Terminated: string;
}
export interface ITaskService extends IEventEmitter {
    _serviceBrand: any;
    configureAction(): Action;
    build(): TPromise<ITaskSummary>;
    rebuild(): TPromise<ITaskSummary>;
    clean(): TPromise<ITaskSummary>;
    runTest(): TPromise<ITaskSummary>;
    run(taskIdentifier: string): TPromise<ITaskSummary>;
    isActive(): TPromise<boolean>;
    terminate(): TPromise<TerminateResponse>;
    tasks(): TPromise<TaskDescription[]>;
}
