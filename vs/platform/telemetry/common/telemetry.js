define(["require","exports","vs/base/common/winjs.base","vs/base/common/timer","vs/platform/instantiation/common/instantiation"],function(e,n,r,t,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function o(){for(var e=[],n=0;n<arguments.length;n++)e[n-0]=arguments[n];return{log:function(n,r){return e.forEach(function(e){return e.log(n,r)})}}}function u(e){if(!e)return e;for(var n="",r=0;r<e.length;r++){var t=e[r];n+=t>="0"&&t<="9"?"0":t>="a"&&t<="z"?"a":t>="A"&&t<="Z"?"A":t}return n}n.ITelemetryService=i.createDecorator("telemetryService"),n.NullTelemetryService={_serviceBrand:void 0,timedPublicLog:function(e,n){return t.nullEvent},publicLog:function(e,n){return r.TPromise.as(null)},isOptedIn:!0,getTelemetryInfo:function(){return r.TPromise.as({instanceId:"someValue.instanceId",sessionId:"someValue.sessionId",machineId:"someValue.machineId"})}},n.combinedAppender=o,n.NullAppender={log:function(){return null}},n.anonymize=u});