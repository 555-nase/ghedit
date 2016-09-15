var __extends=this&&this.__extends||function(t,o){function n(){this.constructor=t}for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e]);t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)};define(["require","exports","vs/base/common/objects","vs/base/common/errors","vs/base/common/event","./extHost.protocol"],function(t,o,n,e,i,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var f=function(t){function o(){t.call(this),this._onDidChangeConfiguration=new i.Emitter}return __extends(o,t),Object.defineProperty(o.prototype,"onDidChangeConfiguration",{get:function(){return this._onDidChangeConfiguration&&this._onDidChangeConfiguration.event},enumerable:!0,configurable:!0}),o.prototype.$acceptConfigurationChanged=function(t){this._config=t,this._hasConfig=!0,this._onDidChangeConfiguration.fire(void 0)},o.prototype.getConfiguration=function(t){if(!this._hasConfig)throw e.illegalState("missing config");var i,r=t?o._lookUp(t,this._config):this._config;return i="object"!=typeof r?{}:n.clone(r),i.has=function(t){return"undefined"!=typeof o._lookUp(t,r)},i.get=function(t,n){var e=o._lookUp(t,r);return"undefined"==typeof e&&(e=n),e},i},o._lookUp=function(t,o){if(t){for(var n=t.split("."),e=o;e&&n.length;)e=e[n.shift()];return e}},o}(r.ExtHostConfigurationShape);o.ExtHostConfiguration=f});