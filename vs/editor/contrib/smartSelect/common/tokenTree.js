var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)};define(["require","exports","vs/editor/common/core/range","vs/editor/common/modes/supports","vs/editor/common/modes/supports/richEditBrackets","vs/editor/common/modes/languageConfigurationRegistry"],function(e,t,n,r,i,o){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function s(e){var t=new a;return t.start=e.range.getStartPosition(),t.end=e.range.getEndPosition(),t}function u(e){var t=new p(e).build();return t}function c(e,t){if(!n.Range.containsPosition(e.range,t))return null;var r;if(e instanceof d)for(var i=0,o=e.children.length;i<o&&!r;i++)r=c(e.children[i],t);else e instanceof l&&(r=c(e.open,t)||c(e.elements,t)||c(e.close,t));return r||e}!function(e){e[e.None=0]="None",e[e.Open=1]="Open",e[e.Close=-1]="Close"}(t.TokenTreeBracket||(t.TokenTreeBracket={}));var h=t.TokenTreeBracket,a=function(){function e(){}return Object.defineProperty(e.prototype,"range",{get:function(){return new n.Range(this.start.lineNumber,this.start.column,this.end.lineNumber,this.end.column)},enumerable:!0,configurable:!0}),e}();t.Node=a;var d=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),Object.defineProperty(t.prototype,"start",{get:function(){return this.hasChildren?this.children[0].start:this.parent.start},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"end",{get:function(){return this.hasChildren?this.children[this.children.length-1].end:this.parent.end},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasChildren",{get:function(){return this.children&&this.children.length>0},enumerable:!0,configurable:!0}),t.prototype.append=function(e){return!!e&&(e.parent=this,this.children||(this.children=[]),e instanceof t?e.children&&this.children.push.apply(this.children,e.children):this.children.push(e),!0)},t}(a);t.NodeList=d;var l=function(e){function t(){e.call(this),this.elements=new d,this.elements.parent=this}return __extends(t,e),Object.defineProperty(t.prototype,"start",{get:function(){return this.open.start},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"end",{get:function(){return this.close.end},enumerable:!0,configurable:!0}),t}(a);t.Block=l;var _=function(){function e(e){this._model=e,this._versionId=e.getVersionId(),this._currentLineNumber=1}return e.prototype.next=function(){if(this._versionId!==this._model.getVersionId())return null;if(this._currentLineNumber>=this._model.getLineCount()+1)return null;if(this._currentLineTokens||(this._currentLineTokens=this._model.getLineTokens(this._currentLineNumber),this._currentLineText=this._model.getLineContent(this._currentLineNumber),this._currentLineModeTransitions=this._model._getLineModeTransitions(this._currentLineNumber),this._currentTokenIndex=0,this._currentTokenStart=0,this._currentModeIndex=-1,this._nextModeStart=0),this._currentTokenIndex>=this._currentLineTokens.getTokenCount())return this._currentLineNumber+=1,this._currentLineTokens=null,this.next();if(this._currentTokenStart>=this._nextModeStart){this._currentModeIndex++,this._nextModeStart=this._currentModeIndex+1<this._currentLineModeTransitions.length?this._currentLineModeTransitions[this._currentModeIndex+1].startIndex:this._currentLineText.length+1;var e=this._currentModeIndex<this._currentLineModeTransitions.length?this._currentLineModeTransitions[this._currentModeIndex]:null;this._currentModeBrackets=e?o.LanguageConfigurationRegistry.getBracketsSupport(e.modeId):null}var t=this._currentLineTokens.getTokenType(this._currentTokenIndex),s=this._currentLineTokens.getTokenEndIndex(this._currentTokenIndex,this._currentLineText.length),u=s,c=null;this._currentModeBrackets&&!r.ignoreBracketsInToken(t)&&(c=i.BracketsUtils.findNextBracketInToken(this._currentModeBrackets.forwardRegex,this._currentLineNumber,this._currentLineText,this._currentTokenStart,s)),c&&this._currentTokenStart<c.startColumn-1&&(u=c.startColumn-1,c=null);var a=null,d=!1;if(c){var l=this._currentLineText.substring(c.startColumn-1,c.endColumn-1);a=this._currentModeBrackets.textIsBracket[l],d=this._currentModeBrackets.textIsOpenBracket[l]}if(!a){var _={type:t,bracket:h.None,range:new n.Range(this._currentLineNumber,1+this._currentTokenStart,this._currentLineNumber,1+u)};return u<s?this._currentTokenStart=u:(this._currentTokenIndex+=1,this._currentTokenStart=this._currentTokenIndex<this._currentLineTokens.getTokenCount()?this._currentLineTokens.getTokenStartIndex(this._currentTokenIndex):0),_}var p=a.modeId+";"+a.open+";"+a.close,k={type:p,bracket:d?h.Open:h.Close,range:new n.Range(this._currentLineNumber,1+this._currentTokenStart,this._currentLineNumber,c.endColumn)};return c.endColumn-1<s?this._currentTokenStart=c.endColumn-1:(this._currentTokenIndex+=1,this._currentTokenStart=this._currentTokenIndex<this._currentLineTokens.getTokenCount()?this._currentLineTokens.getTokenStartIndex(this._currentTokenIndex):0),k},e}(),p=function(){function e(e){this._stack=[],this._scanner=new _(e)}return e.prototype.build=function(){for(var e=new d;e.append(this._line()||this._any()););return e},e.prototype._accept=function(e){var t=this._stack.pop()||this._scanner.next();if(!t)return!1;var n=e(t);return n?this._currentToken=t:(this._stack.push(t),this._currentToken=null),n},e.prototype._peek=function(e){var t=!1;return this._accept(function(n){return t=e(n),!1}),t},e.prototype._line=function(){var e,t=new d;for(this._peek(function(t){return e=t.range.startLineNumber,!1});this._peek(function(t){return t.range.startLineNumber===e})&&t.append(this._token()||this._block()););return t.children&&0!==t.children.length?1===t.children.length?t.children[0]:t:null},e.prototype._token=function(){return this._accept(function(e){return e.bracket===h.None})?s(this._currentToken):null},e.prototype._block=function(){var e,t;if(t=this._accept(function(t){return e=t.type,t.bracket===h.Open}),!t)return null;var n=new l;for(n.open=s(this._currentToken);n.elements.append(this._line()););if(!this._accept(function(t){return t.bracket===h.Close&&t.type===e})){var r=new d;return r.append(n.open),r.append(n.elements),r}return n.close=s(this._currentToken),n},e.prototype._any=function(){return this._accept(function(e){return!0})?s(this._currentToken):null},e}();t.build=u,t.find=c});