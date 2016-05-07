var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/base/common/objects', 'vs/platform/search/common/search', 'vs/platform/configuration/common/configuration'], function (require, exports, objects, search, configuration_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    function getExcludes(configuration) {
        var fileExcludes = configuration && configuration.files && configuration.files.exclude;
        var searchExcludes = configuration && configuration.search && configuration.search.exclude;
        if (!fileExcludes && !searchExcludes) {
            return null;
        }
        if (!fileExcludes || !searchExcludes) {
            return fileExcludes || searchExcludes;
        }
        var allExcludes = Object.create(null);
        allExcludes = objects.mixin(allExcludes, fileExcludes);
        allExcludes = objects.mixin(allExcludes, searchExcludes, true);
        return allExcludes;
    }
    exports.getExcludes = getExcludes;
    var QueryBuilder = (function () {
        function QueryBuilder(configurationService) {
            this.configurationService = configurationService;
        }
        QueryBuilder.prototype.text = function (contentPattern, options) {
            return this.query(search.QueryType.Text, contentPattern, options);
        };
        QueryBuilder.prototype.file = function (options) {
            return this.query(search.QueryType.File, null, options);
        };
        QueryBuilder.prototype.query = function (type, contentPattern, options) {
            if (options === void 0) { options = {}; }
            var configuration = this.configurationService.getConfiguration();
            var excludePattern = getExcludes(configuration);
            if (!options.excludePattern) {
                options.excludePattern = excludePattern;
            }
            else {
                objects.mixin(options.excludePattern, excludePattern, false /* no overwrite */);
            }
            return {
                type: type,
                folderResources: options.folderResources,
                extraFileResources: options.extraFileResources,
                filePattern: options.filePattern,
                excludePattern: options.excludePattern,
                includePattern: options.includePattern,
                maxResults: options.maxResults,
                fileEncoding: options.fileEncoding,
                contentPattern: contentPattern
            };
        };
        QueryBuilder = __decorate([
            __param(0, configuration_1.IConfigurationService)
        ], QueryBuilder);
        return QueryBuilder;
    }());
    exports.QueryBuilder = QueryBuilder;
});
//# sourceMappingURL=searchQuery.js.map