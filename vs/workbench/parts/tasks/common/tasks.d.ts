import { ValidationStatus, ILogger, Parser } from 'vs/base/common/parsers';
import { Executable, Config as ProcessConfig } from 'vs/base/common/processes';
import { ProblemMatcher, Config as ProblemMatcherConfig } from 'vs/platform/markers/common/problemMatcher';
export declare namespace Config {
    /**
     * The description of a task.
     */
    interface Task {
        /**
         * The task's name.
         */
        name?: string;
        /**
         * The trigger to automatically activate the task.
         */
        trigger?: string | string[];
        /**
         * The executable
         */
        executable?: ProcessConfig.Executable;
        /**
         * Whether the executed command is kept alive and is watching the file system.
         */
        isWatching?: boolean;
        /**
         * Whether the task should prompt on close for confirmation if running.
         */
        promptOnClose?: boolean;
        /**
         * Controls whether the output view of the running tasks is brought to front or not.
         * See BaseTaskRunnerConfiguration#showOutput for details.
        */
        showOutput?: string;
        /**
         * Controls whether the executed command is printed to the output window as well.
         */
        echoCommand?: boolean;
        /**
         * Settings to control the task
         */
        settings?: string;
        /**
         * The problem matcher(s) to use to capture problems in the tasks
         * output.
         */
        problemMatcher?: ProblemMatcherConfig.ProblemMatcherType;
    }
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
 * The description of a task.
 */
export interface Task {
    /**
     * The task's internal id
     */
    id: string;
    /**
     * The task's name
     */
    name?: string;
    /**
     * The trigger to automatically activate the task.
     */
    trigger?: string[];
    /**
     * The executable
     */
    executable: Executable;
    /**
     * Whether the executed command is kept alive and is watching the file system.
     */
    isWatching: boolean;
    /**
     * Whether the task should prompt on close for confirmation if running.
     */
    promptOnClose?: boolean;
    /**
     * Controls whether the output view of the running tasks is brought to front or not.
     * See BaseTaskRunnerConfiguration#showOutput for details.
     */
    showOutput: ShowOutput;
    /**
     * Controls whether the executed command is printed to the output window as well.
     */
    echoCommand: boolean;
    /**
     * Settings to control the task
     */
    settings: string;
    /**
     * The problem matcher(s) to use to capture problems in the tasks
     * output.
     */
    problemMatcher: ProblemMatcher[];
}
export interface ParserSettings {
    globals?: Executable;
    emptyExecutable?: boolean;
    emptyCommand?: boolean;
}
export declare class TaskParser extends Parser {
    private resolver;
    constructor(resolver: {
        get(name: string): ProblemMatcher;
    }, logger: ILogger, validationStatus?: ValidationStatus);
    parse(json: Config.Task, parserSettings?: ParserSettings): Task;
    private parseProblemMatcher(json);
}
export declare class TaskRegistry {
    private tasks;
    constructor();
    add(task: Task): void;
    get(id: string): Task;
    exists(id: string): boolean;
    remove(id: string): void;
    all(): Task[];
}
