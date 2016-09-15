var __extends=this&&this.__extends||function(t,i){function e(){this.constructor=t}for(var o in i)i.hasOwnProperty(o)&&(t[o]=i[o]);t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)};define(["require","exports","vs/base/common/lifecycle","vs/base/common/event"],function(t,i,e,o){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";!function(t){t[t.Auto=1]="Auto",t[t.Hidden=2]="Hidden",t[t.Visible=3]="Visible"}(i.ScrollbarVisibility||(i.ScrollbarVisibility={}));var l=(i.ScrollbarVisibility,function(t){function i(){t.call(this),this._onScroll=this._register(new o.Emitter),this.onScroll=this._onScroll.event,this._width=0,this._scrollWidth=0,this._scrollLeft=0,this._height=0,this._scrollHeight=0,this._scrollTop=0}return __extends(i,t),i.prototype.getWidth=function(){return this._width},i.prototype.getScrollWidth=function(){return this._scrollWidth},i.prototype.getScrollLeft=function(){return this._scrollLeft},i.prototype.getHeight=function(){return this._height},i.prototype.getScrollHeight=function(){return this._scrollHeight},i.prototype.getScrollTop=function(){return this._scrollTop},i.prototype.updateState=function(t){var i="undefined"!=typeof t.width?0|t.width:this._width,e="undefined"!=typeof t.scrollWidth?0|t.scrollWidth:this._scrollWidth,o="undefined"!=typeof t.scrollLeft?0|t.scrollLeft:this._scrollLeft,l="undefined"!=typeof t.height?0|t.height:this._height,h="undefined"!=typeof t.scrollHeight?0|t.scrollHeight:this._scrollHeight,s="undefined"!=typeof t.scrollTop?0|t.scrollTop:this._scrollTop;i<0&&(i=0),o+i>e&&(o=e-i),o<0&&(o=0),l<0&&(l=0),s+l>h&&(s=h-l),s<0&&(s=0);var r=this._width!==i,c=this._scrollWidth!==e,n=this._scrollLeft!==o,d=this._height!==l,_=this._scrollHeight!==h,p=this._scrollTop!==s;(r||c||n||d||_||p)&&(this._width=i,this._scrollWidth=e,this._scrollLeft=o,this._height=l,this._scrollHeight=h,this._scrollTop=s,this._onScroll.fire({width:this._width,scrollWidth:this._scrollWidth,scrollLeft:this._scrollLeft,height:this._height,scrollHeight:this._scrollHeight,scrollTop:this._scrollTop,widthChanged:r,scrollWidthChanged:c,scrollLeftChanged:n,heightChanged:d,scrollHeightChanged:_,scrollTopChanged:p}))},i}(e.Disposable));i.Scrollable=l});