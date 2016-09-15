var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","vs/base/common/eventEmitter","vs/base/common/lifecycle","vs/editor/common/services/resourceService"],function(t,e,n,i,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var o=function(t){function e(){t.call(this),this.data={},this.unbinds={}}return __extends(e,t),e.prototype.addListener2_=function(e,n){return t.prototype.addListener2.call(this,e,n)},e.prototype._anonymousModelId=function(t){for(var e="",n=0;n<t.length;n++){var i=t[n];e+=i>="0"&&i<="9"?"0":i>="a"&&i<="z"?"a":i>="A"&&i<="Z"?"A":i}return e},e.prototype.insert=function(t,e){var n=this;if(this.contains(t))throw new Error("ResourceService: Cannot add model "+this._anonymousModelId(t.toString())+" because it already exists!");var i=t.toString();this.data[i]=e,this.unbinds[i]=[],this.unbinds[i].push(e.addBulkListener2(function(e){n.emit(r.ResourceEvents.CHANGED,{url:t,originalEvents:e})})),this.emit(r.ResourceEvents.ADDED,{url:t,addedElement:e})},e.prototype.get=function(t){return this.data[t.toString()]?this.data[t.toString()]:null},e.prototype.all=function(){var t=this;return Object.keys(this.data).map(function(e){return t.data[e]})},e.prototype.contains=function(t){return!!this.data[t.toString()]},e.prototype.remove=function(t){if(this.contains(t)){var e=t.toString(),n=this.data[e];this.unbinds[e]=i.dispose(this.unbinds[e]),delete this.unbinds[e],delete this.data[e],this.emit(r.ResourceEvents.REMOVED,{url:t,removedElement:n})}},e}(n.EventEmitter);e.ResourceService=o});