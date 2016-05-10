/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/base/common/lifecycle', 'vs/workbench/parts/git/common/git', 'vs/workbench/parts/output/common/output'], function (require, exports, lifecycle_1, git_1, output_1) {
    'use strict';
    var GitOutput = (function () {
        function GitOutput(gitService, outputService) {
            var _this = this;
            this.gitService = gitService;
            this.outputService = outputService;
            var listener = gitService.addListener2(git_1.ServiceEvents.OPERATION_START, function () {
                _this.outputListener = _this.gitService.onOutput(function (output) { return _this.onOutput(output); });
                listener.dispose();
            });
        }
        GitOutput.prototype.getId = function () {
            return GitOutput.ID;
        };
        GitOutput.prototype.onOutput = function (output) {
            this.outputService.getChannel('Git').append(output);
        };
        GitOutput.prototype.dispose = function () {
            this.outputListener = lifecycle_1.dispose(this.outputListener);
        };
        GitOutput.ID = 'Monaco.IDE.UI.Viewlets.GitViewlet.Workbench.GitOutput';
        GitOutput = __decorate([
            __param(0, git_1.IGitService),
            __param(1, output_1.IOutputService)
        ], GitOutput);
        return GitOutput;
    }());
    exports.GitOutput = GitOutput;
});
//# sourceMappingURL=gitOutput.js.map