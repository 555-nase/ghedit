var __extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},__decorate=this&&this.__decorate||function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s},__param=this&&this.__param||function(t,e){return function(o,i){e(o,i,t)}};define(["require","exports","vs/base/common/winjs.base","vs/workbench/common/editor/textEditorModel","vs/editor/common/core/position","vs/editor/common/core/range","vs/editor/common/services/modeService","vs/editor/common/services/modelService","vs/editor/common/core/editOperation"],function(t,e,o,i,r,n,s,a,d){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var c=function(t){function e(e,o,i,r,n){t.call(this,n,r),this.value=e,this.mime=o,this.resource=i}return __extends(e,t),e.prototype.getValue=function(){return this.value},e.prototype.setValue=function(t){this.value=t,this.textEditorModel&&this.textEditorModel.setValue(t)},e.prototype.append=function(t){if(this.value+=t,this.textEditorModel){var e=this.textEditorModel,o=e.getLineCount(),i=e.getLineMaxColumn(o);e.applyEdits([d.EditOperation.insert(new r.Position(o,i),t)])}},e.prototype.clearValue=function(){if(this.value="",this.textEditorModel){var t=this.textEditorModel,e=t.getLineCount();t.applyEdits([d.EditOperation["delete"](new n.Range(1,1,e,t.getLineMaxColumn(e)))])}},e.prototype.trim=function(t){if(this.textEditorModel){var e=this.textEditorModel,o=e.getLineCount();if(o>t){e.applyEdits([d.EditOperation["delete"](new n.Range(1,1,o-t+1,1))]);var i=e.getValue();return this.value=i,this.value}}return null},e.prototype.getMime=function(){return this.mime},e.prototype.load=function(){return this.textEditorModel?(this.updateTextEditorModel(this.value),o.TPromise.as(this)):this.createTextEditorModel(this.value,this.resource,this.mime)},e=__decorate([__param(3,s.IModeService),__param(4,a.IModelService)],e)}(i.BaseTextEditorModel);e.StringEditorModel=c});