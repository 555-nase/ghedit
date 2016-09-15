var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","vs/base/common/actions","vs/base/common/strings","vs/base/common/winjs.base","vs/editor/common/editorActionEnablement"],function(t,e,n,o,i,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function s(t,e,n){if(t.getLineContent().length<=e)return!1;for(var i=t.findIndexOfOffset(e),r=t.getTokenType(i),s=0,a=n.length;s<a;s++)if(""===n[s]){if(""===r)return!0}else if(o.startsWith(r,n[s]))return!0;return!1}var a=r.Behaviour.TextFocus|r.Behaviour.Writeable|r.Behaviour.UpdateOnModelChange,u=function(t){function e(e,n,o){void 0===o&&(o=a),t.call(this,e.id),this.editor=n,this._descriptor=e,this.label=e.label||"",this._enablementState=r.createActionEnablement(n,o,this),this._supportsReadonly=!(o&r.Behaviour.Writeable)}return __extends(e,t),e.prototype.getId=function(){return this.id},e.prototype.dispose=function(){this._enablementState.dispose(),t.prototype.dispose.call(this)},e.prototype.getDescriptor=function(){return this._descriptor},Object.defineProperty(e.prototype,"enabled",{get:function(){return this._enablementState.value()},set:function(t){var e=new Error;console.log("setting EditorAction.enabled is UNCOOL. Use resetEnablementState and getEnablementState"),console.log(e.stack)},enumerable:!0,configurable:!0}),e.prototype.resetEnablementState=function(){this._enablementState.reset()},e.prototype.isSupported=function(){if(!this._supportsReadonly){if(this.editor.getConfiguration().readOnly)return!1;var t=this.editor.getModel();if(t&&t.hasEditableRange())return!1}return!0},e.prototype.getEnablementState=function(){return!0},e.prototype.getAlias=function(){return this._descriptor.alias},e}(n.Action);e.EditorAction=u;var d=function(t){function e(e,n,o){t.call(this,e,n),this._handlerId=o}return __extends(e,t),e.prototype.run=function(){return this.editor.trigger(this.getId(),this._handlerId,null),i.TPromise.as(!0)},e}(u);e.HandlerEditorAction=d;var l=function(t){function e(n,o){var i=n.enablement||{};t.call(this,{id:n.id,label:n.label},o,e._transformBehaviour(i)),this._run=n.run,this._tokensAtPosition=i.tokensAtPosition,this._wordAtPosition=i.wordAtPosition}return __extends(e,t),e._transformBehaviour=function(t){var e=0;return t.textFocus&&(e|=r.Behaviour.TextFocus),t.widgetFocus&&(e|=r.Behaviour.WidgetFocus),t.writeableEditor&&(e|=r.Behaviour.Writeable),"undefined"!=typeof t.tokensAtPosition&&(e|=r.Behaviour.UpdateOnCursorPositionChange),"undefined"!=typeof t.wordAtPosition&&(e|=r.Behaviour.UpdateOnCursorPositionChange),e},e.prototype.run=function(){return i.TPromise.as(this._run(this.editor))},e.prototype.getEnablementState=function(){return this._getEnablementOnTokens()&&this._getEnablementOnWord()},e.prototype._getEnablementOnTokens=function(){if(!this._tokensAtPosition)return!0;var t=this.editor.getModel(),e=this.editor.getSelection().getStartPosition(),n=t.getLineContext(e.lineNumber),o=e.column-1;return s(n,o,this._tokensAtPosition)},e.prototype._getEnablementOnWord=function(){if(!this._wordAtPosition)return!0;var t=this.editor.getModel(),e=this.editor.getSelection().getStartPosition(),n=t.getWordAtPosition(e);return!!n},e}(u);e.DynamicEditorAction=l});