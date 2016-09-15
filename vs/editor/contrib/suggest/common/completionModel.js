/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/common/arrays","vs/base/common/objects","vs/base/common/winjs.base","vs/base/common/filters","vs/base/common/async"],function(t,e,i,n,s,o,r){"use strict";var u=function(){function t(t){this.suggestion=t.suggestion,this.container=t.container,this.filter=t.support&&t.support.filter||o.fuzzyContiguousFilter,this._support=t.support}return t.prototype.resolveDetails=function(t,e){var i=this;return this._support&&"function"==typeof this._support.resolveCompletionItem?r.asWinJsPromise(function(n){return i._support.resolveCompletionItem(t,e,i.suggestion,n)}):s.TPromise.as(this.suggestion)},t.prototype.updateDetails=function(t){this.suggestion=n.assign(this.suggestion,t)},t}();e.CompletionItem=u;var l=function(){function t(){}return t}();e.LineContext=l;var a=function(){function t(t,e){this._items=[],this._filteredItems=void 0,this.raw=t,this._lineContext={leadingLineContent:e,characterCountDelta:0};for(var i=0,n=t;i<n.length;i++){var s=n[i];this._items.push(new u(s))}}return Object.defineProperty(t.prototype,"lineContext",{get:function(){return this._lineContext},set:function(t){this._lineContext!==t&&(this._filteredItems=void 0,this._lineContext=t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"items",{get:function(){return this._filteredItems||this._filter(),this._filteredItems},enumerable:!0,configurable:!0}),t.prototype._filter=function(){this._filteredItems=[];for(var t=this._lineContext,e=t.leadingLineContent,n=t.characterCountDelta,s=0,o=this._items;s<o.length;s++){var r=o[s],u=r.suggestion.overwriteBefore;"number"!=typeof u&&(u=r.container.currentWord.length);var l=e.length-(u+n),a=e.substr(l),f=r.filter,h=r.suggestion,p=!1;r.highlights=f(a,h.label),p=null!==r.highlights,p||"string"!=typeof h.filterText||(p=!i.isFalsyOrEmpty(f(a,h.filterText))),p&&this._filteredItems.push(r)}},t}();e.CompletionModel=a});