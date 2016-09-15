define(["require","exports","vs/base/common/async","vs/base/common/errors","vs/editor/common/core/range","vs/editor/common/editorCommon","vs/editor/common/editorCommonExtensions","vs/editor/common/modes","vs/base/common/lifecycle"],function(e,t,o,i,r,n,s,h,d){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function u(e,t){var r=h.DocumentHighlightProviderRegistry.ordered(e),n=!1;return o.sequence(r.map(function(r){return function(){if(!n)return o.asWinJsPromise(function(o){return r.provideDocumentHighlights(e,t,o)}).then(function(e){if(Array.isArray(e)&&e.length>0)return n=!0,e},function(e){i.onUnexpectedError(e)})}})).then(function(e){return e[0]})}t.getOccurrencesAtPosition=u,s.CommonEditorRegistry.registerDefaultLanguageCommand("_executeDocumentHighlights",u);var a=function(){function e(e){var t=this;this.workerRequestTokenId=0,this.workerRequest=null,this.workerRequestCompleted=!1,this.workerRequestValue=[],this.lastCursorPositionChangeTime=0,this.renderDecorationsTimer=-1,this.editor=e,this.model=this.editor.getModel(),this.toUnhook=[],this.toUnhook.push(e.onDidChangeCursorPosition(function(e){t._onPositionChanged(e)})),this.toUnhook.push(e.onDidChangeModel(function(e){t._stopAll(),t.model=t.editor.getModel()})),this.toUnhook.push(e.onDidChangeModelContent(function(e){t._stopAll()})),this._lastWordRange=null,this._decorationIds=[],this.workerRequestTokenId=0,this.workerRequest=null,this.workerRequestCompleted=!1,this.lastCursorPositionChangeTime=0,this.renderDecorationsTimer=-1}return e.prototype._removeDecorations=function(){this._decorationIds.length>0&&(this._decorationIds=this.editor.deltaDecorations(this._decorationIds,[]))},e.prototype._stopAll=function(){this._lastWordRange=null,this._removeDecorations(),this.renderDecorationsTimer!==-1&&(window.clearTimeout(this.renderDecorationsTimer),this.renderDecorationsTimer=-1),null!==this.workerRequest&&(this.workerRequest.cancel(),this.workerRequest=null),this.workerRequestCompleted||(this.workerRequestTokenId++,this.workerRequestCompleted=!0)},e.prototype._onPositionChanged=function(e){var t=this;if(e.reason!==n.CursorChangeReason.Explicit)return void this._stopAll();if(!h.DocumentHighlightProviderRegistry.has(this.model))return void this._stopAll();var o=this.editor.getSelection();if(o.startLineNumber!==o.endLineNumber)return void this._stopAll();var i=o.startLineNumber,s=o.startColumn,d=o.endColumn,a=this.model.getWordAtPosition({lineNumber:i,column:s});if(!a||a.startColumn>s||a.endColumn<d)return void this._stopAll();for(var l=new r.Range(i,a.startColumn,i,a.endColumn),c=this._lastWordRange&&this._lastWordRange.equalsRange(l),m=0,g=this._decorationIds.length;!c&&m<g;m++){var p=this.model.getDecorationRange(this._decorationIds[m]);p&&p.startLineNumber===i&&p.startColumn<=s&&p.endColumn>=d&&(c=!0)}if(this.lastCursorPositionChangeTime=(new Date).getTime(),c)this.workerRequestCompleted&&this.renderDecorationsTimer!==-1&&(window.clearTimeout(this.renderDecorationsTimer),this.renderDecorationsTimer=-1,this._beginRenderDecorations());else{this._stopAll();var R=++this.workerRequestTokenId;this.workerRequestCompleted=!1,this.workerRequest=u(this.model,this.editor.getPosition()),this.workerRequest.then(function(e){R===t.workerRequestTokenId&&(t.workerRequestCompleted=!0,t.workerRequestValue=e||[],t._beginRenderDecorations())}).done()}this._lastWordRange=l},e.prototype._beginRenderDecorations=function(){var e=this,t=(new Date).getTime(),o=this.lastCursorPositionChangeTime+250;t>=o?(this.renderDecorationsTimer=-1,this.renderDecorations()):this.renderDecorationsTimer=window.setTimeout(function(){e.renderDecorations()},o-t)},e.prototype.renderDecorations=function(){this.renderDecorationsTimer=-1;for(var e=[],t=0,o=this.workerRequestValue.length;t<o;t++){var i=this.workerRequestValue[t],r="#A0A0A0",s=void 0;s=i.kind===h.DocumentHighlightKind.Write?"wordHighlightStrong":i.kind===h.DocumentHighlightKind.Text?"selectionHighlight":"wordHighlight",e.push({range:i.range,options:{stickiness:n.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,className:s,overviewRuler:{color:r,darkColor:r,position:n.OverviewRulerLane.Center}}})}this._decorationIds=this.editor.deltaDecorations(this._decorationIds,e)},e.prototype.destroy=function(){this._stopAll(),this.toUnhook=d.dispose(this.toUnhook)},e}(),l=function(){function e(e){this.wordHighligher=new a(e)}return e.prototype.getId=function(){return e.ID},e.prototype.dispose=function(){this.wordHighligher.destroy()},e.ID="editor.contrib.wordHighlighter",e}();s.CommonEditorRegistry.registerEditorContribution(l)});