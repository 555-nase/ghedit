/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(e,i,t,n){var o,r=arguments.length,s=r<3?i:null===n?n=Object.getOwnPropertyDescriptor(i,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,i,t,n);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(s=(r<3?o(s):r>3?o(i,t,s):o(i,t))||s);return r>3&&s&&Object.defineProperty(i,t,s),s},__param=this&&this.__param||function(e,i){return function(t,n){i(t,n,e)}};define(["require","exports","vs/base/common/lifecycle","vs/editor/common/services/codeEditorService","vs/workbench/parts/files/common/files","vs/editor/common/core/selection","vs/editor/common/commands/trimTrailingWhitespaceCommand","vs/platform/configuration/common/configuration","vs/platform/event/common/event"],function(e,i,t,n,o,r,s,c,a){"use strict";var p=function(){function e(e,i,t){this.configurationService=e,this.eventService=i,this.codeEditorService=t,this.toUnbind=[],this.trimTrailingWhitespace=!1,this.registerListeners(),this.onConfigurationChange(this.configurationService.getConfiguration())}return e.prototype.registerListeners=function(){var e=this;this.toUnbind.push(this.eventService.addListener2(o.EventType.FILE_SAVING,function(i){return e.onTextFileSaving(i)})),this.toUnbind.push(this.configurationService.onDidUpdateConfiguration(function(i){return e.onConfigurationChange(i.config)}))},e.prototype.onConfigurationChange=function(e){this.trimTrailingWhitespace=e&&e.files&&e.files.trimTrailingWhitespace},e.prototype.getId=function(){return"vs.files.saveparticipant"},e.prototype.onTextFileSaving=function(e){this.trimTrailingWhitespace&&this.doTrimTrailingWhitespace(e.model,e.isAutoSaved)},e.prototype.doTrimTrailingWhitespace=function(e,i){var t=[new r.Selection(1,1,1,1)],n=[];if(e.isAttachedToEditor())for(var o=this.codeEditorService.listCodeEditors(),c=0,a=o.length;c<a;c++){var p=o[c],f=p.getModel();f&&e===f&&(t=p.getSelections(),i&&n.push.apply(n,t.map(function(e){return{lineNumber:e.positionLineNumber,column:e.positionColumn}})))}var u=s.trimTrailingWhitespace(e,n);u.length&&e.pushEditOperations(t,u,function(e){return t})},e.prototype.dispose=function(){this.toUnbind=t.dispose(this.toUnbind)},e=__decorate([__param(0,c.IConfigurationService),__param(1,a.IEventService),__param(2,n.ICodeEditorService)],e)}();i.SaveParticipant=p});