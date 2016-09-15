var __decorate=this&&this.__decorate||function(e,t,r,o){var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(n<3?i(s):n>3?i(t,r,s):i(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s},__param=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}};define(["require","exports","vs/nls","vs/base/common/winjs.base","vs/base/common/errors","vs/platform/configuration/common/configurationRegistry","vs/platform/configuration/common/configuration","vs/platform/telemetry/common/telemetry","vs/platform/platform","electron"],function(e,t,r,o,i,n,s,a,c,f){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var l="telemetry",u=c.Registry.as(n.Extensions.Configuration);u.registerConfiguration({id:l,order:110.5,type:"object",properties:{"telemetry.enableCrashReporter":{type:"boolean",description:r.localize("telemetry.enableCrashReporting","Enable crash reports to be sent to Microsoft.\n\t// This option requires restart to take effect."),"default":!0}}});var p=function(){function e(e,t,r,o){void 0===r&&(r=a.NullTelemetryService),this.telemetryService=r,this.configurationService=o,this.configurationService=o,this.telemetryService=r,this.version=e,this.commit=t,this.isStarted=!1,this.config=null}return e.prototype.start=function(e){var t=this;if(!this.isStarted){var r=this.sessionId?o.TPromise.as(void 0):this.telemetryService.getTelemetryInfo().then(function(e){return t.sessionId=e.sessionId});r.then(function(){t.config?t.config.enableCrashReporter&&t.doStart(e):(t.config=t.configurationService.getConfiguration(l),t.config&&t.config.enableCrashReporter&&t.doStart(e))},i.onUnexpectedError)}},e.prototype.doStart=function(e){var t=this.toConfiguration(e);f.crashReporter.start(t),f.ipcRenderer.send("vscode:startCrashReporter",t)},e.prototype.toConfiguration=function(e){var t=this;return JSON.parse(JSON.stringify(e,function(e,r){return"$(sessionId)"===r?t.sessionId:"$(version)"===r?t.version:"$(commit)"===r?t.commit:r}))},e=__decorate([__param(2,a.ITelemetryService),__param(3,s.IConfigurationService)],e)}();t.CrashReporter=p});