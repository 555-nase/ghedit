define(["require","exports","vs/base/common/strings","vs/editor/common/model/tokensBinaryEncoding","vs/editor/common/core/modeTransition","vs/editor/common/core/viewLineToken"],function(t,e,n,r,o,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function s(t,e){for(var n=0,r=0,o=t.length;r<o;){var i=t.charCodeAt(r);if(32===i)n++;else{if(9!==i)break;n=n-n%e+e}r++}return r===o?0:n+1}function a(t,e,n){return 0===n?null:e&&0!==e.length?1===e.length&&0===e[0].startIndex&&""===e[0].type?null:r.TokensBinaryEncoding.deflateArr(t,e):null}function u(t,e){return 0===e?null:t&&0!==t.length?1===t.length&&0===t[0]?null:t:null}function l(t,e){return e&&0!==e.length?1===e.length&&0===e[0].startIndex&&e[0].mode===t?null:e:null}var f,c=r.TokensBinaryEncoding.START_INDEX_MASK,h=r.TokensBinaryEncoding.TYPE_MASK,d=r.TokensBinaryEncoding.START_INDEX_OFFSET,m=r.TokensBinaryEncoding.TYPE_OFFSET,p={adjust:function(){},finish:function(){}},k={adjustDelta:function(){},adjustSet:function(){},finish:function(){}};!function(t){t[t.MarkerDefined=0]="MarkerDefined",t[t.ForceMove=1]="ForceMove",t[t.ForceStay=2]="ForceStay"}(f||(f={}));var _=function(){function t(t,e,n){this._lineNumber=0|t,this._metadata=0,this._setText(e,n),this._state=null,this._modeTransitions=null,this._lineTokens=null,this._markers=null}return Object.defineProperty(t.prototype,"lineNumber",{get:function(){return this._lineNumber},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"text",{get:function(){return this._text},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isInvalid",{get:function(){return!!(1&this._metadata)},set:function(t){this._metadata=4294967294&this._metadata|(t?1:0)},enumerable:!0,configurable:!0}),t.prototype.getIndentLevel=function(){return((4294967294&this._metadata)>>1)-1},t.prototype._setPlusOneIndentLevel=function(t){this._metadata=1&this._metadata|(4026531839&t)<<1},t.prototype.updateTabSize=function(t){0===t?this._metadata=1&this._metadata:this._setPlusOneIndentLevel(s(this._text,t))},t.prototype.setState=function(t){this._state=t},t.prototype.getState=function(){return this._state||null},t.prototype.getModeTransitions=function(t){return this._modeTransitions?this._modeTransitions:[new o.ModeTransition(0,t)]},t.prototype.setTokens=function(t,e,n,r){this._lineTokens=a(t,e,this._text.length),this._modeTransitions=l(n,r)},t.prototype._setLineTokensFromDeflated=function(t){this._lineTokens=u(t,this._text.length)},t.prototype.getTokens=function(t){return this._lineTokens?new g(t,this._lineTokens):0===this._text.length?y.INSTANCE:T.INSTANCE},t.prototype._createTokensAdjuster=function(){if(!this._lineTokens)return p;var t=this._lineTokens,e=t.length,n=0,r=0,o=function(o,i,s){for(var a=s-1;r<o&&n<e;){if(r>0&&0!==i){var u=t[n]/m&h,l=Math.max(a,r+i),f=u*m+l*d;if(i<0)for(;n>0;){var p=t[n-1]/d&c;if(!(p>=l))break;t.splice(n-1,1),e--,n--}t[n]=f}n++,n<e&&(r=t[n]/d&c)}},i=function(t,e){o(Number.MAX_VALUE,t,1)};return{adjust:o,finish:i}},t.prototype._setText=function(t,e){this._text=t,0===e?this._metadata=1&this._metadata:this._setPlusOneIndentLevel(s(t,e));var n=this._lineTokens;if(n){for(var r=this._text.length;n.length>0;){var o=n[n.length-1]/d&c;if(o<r)break;n.pop()}this._setLineTokensFromDeflated(n)}},t.prototype._createMarkersAdjuster=function(e){var n=this;if(!this._markers)return k;if(0===this._markers.length)return k;this._markers.sort(t._compareMarkers);var r=this._markers,o=r.length,i=0,s=r[i],a=function(t,e){return s.column<t||!(s.column>t)&&(e!==f.ForceMove&&(e===f.ForceStay||s.stickToPreviousCharacter))},u=function(t,u,l,f){for(;i<o&&a(t,f);){if(0!==u){var c=Math.max(l,s.column+u);s.column!==c&&(e[s.id]=!0,s.oldLineNumber=s.oldLineNumber||n._lineNumber,s.oldColumn=s.oldColumn||s.column,s.column=c)}i++,i<o&&(s=r[i])}},l=function(t,u,l){for(;i<o&&a(t,l);)s.column!==u&&(e[s.id]=!0,s.oldLineNumber=s.oldLineNumber||n._lineNumber,s.oldColumn=s.oldColumn||s.column,s.column=u),i++,i<o&&(s=r[i])},c=function(t,e){u(Number.MAX_VALUE,t,1,f.MarkerDefined)};return{adjustDelta:u,adjustSet:l,finish:c}},t.prototype.applyEdits=function(t,e,n){for(var r=0,o=this._text,i=this._createTokensAdjuster(),s=this._createMarkersAdjuster(t),a=0,u=e.length;a<u;a++){var l=e[a],c=r+l.startColumn,h=r+l.endColumn,d=h-c,m=l.text.length;i.adjust(l.startColumn-1,r,1),s.adjustDelta(l.startColumn,r,1,l.forceMoveMarkers?f.ForceMove:d>0?f.ForceStay:f.MarkerDefined);var p=Math.min(d,m);p>0&&(i.adjust(l.startColumn-1+p,r,c),l.forceMoveMarkers||s.adjustDelta(l.startColumn+p,r,c,l.forceMoveMarkers?f.ForceMove:d>m?f.ForceStay:f.MarkerDefined)),o=o.substring(0,c-1)+l.text+o.substring(h-1),r+=m-d,i.adjust(l.endColumn,r,c),s.adjustSet(l.endColumn,c+m,l.forceMoveMarkers?f.ForceMove:f.MarkerDefined)}return i.finish(r,o.length),s.finish(r,o.length),this._setText(o,n),r},t.prototype.split=function(e,n,r,o){var i=this._text.substring(0,n-1),s=this._text.substring(n-1),a=null;if(this._markers){this._markers.sort(t._compareMarkers);for(var u=0,l=this._markers.length;u<l;u++){var f=this._markers[u];if(f.column>n||f.column===n&&(r||!f.stickToPreviousCharacter)){var c=this._markers.slice(0,u);a=this._markers.slice(u),this._markers=c;break}}if(a)for(var u=0,l=a.length;u<l;u++){var f=a[u];e[f.id]=!0,f.oldLineNumber=f.oldLineNumber||this._lineNumber,f.oldColumn=f.oldColumn||f.column,f.column-=n-1}}this._setText(i,o);var h=new t(this._lineNumber+1,s,o);return a&&h.addMarkers(a),h},t.prototype.append=function(t,e,n){var r=this._text.length;this._setText(this._text+e._text,n);var o=e._lineTokens;if(o){if(r>0)for(var i=0,s=o.length;i<s;i++){var a=o[i],u=a/d&c,l=a/m&h,f=u+r,p=l*m+f*d;o[i]=p}var k=this._lineTokens;k?this._setLineTokensFromDeflated(k.concat(o)):this._setLineTokensFromDeflated(o)}if(e._markers){for(var _=e._markers,i=0,s=_.length;i<s;i++){var g=_[i];t[g.id]=!0,g.oldLineNumber=g.oldLineNumber||e.lineNumber,g.oldColumn=g.oldColumn||g.column,g.column+=r}this.addMarkers(_)}},t.prototype.addMarker=function(t){t.line=this,this._markers?this._markers.push(t):this._markers=[t]},t.prototype.addMarkers=function(t){if(0!==t.length){var e,n;for(e=0,n=t.length;e<n;e++)t[e].line=this;this._markers?this._markers=this._markers.concat(t):this._markers=t.slice(0)}},t._compareMarkers=function(t,e){return t.column===e.column?(t.stickToPreviousCharacter?0:1)-(e.stickToPreviousCharacter?0:1):t.column-e.column},t.prototype.removeMarker=function(t){if(this._markers){var e=this._indexOfMarkerId(t.id);e>=0&&(t.line=null,this._markers.splice(e,1)),0===this._markers.length&&(this._markers=null)}},t.prototype.removeMarkers=function(t){if(this._markers){for(var e=0,n=this._markers.length;e<n;e++){var r=this._markers[e];t[r.id]&&(r.line=null,this._markers.splice(e,1),n--,e--)}0===this._markers.length&&(this._markers=null)}},t.prototype.getMarkers=function(){return this._markers?this._markers.slice(0):[]},t.prototype.updateLineNumber=function(t,e){if(this._markers){var n,r,o,i=this._markers;for(n=0,r=i.length;n<r;n++)o=i[n],t[o.id]=!0,o.oldLineNumber=o.oldLineNumber||this._lineNumber}this._lineNumber=e},t.prototype.deleteLine=function(t,e,n){if(this._markers){var r,o,i,s=this._markers;for(r=0,o=s.length;r<o;r++)i=s[r],t[i.id]=!0,i.oldColumn=i.oldColumn||i.column,i.oldLineNumber=i.oldLineNumber||n,i.column=e;return s}return[]},t.prototype._indexOfMarkerId=function(t){for(var e=this._markers,n=0,r=e.length;n<r;n++)if(e[n].id===t)return n},t}();e.ModelLine=_;var g=function(){function t(t,e){this.map=t,this._tokens=e}return t.prototype.getBinaryEncodedTokensMap=function(){return this.map},t.prototype.getBinaryEncodedTokens=function(){return this._tokens},t.prototype.getTokenCount=function(){return this._tokens.length},t.prototype.getTokenStartIndex=function(t){return r.TokensBinaryEncoding.getStartIndex(this._tokens[t])},t.prototype.getTokenType=function(t){return r.TokensBinaryEncoding.getType(this.map,this._tokens[t])},t.prototype.getTokenEndIndex=function(t,e){return t+1<this._tokens.length?r.TokensBinaryEncoding.getStartIndex(this._tokens[t+1]):e},t.prototype.equals=function(e){if(e instanceof t){if(this.map!==e.map)return!1;if(this._tokens.length!==e._tokens.length)return!1;for(var n=0,r=this._tokens.length;n<r;n++)if(this._tokens[n]!==e._tokens[n])return!1;return!0}if(!(e instanceof t))return!1},t.prototype.findIndexOfOffset=function(t){return r.TokensBinaryEncoding.findIndexOfOffset(this._tokens,t)},t.prototype.inflate=function(){return r.TokensBinaryEncoding.inflateArr(this.map,this._tokens)},t.prototype.sliceAndInflate=function(t,e,n){return r.TokensBinaryEncoding.sliceAndInflate(this.map,this._tokens,t,e,n)},t}();e.LineTokens=g;var y=function(){function t(){}return t.prototype.getTokenCount=function(){return 0},t.prototype.getTokenStartIndex=function(t){return 0},t.prototype.getTokenType=function(t){return n.empty},t.prototype.getTokenEndIndex=function(t,e){return 0},t.prototype.equals=function(t){return t===this},t.prototype.findIndexOfOffset=function(t){return 0},t.prototype.inflate=function(){return[]},t.prototype.sliceAndInflate=function(t,e,n){return[]},t.INSTANCE=new t,t}(),T=function(){function t(){}return t.prototype.getTokenCount=function(){return 1},t.prototype.getTokenStartIndex=function(t){return 0},t.prototype.getTokenType=function(t){return n.empty},t.prototype.getTokenEndIndex=function(t,e){return e},t.prototype.equals=function(t){return this===t},t.prototype.findIndexOfOffset=function(t){return 0},t.prototype.inflate=function(){return[new i.ViewLineToken(0,"")]},t.prototype.sliceAndInflate=function(t,e,n){return[new i.ViewLineToken(0,"")]},t.INSTANCE=new t,t}();e.DefaultLineTokens=T});