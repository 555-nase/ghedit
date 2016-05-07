define(["require", "exports"], function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    (function (TaskErrors) {
        TaskErrors[TaskErrors["NotConfigured"] = 0] = "NotConfigured";
        TaskErrors[TaskErrors["RunningTask"] = 1] = "RunningTask";
        TaskErrors[TaskErrors["NoBuildTask"] = 2] = "NoBuildTask";
        TaskErrors[TaskErrors["NoTestTask"] = 3] = "NoTestTask";
        TaskErrors[TaskErrors["ConfigValidationError"] = 4] = "ConfigValidationError";
        TaskErrors[TaskErrors["TaskNotFound"] = 5] = "TaskNotFound";
        TaskErrors[TaskErrors["NoValidTaskRunner"] = 6] = "NoValidTaskRunner";
        TaskErrors[TaskErrors["UnknownError"] = 7] = "UnknownError";
    })(exports.TaskErrors || (exports.TaskErrors = {}));
    var TaskErrors = exports.TaskErrors;
    var TaskError = (function () {
        function TaskError(severity, message, code) {
            this.severity = severity;
            this.message = message;
            this.code = code;
        }
        return TaskError;
    }());
    exports.TaskError = TaskError;
    var Triggers;
    (function (Triggers) {
        Triggers.shortcut = 'shortcut';
        Triggers.command = 'command';
    })(Triggers = exports.Triggers || (exports.Triggers = {}));
    (function (ShowOutput) {
        ShowOutput[ShowOutput["Always"] = 0] = "Always";
        ShowOutput[ShowOutput["Silent"] = 1] = "Silent";
        ShowOutput[ShowOutput["Never"] = 2] = "Never";
    })(exports.ShowOutput || (exports.ShowOutput = {}));
    var ShowOutput = exports.ShowOutput;
    var ShowOutput;
    (function (ShowOutput) {
        function fromString(value) {
            value = value.toLowerCase();
            if (value === 'always') {
                return ShowOutput.Always;
            }
            else if (value === 'silent') {
                return ShowOutput.Silent;
            }
            else if (value === 'never') {
                return ShowOutput.Never;
            }
            else {
                return undefined;
            }
        }
        ShowOutput.fromString = fromString;
    })(ShowOutput = exports.ShowOutput || (exports.ShowOutput = {}));
    var TaskSystemEvents;
    (function (TaskSystemEvents) {
        TaskSystemEvents.Active = 'active';
        TaskSystemEvents.Inactive = 'inactive';
    })(TaskSystemEvents = exports.TaskSystemEvents || (exports.TaskSystemEvents = {}));
    (function (TaskType) {
        TaskType[TaskType["SingleRun"] = 0] = "SingleRun";
        TaskType[TaskType["Watching"] = 1] = "Watching";
    })(exports.TaskType || (exports.TaskType = {}));
    var TaskType = exports.TaskType;
});
//# sourceMappingURL=taskSystem.js.map