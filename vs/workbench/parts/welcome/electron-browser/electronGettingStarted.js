var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","vs/workbench/parts/welcome/common/abstractGettingStarted","vs/base/common/platform","electron"],function(t,e,n,o,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var i=function(t){function e(){t.apply(this,arguments)}return __extends(e,t),e.prototype.openExternal=function(t){o.isLinux&&o.isRootUser||r.shell.openExternal(t)},e.prototype.handleWelcome=function(){navigator.onLine&&t.prototype.handleWelcome.call(this)},e}(n.AbstractGettingStarted);e.ElectronGettingStarted=i});