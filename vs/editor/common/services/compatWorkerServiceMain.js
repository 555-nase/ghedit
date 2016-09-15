var __decorate=this&&this.__decorate||function(e,r,t,o){var n,i=arguments.length,s=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,r,t,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(r,t,s):n(r,t))||s);return i>3&&s&&Object.defineProperty(r,t,s),s},__param=this&&this.__param||function(e,r){return function(t,o){r(t,o,e)}};define(["require","exports","vs/base/common/winjs.base","vs/editor/common/editorCommon","vs/base/worker/defaultWorkerFactory","vs/base/common/worker/workerClient","vs/editor/common/services/modelService","vs/editor/common/modes/modesRegistry"],function(e,r,t,o,n,i,s,a){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var d=function(){function e(e){var r=this;this.isInMainThread=!0,this._workerFactory=new n.DefaultWorkerFactory((!0)),this._worker=null,this._workerCreatedPromise=new t.TPromise(function(e,t,o){r._triggerWorkersCreatedPromise=e},function(){}),this._modelListeners=Object.create(null);var i=function(e){if(e.isTooLargeForHavingARichMode())return!1;for(var r=e.getModeId(),t=a.ModesRegistry.getCompatModes(),o=0;o<t.length;o++)if(t[o].id===r)return!0;return!1},s=function(e){i(e)&&(r._modelListeners[e.uri.toString()]=e.addBulkListener(function(t){var n=t.filter(function(e){return e.getType()===o.EventType.ModelRawContentChanged}).map(function(e){return e.getData()});0!==n.length&&r._call("$","acceptModelEvents",[e.uri,{contentChanged:n}])}),r._call("$","acceptNewModel",[{url:e.uri,versionId:e.getVersionId(),value:e.toRawText(),modeId:e.getMode().getId()}]))},d=function(e){r._modelListeners[e.uri.toString()]&&(r._modelListeners[e.uri.toString()].dispose(),delete r._modelListeners[e.uri.toString()],r._call("$","acceptDidDisposeModel",[e.uri]))};e.onModelAdded(s),e.onModelRemoved(d),e.onModelModeChanged(function(e){d(e.model),s(e.model)})}return e.prototype.registerCompatMode=function(e){this._call("$","instantiateCompatMode",[e.getId()])},e.prototype.CompatWorker=function(e,r,t,o){return this._call(e.getId(),r,o)},e.prototype._ensureWorkers=function(){if(this._triggerWorkersCreatedPromise){this._createWorker();var e=this._triggerWorkersCreatedPromise;this._triggerWorkersCreatedPromise=null,e(null)}},e.prototype._afterWorkers=function(){var e=this;this._ensureWorkers();var r=!1;return new t.TPromise(function(t,o,n){e._workerCreatedPromise.then(function(){r||t(null)},o,n)},function(){r=!0})},e.prototype._createWorker=function(e){var r=this;void 0===e&&(e=!1),this._worker=new i.WorkerClient(this._workerFactory,"vs/editor/common/worker/editorWorkerServer"),this._worker.onModuleLoaded=this._worker.request("initialize",{modesRegistryData:{compatModes:a.ModesRegistry.getCompatModes(),languages:a.ModesRegistry.getLanguages()}}).then(function(){a.ModesRegistry.onDidAddCompatModes(function(e){return r._call("$","acceptCompatModes",[e])}),a.ModesRegistry.onDidAddLanguages(function(e){return r._call("$","acceptLanguages",[e])})},function(t){r._worker.dispose(),r._worker=null,e?console.warn("Creating the web worker already failed twice. Giving up!"):r._createWorker(!0)})},e.prototype._call=function(e,r,t){var o=this;return this._afterWorkers().then(function(n){if(null===o._worker)throw new Error("Cannot fulfill request...");return o._worker.request("request",{target:e,methodName:r,args:t})})},e=__decorate([__param(0,s.IModelService)],e)}();r.MainThreadCompatWorkerService=d});