var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/workbench/common/editor/resourceEditorInput', 'vs/editor/common/services/modelService', 'vs/editor/common/services/modeService', 'vs/base/common/winjs.base', 'vs/platform/jsonschemas/common/jsonContributionRegistry', 'vs/platform/platform', 'vs/workbench/common/contributions'], function (require, exports, resourceEditorInput_1, modelService_1, modeService_1, winjs_base_1, JSONContributionRegistry, platform_1, contributions_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var schemaRegistry = platform_1.Registry.as(JSONContributionRegistry.Extensions.JSONContribution);
    var WorkbenchContentProvider = (function () {
        function WorkbenchContentProvider(modelService, modeService) {
            this.modelService = modelService;
            this.modeService = modeService;
            this.start();
        }
        WorkbenchContentProvider.prototype.getId = function () {
            return 'vs.contentprovider';
        };
        WorkbenchContentProvider.prototype.start = function () {
            var _this = this;
            resourceEditorInput_1.ResourceEditorInput.registerResourceContentProvider('vscode', {
                provideTextContent: function (uri) {
                    if (uri.scheme !== 'vscode') {
                        return null;
                    }
                    if (uri.authority === 'schemas') {
                        var schemas = schemaRegistry.getSchemaContributions().schemas;
                        var schema = schemas[uri.toString()];
                        if (schema) {
                            var modelContent = JSON.stringify(schema);
                            var mode = _this.modeService.getOrCreateMode('json');
                            return winjs_base_1.TPromise.as(_this.modelService.createModel(modelContent, mode, uri));
                        }
                    }
                    return null;
                }
            });
        };
        WorkbenchContentProvider = __decorate([
            __param(0, modelService_1.IModelService),
            __param(1, modeService_1.IModeService)
        ], WorkbenchContentProvider);
        return WorkbenchContentProvider;
    }());
    exports.WorkbenchContentProvider = WorkbenchContentProvider;
    platform_1.Registry.as(contributions_1.Extensions.Workbench).registerWorkbenchContribution(WorkbenchContentProvider);
});
//# sourceMappingURL=contentprovider.contribution.js.map