import { Config as ProcessConfig } from 'vs/base/common/processes';
import { ValidationStatus, ILogger } from 'vs/base/common/parsers';
import { Config as ProblemMatcherConfig } from 'vs/platform/markers/common/problemMatcher';
import * as TaskSystem from 'vs/workbench/parts/tasks/common/taskSystem';
/**
 * Defines the problem handling strategy
 */
export declare class ProblemHandling {
    /**
     * Cleans all problems for the owner defined in the
     * error pattern.
     */
    static clean: string;
}
export declare namespace ShowOutput {
}
/**
 * The description of a task.
 */
export interface TaskDescription {
    /**
     * The task's name
     */
    taskName: string;
    /**
     * Additional arguments passed to the command when this task is
     * executed.
     */
    args?: string[];
    /**
     * Whether the executed command is kept alive and is watching the file system.
     */
    isWatching?: boolean;
    /**
     * Whether the task should prompt on close for confirmation if running.
     */
    promptOnClose?: boolean;
    /**
     * Whether this task maps to the default build command.
     */
    isBuildCommand?: boolean;
    /**
     * Whether this task maps to the default test command.
     */
    isTestCommand?: boolean;
    /**
     * Controls whether the output view of the running tasks is brought to front or not.
     * See BaseTaskRunnerConfiguration#showOutput for details.
     */
    showOutput?: string;
    /**
     * Controls whether the executed command is printed to the output windows as well.
     */
    echoCommand?: boolean;
    /**
     * See BaseTaskRunnerConfiguration#suppressTaskName for details.
     */
    suppressTaskName?: boolean;
    /**
     * The problem matcher(s) to use to capture problems in the tasks
     * output.
     */
    problemMatcher?: ProblemMatcherConfig.ProblemMatcherType;
}
/**
 * The base task runner configuration
 */
export interface BaseTaskRunnerConfiguration extends TaskSystem.TaskConfiguration {
    /**
     * The command to be executed. Can be an external program or a shell
     * command.
     */
    command?: string;
    /**
     * Specifies whether the command is a shell command and therefore must
     * be executed in a shell interpreter (e.g. cmd.exe, bash, ...).
     *
     * Defaults to false if omitted.
     */
    isShellCommand?: boolean;
    /**
     * The command options used when the command is executed. Can be omitted.
     */
    options?: ProcessConfig.CommandOptions;
    /**
     * The arguments passed to the command. Can be omitted.
     */
    args?: string[];
    /**
     * Controls whether the output view of the running tasks is brought to front or not.
     * Valid values are:
     *   "always": bring the output window always to front when a task is executed.
     *   "silent": only bring it to front if no problem matcher is defined for the task executed.
     *   "never": never bring the output window to front.
     *
     * If omitted "always" is used.
     */
    showOutput?: string;
    /**
     * Controls whether the executed command is printed to the output windows as well.
     */
    echoCommand?: boolean;
    /**
     * If set to false the task name is added as an additional argument to the
     * command when executed. If set to true the task name is suppressed. If
     * omitted false is used.
     */
    suppressTaskName?: boolean;
    /**
     * Some commands require that the task argument is highlighted with a special
     * prefix (e.g. /t: for msbuild). This property can be used to control such
     * a prefix.
     */
    taskSelector?: string;
    /**
     * The problem matcher(s) to used if a global command is exucuted (e.g. no tasks
     * are defined). A tasks.json file can either contain a global problemMatcher
     * property or a tasks property but not both.
     */
    problemMatcher?: ProblemMatcherConfig.ProblemMatcherType;
    /**
     * Specifies whether a global command is a watching the filesystem. A task.json
     * file can iether contains a global isWatching property or a tasks property
     * but not both.
     */
    isWatching?: boolean;
    /**
     * Whether the task should prompt on close for confirmation if running.
     */
    promptOnClose?: boolean;
    /**
     * The configuration of the available tasks. A tasks.json file can either
     * contain a global problemMatcher property or a tasks property but not both.
     */
    tasks?: TaskDescription[];
    /**
     * Problem matcher declarations
     */
    declares?: ProblemMatcherConfig.NamedProblemMatcher[];
}
/**
 * A configuration of an external build system. BuildConfiguration.buildSystem
 * must be set to 'program'
 */
export interface ExternalTaskRunnerConfiguration extends BaseTaskRunnerConfiguration {
    /**
     * The config's version number
     */
    version: string;
    /**
     * Windows specific task configuration
     */
    windows?: BaseTaskRunnerConfiguration;
    /**
     * Mac specific task configuration
     */
    osx?: BaseTaskRunnerConfiguration;
    /**
     * Linux speciif task configuration
     */
    linux?: BaseTaskRunnerConfiguration;
}
export interface ParseResult {
    validationStatus: ValidationStatus;
    configuration: TaskSystem.TaskRunnerConfiguration;
    defaultBuildTaskIdentifier: string;
    defaultTestTaskIdentifier: string;
}
export interface ILogger {
    log(value: string): void;
}
export declare function parse(configuration: ExternalTaskRunnerConfiguration, logger: ILogger): ParseResult;
