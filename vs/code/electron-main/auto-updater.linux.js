/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},__decorate=this&&this.__decorate||function(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s},__param=this&&this.__param||function(e,t){return function(r,n){t(r,n,e)}};define(["require","exports","events","vs/base/common/types","vs/base/node/request","vs/base/node/proxy","vs/code/electron-main/settings","vs/code/electron-main/env"],function(e,t,r,n,i,o,s,c){"use strict";var u=function(e){function t(t,r){e.call(this),this.envService=t,this.settingsService=r,this.url=null,this.currentRequest=null}return __extends(t,e),t.prototype.setFeedURL=function(e){this.url=e},t.prototype.checkForUpdates=function(){var e=this;if(!this.url)throw new Error("No feed url set.");if(!this.currentRequest){this.emit("checking-for-update");var t=this.settingsService.getValue("http.proxy"),r=this.settingsService.getValue("http.proxyStrictSSL",!0),s=o.getProxyAgent(this.url,{proxyUrl:t,strictSSL:r});this.currentRequest=i.json({url:this.url,agent:s}).then(function(t){t&&t.url&&t.version?e.emit("update-available",null,e.envService.product.downloadUrl):e.emit("update-not-available")}).then(null,function(t){n.isString(t)&&/^Server returned/.test(t)||(e.emit("update-not-available"),e.emit("error",t))}).then(function(){return e.currentRequest=null})}},t=__decorate([__param(0,c.IEnvironmentService),__param(1,s.ISettingsService)],t)}(r.EventEmitter);t.LinuxAutoUpdaterImpl=u});