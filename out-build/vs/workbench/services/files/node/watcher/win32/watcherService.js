/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", 'vs/platform/files/common/files', 'vs/workbench/services/files/node/watcher/common', 'vs/workbench/services/files/node/watcher/win32/csharpWatcherService'], function (require, exports, files_1, watcher, csharpWatcherService_1) {
    'use strict';
    var FileWatcher = (function () {
        function FileWatcher(basePath, ignored, eventEmitter, errorLogger, verboseLogging) {
            this.basePath = basePath;
            this.ignored = ignored;
            this.eventEmitter = eventEmitter;
            this.errorLogger = errorLogger;
            this.verboseLogging = verboseLogging;
        }
        FileWatcher.prototype.startWatching = function () {
            var _this = this;
            var watcher = new csharpWatcherService_1.OutOfProcessWin32FolderWatcher(this.basePath, this.ignored, function (events) { return _this.onRawFileEvents(events); }, function (error) { return _this.onError(error); }, this.verboseLogging);
            return function () { return watcher.dispose(); };
        };
        FileWatcher.prototype.onRawFileEvents = function (events) {
            // Emit through broadcast service
            if (events.length > 0) {
                this.eventEmitter.emit(files_1.EventType.FILE_CHANGES, watcher.toFileChangesEvent(events));
            }
        };
        FileWatcher.prototype.onError = function (error) {
            this.errorLogger(error);
        };
        return FileWatcher;
    }());
    exports.FileWatcher = FileWatcher;
});
//# sourceMappingURL=watcherService.js.map