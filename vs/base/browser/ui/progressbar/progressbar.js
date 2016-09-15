/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/common/winjs.base","vs/base/common/assert","vs/base/browser/browser","vs/base/browser/builder","vs/base/browser/dom","vs/base/common/uuid","vs/base/common/lifecycle","vs/css!./progressbar"],function(t,e,s,i,n,o,r,a,l){"use strict";var h="done",m="active",u="infinite",p="discrete",c="progress-container",d="progress-bit",f=function(){function t(t){this.toUnbind=[],this.workedVal=0,this.create(t)}return t.prototype.create=function(t){var e=this;t.div({"class":c},function(t){e.element=t.clone(),t.div({"class":d}).on([r.EventType.ANIMATION_START,r.EventType.ANIMATION_END,r.EventType.ANIMATION_ITERATION],function(t){switch(t.type){case r.EventType.ANIMATION_START:case r.EventType.ANIMATION_END:e.animationRunning=t.type===r.EventType.ANIMATION_START;break;case r.EventType.ANIMATION_ITERATION:e.animationStopToken&&e.animationStopToken(null)}},e.toUnbind),e.bit=t.getHTMLElement()})},t.prototype.off=function(){this.bit.style.width="inherit",this.bit.style.opacity="1",this.element.removeClass(m),this.element.removeClass(u),this.element.removeClass(p),this.workedVal=0,this.totalWork=void 0},t.prototype.done=function(){return this.doDone(!0)},t.prototype.stop=function(){return this.doDone(!1)},t.prototype.doDone=function(t){var e=this;return this.element.addClass(h),this.element.hasClass(u)?(this.bit.style.opacity="0",t?s.TPromise.timeout(200).then(function(){return e.off()}):this.off()):(this.bit.style.width="inherit",t?s.TPromise.timeout(200).then(function(){return e.off()}):this.off()),this},t.prototype.infinite=function(){if(this.bit.style.width="2%",this.bit.style.opacity="1",this.element.removeClass(p),this.element.removeClass(h),this.element.addClass(m),this.element.addClass(u),!n.hasCSSAnimationSupport()){var t=a.v4().asHex();this.currentProgressToken=t,this.manualInfinite(t)}return this},t.prototype.manualInfinite=function(t){var e=this;this.bit.style.width="5%",this.bit.style.display="inherit";var i=0,n=function(){s.TPromise.timeout(50).then(function(){t===e.currentProgressToken&&(e.element.hasClass(h)?(e.bit.style.display="none",e.bit.style.left="0"):e.element.isHidden()?n():(i=(i+1)%95,e.bit.style.left=i+"%",n()))})};n()},t.prototype.total=function(t){return this.workedVal=0,this.totalWork=t,this},t.prototype.hasTotal=function(){return!isNaN(this.totalWork)},t.prototype.worked=function(t){return i.ok(!isNaN(this.totalWork),"Total work not set"),t=Number(t),i.ok(!isNaN(t),"Value is not a number"),t=Math.max(1,t),this.workedVal+=t,this.workedVal=Math.min(this.totalWork,this.workedVal),this.element.hasClass(u)&&this.element.removeClass(u),this.element.hasClass(h)&&this.element.removeClass(h),this.element.hasClass(m)||this.element.addClass(m),this.element.hasClass(p)||this.element.addClass(p),this.bit.style.width=100*(this.workedVal/this.totalWork)+"%",this},t.prototype.getContainer=function(){return o.$(this.element)},t.prototype.dispose=function(){this.toUnbind=l.dispose(this.toUnbind)},t}();e.ProgressBar=f});