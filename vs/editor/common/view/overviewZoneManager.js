define(["require","exports","vs/editor/common/editorCommon"],function(t,o,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var e=function(){function t(t){this._getVerticalOffsetForLine=t,this._zones=[],this._colorZonesInvalid=!1,this._lineHeight=0,this._domWidth=0,this._domHeight=0,this._outerHeight=0,this._maximumHeight=0,this._minimumHeight=0,this._useDarkColor=!1,this._pixelRatio=1,this._lastAssignedId=0,this._color2Id=Object.create(null),this._id2Color=[]}return t.prototype.getId2Color=function(){return this._id2Color},t.prototype.setZones=function(t){t.sort(function(t,o){return t.compareTo(o)});for(var o=this._zones,i=0,e=this._zones.length,r=0,h=t.length,s=[];r<h;){var n=t[r];if(i>=e)s.push(n),r++;else{var l=o[i],a=l.compareTo(n);a<0?i++:a>0?(s.push(n),r++):(s.push(l),i++,r++)}}this._zones=s},t.prototype.setLineHeight=function(t){return this._lineHeight!==t&&(this._lineHeight=t,this._colorZonesInvalid=!0,!0)},t.prototype.setPixelRatio=function(t){this._pixelRatio=t,this._colorZonesInvalid=!0},t.prototype.getDOMWidth=function(){return this._domWidth},t.prototype.getCanvasWidth=function(){return this._domWidth*this._pixelRatio},t.prototype.setDOMWidth=function(t){return this._domWidth!==t&&(this._domWidth=t,this._colorZonesInvalid=!0,!0)},t.prototype.getDOMHeight=function(){return this._domHeight},t.prototype.getCanvasHeight=function(){return this._domHeight*this._pixelRatio},t.prototype.setDOMHeight=function(t){return this._domHeight!==t&&(this._domHeight=t,this._colorZonesInvalid=!0,!0)},t.prototype.getOuterHeight=function(){return this._outerHeight},t.prototype.setOuterHeight=function(t){return this._outerHeight!==t&&(this._outerHeight=t,this._colorZonesInvalid=!0,!0)},t.prototype.setMaximumHeight=function(t){return this._maximumHeight!==t&&(this._maximumHeight=t,this._colorZonesInvalid=!0,!0)},t.prototype.setMinimumHeight=function(t){return this._minimumHeight!==t&&(this._minimumHeight=t,this._colorZonesInvalid=!0,!0)},t.prototype.setUseDarkColor=function(t){return this._useDarkColor!==t&&(this._useDarkColor=t,this._colorZonesInvalid=!0,!0)},t.prototype.resolveColorZones=function(){for(var t=this._colorZonesInvalid,o=Math.floor(this._lineHeight),i=Math.floor(this.getCanvasHeight()),e=Math.floor(this._maximumHeight*this._pixelRatio),r=Math.floor(this._minimumHeight*this._pixelRatio),h=this._useDarkColor,s=Math.floor(this._outerHeight),n=i/s,l=[],a=0,u=this._zones.length;a<u;a++){var f=this._zones[a];if(!t){var _=f.getColorZones();if(_){for(var c=0,g=_.length;c<g;c++)l.push(_[c]);continue}}var m=[];if(f.forceHeight){var p=Math.floor(f.forceHeight*this._pixelRatio),d=Math.floor(this._getVerticalOffsetForLine(f.startLineNumber));d=Math.floor(d*n);var v=d+p;m.push(this.createZone(i,d,v,p,p,f.getColor(h),f.position))}else{var d=Math.floor(this._getVerticalOffsetForLine(f.startLineNumber)),v=Math.floor(this._getVerticalOffsetForLine(f.endLineNumber))+o;d=Math.floor(d*n),v=Math.floor(v*n);var H=f.endLineNumber-f.startLineNumber+1,M=H*e;if(v-d>M)for(var I=f.startLineNumber;I<=f.endLineNumber;I++)d=Math.floor(this._getVerticalOffsetForLine(I)),v=d+o,d=Math.floor(d*n),v=Math.floor(v*n),m.push(this.createZone(i,d,v,r,e,f.getColor(h),f.position));else m.push(this.createZone(i,d,v,r,M,f.getColor(h),f.position))}f.setColorZones(m);for(var c=0,g=m.length;c<g;c++)l.push(m[c])}this._colorZonesInvalid=!1;var Z=function(t,o){return t.colorId===o.colorId?t.from===o.from?t.to-o.to:t.from-o.from:t.colorId-o.colorId};return l.sort(Z),l},t.prototype.createZone=function(t,o,e,r,h,s,n){t=Math.floor(t),o=Math.floor(o),e=Math.floor(e),r=Math.floor(r),h=Math.floor(h);var l=Math.floor((o+e)/2),a=e-l;a>h/2&&(a=h/2),a<r/2&&(a=r/2),l-a<0&&(l=a),l+a>t&&(l=t-a);var u=this._color2Id[s];return u||(u=++this._lastAssignedId,this._color2Id[s]=u,this._id2Color[u]=s),new i.ColorZone(l-a,l+a,u,n)},t}();o.OverviewZoneManager=e});