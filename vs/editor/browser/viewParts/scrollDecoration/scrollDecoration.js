/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(o,t){function e(){this.constructor=o}for(var r in t)t.hasOwnProperty(r)&&(o[r]=t[r]);o.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)};define(["require","exports","vs/base/browser/dom","vs/base/browser/styleMutator","vs/editor/browser/editorBrowser","vs/editor/browser/view/viewPart","vs/css!./scrollDecoration"],function(o,t,e,r,s,i){"use strict";var n=function(o){function t(t){o.call(this,t),this._scrollTop=0,this._width=0,this._shouldShow=!1,this._useShadows=this._context.configuration.editor.viewInfo.scrollbar.useShadows,this._domNode=document.createElement("div")}return __extends(t,o),t.prototype._updateShouldShow=function(){var o=this._useShadows&&this._scrollTop>0;return this._shouldShow!==o&&(this._shouldShow=o,!0)},t.prototype.getDomNode=function(){return this._domNode},t.prototype.onConfigurationChanged=function(o){return o.viewInfo.scrollbar&&(this._useShadows=this._context.configuration.editor.viewInfo.scrollbar.useShadows),this._updateShouldShow()},t.prototype.onLayoutChanged=function(o){return this._width!==o.width&&(this._width=o.width,!0)},t.prototype.onScrollChanged=function(o){return this._scrollTop=o.scrollTop,this._updateShouldShow()},t.prototype.prepareRender=function(o){if(!this.shouldRender())throw new Error("I did not ask to render!")},t.prototype.render=function(o){r.StyleMutator.setWidth(this._domNode,this._width),e.toggleClass(this._domNode,s.ClassNames.SCROLL_DECORATION,this._shouldShow)},t}(i.ViewPart);t.ScrollDecorationViewPart=n});