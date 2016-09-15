define(["require","exports","vs/base/browser/styleMutator","vs/editor/common/editorCommon","vs/base/browser/browser","vs/editor/common/view/overviewZoneManager"],function(e,t,n,r,o,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var a=function(){function e(e,t,n,r,a,s,h,d){var g=this;this._canvasLeftOffset=e,this._domNode=document.createElement("canvas"),this._domNode.className=t,this._domNode.style.position="absolute",this._lanesCount=3,this._canUseTranslate3d=a,this._zoneManager=new i.OverviewZoneManager(d),this._zoneManager.setMinimumHeight(s),this._zoneManager.setMaximumHeight(h),this._zoneManager.setUseDarkColor(!1),this._zoneManager.setDOMWidth(0),this._zoneManager.setDOMHeight(0),this._zoneManager.setOuterHeight(n),this._zoneManager.setLineHeight(r),this._zoomListener=o.onDidChangeZoomLevel(function(){g._zoneManager.setPixelRatio(o.getPixelRatio()),g._domNode.style.width=g._zoneManager.getDOMWidth()+"px",g._domNode.style.height=g._zoneManager.getDOMHeight()+"px",g._domNode.width=g._zoneManager.getCanvasWidth(),g._domNode.height=g._zoneManager.getCanvasHeight(),g.render(!0)}),this._zoneManager.setPixelRatio(o.getPixelRatio())}return e.prototype.dispose=function(){this._zoomListener.dispose(),this._zoneManager=null},e.prototype.setLayout=function(e,t){n.StyleMutator.setTop(this._domNode,e.top),n.StyleMutator.setRight(this._domNode,e.right);var r=!1;r=this._zoneManager.setDOMWidth(e.width)||r,r=this._zoneManager.setDOMHeight(e.height)||r,r&&(this._domNode.style.width=this._zoneManager.getDOMWidth()+"px",this._domNode.style.height=this._zoneManager.getDOMHeight()+"px",this._domNode.width=this._zoneManager.getCanvasWidth(),this._domNode.height=this._zoneManager.getCanvasHeight(),t&&this.render(!0))},e.prototype.getLanesCount=function(){return this._lanesCount},e.prototype.setLanesCount=function(e,t){this._lanesCount=e,t&&this.render(!0)},e.prototype.setUseDarkColor=function(e,t){this._zoneManager.setUseDarkColor(e),t&&this.render(!0)},e.prototype.getDomNode=function(){return this._domNode},e.prototype.getPixelWidth=function(){return this._zoneManager.getCanvasWidth()},e.prototype.getPixelHeight=function(){return this._zoneManager.getCanvasHeight()},e.prototype.setScrollHeight=function(e,t){this._zoneManager.setOuterHeight(e),t&&this.render(!0)},e.prototype.setLineHeight=function(e,t){this._zoneManager.setLineHeight(e),t&&this.render(!0)},e.prototype.setCanUseTranslate3d=function(e,t){this._canUseTranslate3d=e,t&&this.render(!0)},e.prototype.setZones=function(e,t){this._zoneManager.setZones(e),t&&this.render(!1)},e.prototype.render=function(t){if(!e.hasCanvas)return!1;if(0===this._zoneManager.getOuterHeight())return!1;this._canUseTranslate3d?n.StyleMutator.setTransform(this._domNode,"translate3d(0px, 0px, 0px)"):n.StyleMutator.setTransform(this._domNode,"");var r=this._zoneManager.getCanvasWidth(),o=this._zoneManager.getCanvasHeight(),i=this._zoneManager.resolveColorZones(),a=this._zoneManager.getId2Color(),s=this._domNode.getContext("2d");if(s.clearRect(0,0,r,o),i.length>0){var h=r-this._canvasLeftOffset;this._lanesCount>=3?this._renderThreeLanes(s,i,a,h):2===this._lanesCount?this._renderTwoLanes(s,i,a,h):1===this._lanesCount&&this._renderOneLane(s,i,a,h)}return!0},e.prototype._renderOneLane=function(e,t,n,o){this._renderVerticalPatch(e,t,n,r.OverviewRulerLane.Left|r.OverviewRulerLane.Center|r.OverviewRulerLane.Right,this._canvasLeftOffset,o)},e.prototype._renderTwoLanes=function(e,t,n,o){var i=Math.floor(o/2),a=o-i,s=this._canvasLeftOffset,h=this._canvasLeftOffset+i;this._renderVerticalPatch(e,t,n,r.OverviewRulerLane.Left|r.OverviewRulerLane.Center,s,i),this._renderVerticalPatch(e,t,n,r.OverviewRulerLane.Right,h,a)},e.prototype._renderThreeLanes=function(e,t,n,o){var i=Math.floor(o/3),a=Math.floor(o/3),s=o-i-a,h=this._canvasLeftOffset,d=this._canvasLeftOffset+i,g=this._canvasLeftOffset+i+s;this._renderVerticalPatch(e,t,n,r.OverviewRulerLane.Left,h,i),this._renderVerticalPatch(e,t,n,r.OverviewRulerLane.Center,d,s),this._renderVerticalPatch(e,t,n,r.OverviewRulerLane.Right,g,a)},e.prototype._renderVerticalPatch=function(e,t,n,r,o,i){for(var a=0,s=0,h=0,d=0,g=t.length;d<g;d++){var _=t[d];if(_.position&r){var l=_.colorId,f=_.from,u=_.to;l!==a?(e.fillRect(o,s,i,h-s),a=l,e.fillStyle=n[a],s=f,h=u):h>=f?h=Math.max(h,u):(e.fillRect(o,s,i,h-s),s=f,h=u)}}e.fillRect(o,s,i,h-s)},e.hasCanvas=window.navigator.userAgent.indexOf("MSIE 8")===-1,e}();t.OverviewRulerImpl=a});