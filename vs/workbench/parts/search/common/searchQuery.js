var __decorate=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,c=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(i=e[u])&&(c=(o<3?i(c):o>3?i(t,r,c):i(t,r))||c);return o>3&&c&&Object.defineProperty(t,r,c),c},__param=this&&this.__param||function(e,t){return function(r,n){t(r,n,e)}};define(["require","exports","vs/base/common/objects","vs/platform/search/common/search","vs/platform/configuration/common/configuration"],function(e,t,r,n,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function o(e){var t=e&&e.files&&e.files.exclude,n=e&&e.search&&e.search.exclude;if(!t&&!n)return null;if(!t||!n)return t||n;var i=Object.create(null);return i=r.mixin(i,t),i=r.mixin(i,n,!0)}t.getExcludes=o;var c=function(){function e(e){this.configurationService=e}return e.prototype.text=function(e,t){return this.query(n.QueryType.Text,e,t)},e.prototype.file=function(e){return this.query(n.QueryType.File,null,e)},e.prototype.query=function(e,t,n){void 0===n&&(n={});var i=this.configurationService.getConfiguration(),c=o(i);return n.excludePattern?r.mixin(n.excludePattern,c,!1):n.excludePattern=c,{type:e,folderResources:n.folderResources,extraFileResources:n.extraFileResources,filePattern:n.filePattern,excludePattern:n.excludePattern,includePattern:n.includePattern,maxResults:n.maxResults,fileEncoding:n.fileEncoding,contentPattern:t}},e=__decorate([__param(0,i.IConfigurationService)],e)}();t.QueryBuilder=c});