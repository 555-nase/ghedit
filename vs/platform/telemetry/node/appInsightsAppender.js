define(["require","exports","applicationinsights","vs/base/common/types","vs/base/common/objects","vs/base/common/winjs.base"],function(t,e,n,i,o,a){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function s(){c===!1&&(n.setup("2588e01f-f6c9-4cd6-a348-143741f8d702").setAutoCollectConsole(!1).setAutoCollectExceptions(!1).setAutoCollectPerformance(!1).setAutoCollectRequests(!1),c=!0)}function r(t){s();var e=n.getClient(t);return e.channel.setOfflineMode(!0),e.context.tags[e.context.keys.deviceMachineName]="",0===t.indexOf("AIF-")&&(e.config.endpointUrl="https://vortex.data.microsoft.com/collect/v1"),e}var c=!1,f=function(){function t(t,e,n){this._eventPrefix=t,this._defaultData=e,this._defaultData||(this._defaultData=Object.create(null)),"string"==typeof n?this._aiClient=r(n):"function"==typeof n&&(this._aiClient=n())}return t._getData=function(e){var n=Object.create(null),i=Object.create(null),o=Object.create(null);t._flaten(e,o);for(var a in o){a=a.length>150?a.substr(a.length-149):a;var s=o[a];"number"==typeof s?i[a]=s:"boolean"==typeof s?i[a]=s?1:0:"string"==typeof s?n[a]=s.substring(0,1023):"undefined"!=typeof s&&null!==s&&(n[a]=s)}return{properties:n,measurements:i}},t._flaten=function(e,n,a,s){if(void 0===a&&(a=0),e)for(var r=0,c=Object.getOwnPropertyNames(e);r<c.length;r++){var f=c[r],l=e[f],u=s?s+f:f;Array.isArray(l)?n[u]=o.safeStringify(l):l instanceof Date?n[u]=l.toISOString():i.isObject(l)?a<2?t._flaten(l,n,a+1,u+"."):n[u]=o.safeStringify(l):n[u]=l}},t.prototype.log=function(e,n){if(this._aiClient){n=o.mixin(n,this._defaultData);var i=t._getData(n),a=i.properties,s=i.measurements;this._aiClient.trackEvent(this._eventPrefix+"/"+e,a,s)}},t.prototype.dispose=function(){var t=this;if(this._aiClient)return new a.TPromise(function(e){t._aiClient.sendPendingData(function(){t._aiClient=void 0,e(void 0)})})},t}();e.AppInsightsAppender=f});