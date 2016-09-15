var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},__decorate=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(s=(r<3?o(s):r>3?o(t,n,s):o(t,n))||s);return r>3&&s&&Object.defineProperty(t,n,s),s},__param=this&&this.__param||function(e,t){return function(n,i){t(n,i,e)}};define(["require","exports","vs/workbench/common/editor/stringEditorModel","vs/editor/common/editorCommon","vs/workbench/common/events","vs/platform/configuration/common/configuration","vs/platform/event/common/event","vs/editor/common/services/modeService","vs/editor/common/services/modelService"],function(e,t,n,i,o,r,s,c,d){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var u=function(e){function t(t,n,i,o,r,s,c,d){e.call(this,t,n,i,r,s),this.eventService=c,this.configurationService=d,this.dirty=o,this.registerListeners()}return __extends(t,e),t.prototype.registerListeners=function(){var e=this;this.configurationChangeListener=this.configurationService.onDidUpdateConfiguration(function(t){return e.onConfigurationChange(t.config)})},t.prototype.onConfigurationChange=function(e){this.configuredEncoding=e&&e.files&&e.files.encoding},t.prototype.getValue=function(){return this.textEditorModel?this.textEditorModel.getValue(i.EndOfLinePreference.TextDefined,!0):null},t.prototype.getModeId=function(){return this.textEditorModel?this.textEditorModel.getModeId():null},t.prototype.getEncoding=function(){return this.preferredEncoding||this.configuredEncoding},t.prototype.setEncoding=function(e){var t=this.getEncoding();this.preferredEncoding=e,t!==this.preferredEncoding&&this.eventService.emit(o.EventType.RESOURCE_ENCODING_CHANGED,new o.ResourceEvent(this.resource))},t.prototype.isDirty=function(){return this.dirty},t.prototype.revert=function(){this.dirty=!1,this.eventService.emit(o.EventType.UNTITLED_FILE_SAVED,new o.UntitledEditorEvent(this.resource))},t.prototype.load=function(){var t=this;return e.prototype.load.call(this).then(function(e){var n=t.configurationService.getConfiguration();return t.configuredEncoding=n&&n.files&&n.files.encoding,t.textModelChangeListener=t.textEditorModel.onDidChangeContent(function(){return t.onModelContentChanged()}),t.dirty&&setTimeout(function(){t.eventService.emit(o.EventType.UNTITLED_FILE_DIRTY,new o.UntitledEditorEvent(t.resource))},0),e})},t.prototype.onModelContentChanged=function(){this.dirty||(this.dirty=!0,this.eventService.emit(o.EventType.UNTITLED_FILE_DIRTY,new o.UntitledEditorEvent(this.resource)))},t.prototype.dispose=function(){e.prototype.dispose.call(this),this.textModelChangeListener&&(this.textModelChangeListener.dispose(),this.textModelChangeListener=null),this.configurationChangeListener&&(this.configurationChangeListener.dispose(),this.configurationChangeListener=null)},t=__decorate([__param(4,c.IModeService),__param(5,d.IModelService),__param(6,s.IEventService),__param(7,r.IConfigurationService)],t)}(n.StringEditorModel);t.UntitledEditorModel=u});