define(["require","exports","vs/base/common/platform","vs/base/common/errors","vs/base/common/stopwatch"],function(t,e,n,i,s){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function o(t,e,n,i){return h.start(t,e,n,i)}function r(){return h}e.ENABLE_TIMER=!1;var c=n.globals.msWriteProfilerMark;!function(t){t[t.EDITOR=0]="EDITOR",t[t.LANGUAGES=1]="LANGUAGES",t[t.WORKER=2]="WORKER",t[t.WORKBENCH=3]="WORKBENCH",t[t.STARTUP=4]="STARTUP"}(e.Topic||(e.Topic={}));var a=e.Topic,p=function(){function t(){}return t.prototype.stop=function(){},t.prototype.timeTaken=function(){return-1},t}(),l=function(){function t(t,e,n,i,o){if(this.timeKeeper=t,this.name=e,this.description=o,this.topic=n,this.stopTime=null,i)return void(this.startTime=i);if(this.startTime=new Date,this.sw=s.StopWatch.create(),c){var r=["Monaco",this.topic,this.name,"start"];c(r.join("|"))}}return t.prototype.stop=function(t){if(null===this.stopTime){if(t)return this.stopTime=t,this.sw=null,void this.timeKeeper._onEventStopped(this);if(this.stopTime=new Date,this.sw&&this.sw.stop(),this.timeKeeper._onEventStopped(this),c){var e=["Monaco",this.topic,this.name,"stop"];c(e.join("|"))}}},t.prototype.timeTaken=function(){return this.sw?this.sw.elapsed():this.stopTime?this.stopTime.getTime()-this.startTime.getTime():-1},t}(),E=function(){function t(){this.cleaningIntervalId=-1,this.collectedEvents=[],this.listeners=[]}return t.prototype.isEnabled=function(){return e.ENABLE_TIMER},t.prototype.start=function(t,n,i,s){if(!this.isEnabled())return e.nullEvent;var o;"string"==typeof t?o=t:t===a.EDITOR?o="Editor":t===a.LANGUAGES?o="Languages":t===a.WORKER?o="Worker":t===a.WORKBENCH?o="Workbench":t===a.STARTUP&&(o="Startup"),this.initAutoCleaning();var r=new l(this,n,o,i,s);return this.addEvent(r),r},t.prototype.dispose=function(){this.cleaningIntervalId!==-1&&(n.clearInterval(this.cleaningIntervalId),this.cleaningIntervalId=-1)},t.prototype.addListener=function(t){var e=this;return this.listeners.push(t),{dispose:function(){for(var n=0;n<e.listeners.length;n++)if(e.listeners[n]===t)return void e.listeners.splice(n,1)}}},t.prototype.addEvent=function(e){e.id=t.EVENT_ID,t.EVENT_ID++,this.collectedEvents.push(e),this.collectedEvents.length>t._EVENT_CACHE_LIMIT&&this.collectedEvents.shift()},t.prototype.initAutoCleaning=function(){var e=this;this.cleaningIntervalId===-1&&(this.cleaningIntervalId=n.setInterval(function(){var n=Date.now();e.collectedEvents.forEach(function(e){!e.stopTime&&n-e.startTime.getTime()>=t._MAX_TIMER_LENGTH&&e.stop()})},t._CLEAN_UP_INTERVAL))},t.prototype.getCollectedEvents=function(){return this.collectedEvents.slice(0)},t.prototype.clearCollectedEvents=function(){this.collectedEvents=[]},t.prototype._onEventStopped=function(t){for(var e=[t],n=this.listeners.slice(0),s=0;s<n.length;s++)try{n[s](e)}catch(o){i.onUnexpectedError(o)}},t.prototype.setInitialCollectedEvents=function(e,n){var i=this;this.isEnabled()&&(n&&(t.PARSE_TIME=n),e.forEach(function(t){var e=new l(i,t.name,t.topic,t.startTime,t.description);e.stop(t.stopTime),i.addEvent(e)}))},t._MAX_TIMER_LENGTH=6e4,t._CLEAN_UP_INTERVAL=12e4,t._EVENT_CACHE_LIMIT=1e3,t.EVENT_ID=1,t.PARSE_TIME=new Date,t}();e.TimeKeeper=E;var h=new E;e.nullEvent=new p,e.start=o,e.getTimeKeeper=r});