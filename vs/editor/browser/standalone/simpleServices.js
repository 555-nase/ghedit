var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)};define(["require","exports","vs/base/common/errors","vs/base/common/eventEmitter","vs/base/common/network","vs/base/common/severity","vs/base/common/winjs.base","vs/platform/configuration/common/configurationService","vs/platform/extensions/common/abstractExtensionService","vs/platform/keybinding/browser/keybindingServiceImpl","vs/platform/keybinding/common/keybindingResolver","vs/editor/common/editorCommon"],function(e,t,n,o,r,i,s,u,c,d,a,l){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var p=function(){function e(e){this._widget=e}return e.prototype.getId=function(){return"editor"},e.prototype.getControl=function(){return this._widget},e.prototype.getSelection=function(){return this._widget.getSelection()},e.prototype.focus=function(){this._widget.focus()},e.prototype.withTypedEditor=function(e,t){return this._widget.getEditorType()===l.EditorType.ICodeEditor?e(this._widget):t(this._widget)},e}();t.SimpleEditor=p;var f=function(e){function t(t){e.call(this),this.model=t}return __extends(t,e),Object.defineProperty(t.prototype,"textEditorModel",{get:function(){return this.model},enumerable:!0,configurable:!0}),t}(o.EventEmitter);t.SimpleModel=f;var m=function(){function e(){this.openEditorDelegate=null}return e.prototype.setEditor=function(e){this.editor=new p(e)},e.prototype.setOpenEditorDelegate=function(e){this.openEditorDelegate=e},e.prototype.openEditor=function(e,t){var n=this;return s.TPromise.as(this.editor.withTypedEditor(function(t){return n.doOpenEditor(t,e)},function(t){return n.doOpenEditor(t.getOriginalEditor(),e)||n.doOpenEditor(t.getModifiedEditor(),e)}))},e.prototype.doOpenEditor=function(e,t){var n=this.findModel(e,t);if(!n){if(t.resource){if(this.openEditorDelegate)return this.openEditorDelegate(t.resource.toString()),null;var o=t.resource.scheme;if(o===r.Schemas.http||o===r.Schemas.https)return window.open(t.resource.toString()),this.editor}return null}var i=t.options.selection;if(i)if("number"==typeof i.endLineNumber&&"number"==typeof i.endColumn)e.setSelection(i),e.revealRangeInCenter(i);else{var s={lineNumber:i.startLineNumber,column:i.startColumn};e.setPosition(s),e.revealPositionInCenter(s)}return this.editor},e.prototype.findModel=function(e,t){var n=e.getModel();return n.uri.toString()!==t.resource.toString()?null:n},e.prototype.resolveEditorModel=function(e,t){var n,o=this;return n=this.editor.withTypedEditor(function(t){return o.findModel(t,e)},function(t){return o.findModel(t.getOriginalEditor(),e)||o.findModel(t.getModifiedEditor(),e)}),n?s.TPromise.as(new f(n)):s.TPromise.as(null)},e}();t.SimpleEditorService=m;var g=function(){function e(){}return e.prototype.show=function(t,o){switch(t){case i["default"].Error:console.error(n.toErrorMessage(o,!0));break;case i["default"].Warning:console.warn(o);break;default:console.log(o)}return e.Empty},e.prototype.hideAll=function(){},e.prototype.confirm=function(e){var t=e.message;return e.detail&&(t=t+"\n\n"+e.detail),window.confirm(t)},e.Empty=function(){},e}();t.SimpleMessageService=g;var y=function(e){function t(t,n,o,r){e.call(this,t,n,o),this._dynamicKeybindings=[],this._dynamicCommands=Object.create(null),this._beginListening(r)}return __extends(t,e),t.prototype.addDynamicKeybinding=function(e,n,o,r){void 0===r&&(r=null),null===r&&(r="DYNAMIC_"+ ++t.LAST_GENERATED_ID);var i=a.IOSupport.readKeybindingWhen(o);return this._dynamicKeybindings.push({keybinding:e,command:r,when:i,weight1:1e3,weight2:0}),this._dynamicCommands[r]=n,this.updateResolver(),r},t.prototype._getExtraKeybindings=function(e){return this._dynamicKeybindings},t.prototype._getCommandHandler=function(t){return e.prototype._getCommandHandler.call(this,t)||this._dynamicCommands[t]},t.LAST_GENERATED_ID=0,t}(d.KeybindingService);t.StandaloneKeybindingService=y;var h=function(e){function t(){e.call(this,!0)}return __extends(t,e),t.prototype._showMessage=function(e,t){switch(e){case i["default"].Error:console.error(t);break;case i["default"].Warning:console.warn(t);break;case i["default"].Info:console.info(t);break;default:console.log(t)}},t.prototype._createFailedExtension=function(){throw new Error("unexpected")},t.prototype._actualActivateExtension=function(e){throw new Error("unexpected")},t}(c.AbstractExtensionService);t.SimpleExtensionService=h;var v=function(e){function t(t,n){e.call(this,t,n),this.initialize()}return __extends(t,e),t.prototype.resolveContents=function(e){return s.TPromise.as(e.map(function(e){return{resource:e,value:""}}))},t.prototype.resolveContent=function(e){return s.TPromise.as({resource:e,value:""})},t.prototype.resolveStat=function(e){return s.TPromise.as({resource:e,isDirectory:!1})},t.prototype.setUserConfiguration=function(e,t){return s.TPromise.as(null)},t}(u.ConfigurationService);t.SimpleConfigurationService=v});