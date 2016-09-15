var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},__decorate=this&&this.__decorate||function(e,t,r,o){var n,i=arguments.length,c=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(c=(i<3?n(c):i>3?n(t,r,c):n(t,r))||c);return i>3&&c&&Object.defineProperty(t,r,c),c},__param=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}};define(["require","exports","vs/base/common/winjs.base","vs/editor/common/editorAction","vs/editor/common/editorActionEnablement","vs/workbench/parts/emmet/node/editorAccessor","vs/platform/configuration/common/configuration"],function(e,t,r,o,n,i,c){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var s=function(t){function o(e,r,o){t.call(this,e,r,n.Behaviour.Writeable),this.configurationService=null,this.editorAccessor=new i.EditorAccessor(r),this.configurationService=o}return __extends(o,t),o.prototype.updateEmmetPreferences=function(e){var t=this.configurationService.getConfiguration().emmet.preferences;for(var r in t)try{e.preferences.set(r,t[r])}catch(o){e.preferences.define(r,t[r])}var n=this.configurationService.getConfiguration().emmet.syntaxProfiles;e.profile.reset(),e.loadProfiles(n)},o.prototype.resetEmmetPreferences=function(e){var t=this.configurationService.getConfiguration().emmet.preferences;for(var r in t)try{e.preferences.remove(r)}catch(o){}},o.prototype.noExpansionOccurred=function(){},o.prototype.run=function(){var e=this;return this.editorAccessor.isEmmetEnabledMode()?this._withEmmet().then(function(t){return e._withEmmetPreferences(t,function(){e.editorAccessor.onBeforeEmmetAction(),e.runEmmetAction(t),e.editorAccessor.onAfterEmmetAction()}),!0}):void this.noExpansionOccurred()},o.prototype._withEmmet=function(){return new r.TPromise(function(t,r){e(["emmet"],t,r)})},o.prototype._withEmmetPreferences=function(e,t){try{this.updateEmmetPreferences(e),t()}finally{this.resetEmmetPreferences(e)}},o}(o.EditorAction);t.EmmetEditorAction=s;var f=function(e){function t(t,r,o,n){e.call(this,t,r,o),this.editorAccessor=new i.EditorAccessor(r),this.emmetActionName=n}return __extends(t,e),t.prototype.runEmmetAction=function(e){e.run(this.emmetActionName,this.editorAccessor)||this.noExpansionOccurred()},t=__decorate([__param(2,c.IConfigurationService)],t)}(s);t.BasicEmmetEditorAction=f});