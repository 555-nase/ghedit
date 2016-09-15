import Severity from 'vs/base/common/severity';
import { TPromise } from 'vs/base/common/winjs.base';
import { TerminateResponse } from 'vs/base/common/processes';
import { IEventEmitter } from 'vs/base/common/eventEmitter';
import { ProblemMatcher } from 'vs/platform/markers/common/problemMatcher';
export declare enum TaskErrors {
    NotConfigured = 0,
    RunningTask = 1,
    NoBuildTask = 2,
    NoTestTask = 3,
    ConfigValidationError = 4,
    TaskNotFound = 5,
    NoValidTaskRunner = 6,
    UnknownError = 7,
}
export declare class TaskError {
    severity: Severity;
    message: string;
    code: TaskErrors;
    constructor(severity: Severity, message: string, code: TaskErrors);
}
export interface TelemetryEvent {
    trigger: string;
    command: string;
    success: boolean;
}
export declare namespace Triggers {
    let shortcut: string;
    let command: string;
}
export declare enum ShowOutput {
    Always = 0,
    Silent = 1,
    Never = 2,
}
export declare namespace ShowOutput {
    function fromString(value: string): ShowOutput;
}
/**
 * A task description
 */
export interface TaskDescription {
    /**
     * The task's internal id
     */
    id: string;
    /**
     * The task's name
     */
    name: string;
    /**
     * Suppresses the task name when calling the task using the task runner.
     */
    suppressTaskName?: boolean;
    /**
     * Additional arguments passed to the command when this target is
     * invoked.
     */
    args?: string[];
    /**
     * Whether the task is running in watching mode or not.
     */
    isWatching?: boolean;
    /**
     * Whether the task should prompt on close for confirmation if running.
     */
    promptOnClose?: boolean;
    /**
     * Controls whether the output of the running tasks is shown or not. Default
     * value is "always".
     */
    showOutput: ShowOutput;
    /**
     * Controls whether the executed command is printed to the output windows as well.
     */
    echoCommand?: boolean;
    /**
     * The problem watchers to use for this task
     */
    problemMatchers?: ProblemMatcher[];
}
export interface CommandOptions {
    /**
     * The current working directory of the executed program or shell.
     * If omitted VSCode's current workspace root is used.
     */
    cwd?: string;
    /**
     * The environment of the executed program or shell. If omitted
     * the parent process' environment is used.
     */
    env?: {
        [key: string]: string;
    };
}
/**
 * Describs the settings of a task runner
 */
export interface BaseTaskRunnerConfiguration {
    /**
     * The command to execute
     */
    command?: string;
    /**
     * Whether the task is a shell command or not
     */
    isShellCommand?: boolean;
    /**
     * Additional command options
     */
    options?: CommandOptions;
    /**
     * General args
     */
    args?: string[];
    /**
     * The configured tasks
     */
    tasks?: {
        [id: string]: TaskDescription;
    };
}
/**
 * Describs the settings of a task runner
 */
export interface TaskRunnerConfiguration extends BaseTaskRunnerConfiguration {
    /**
     * The command to execute. Not optional.
     */
    command: string;
}
export interface ITaskSummary {
    /**
     * Exit code of the process.
     */
    exitCode?: number;
}
export interface ITaskRunResult {
    restartOnFileChanges?: string;
    promise: TPromise<ITaskSummary>;
}
export declare namespace TaskSystemEvents {
    let Active: string;
    let Inactive: string;
}
export declare enum TaskType {
    SingleRun = 0,
    Watching = 1,
}
export interface TaskEvent {
    taskId?: string;
    taskName?: string;
    type?: TaskType;
}
export interface ITaskSystem extends IEventEmitter {
    build(): ITaskRunResult;
    rebuild(): ITaskRunResult;
    clean(): ITaskRunResult;
    runTest(): ITaskRunResult;
    run(taskIdentifier: string): ITaskRunResult;
    isActive(): TPromise<boolean>;
    isActiveSync(): boolean;
    canAutoTerminate(): boolean;
    terminate(): TPromise<TerminateResponse>;
    tasks(): TPromise<TaskDescription[]>;
}
/**
 * Build configuration settings shared between program and
 * service build systems.
 */
export interface TaskConfiguration {
    /**
     * The build system to use. If omitted program is used.
     */
    buildSystem?: string;
}
