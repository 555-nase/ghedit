var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","vs/base/browser/builder","vs/base/browser/dom","vs/base/common/events","vs/base/browser/ui/actionbar/actionbar","./treeDefaults","vs/css!./actionsRenderer"],function(t,e,n,o,r,i,s){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var c=n.$,a=function(t){function e(e){t.call(this),this.actionProvider=e.actionProvider,this.actionRunner=e.actionRunner}return __extends(e,t),e.prototype.getHeight=function(t,e){return this.getContentHeight(t,e)},e.prototype.render=function(t,n,s,a){var u=this;try{o.clearNode(s)}catch(d){if(!/The node to be removed is no longer a child of this node/.test(d.message))throw d}a&&a(t,n);var p,h,l=c(s).addClass("actions"),v=c(".sub-content").appendTo(l);this.actionProvider.hasActions(t,n)?(l.addClass("has-actions"),p=new i.ActionBar(c(".primary-action-bar").appendTo(l),{context:this.getActionContext(t,n),actionItemProvider:function(e){return u.actionProvider.getActionItem(t,n,e)},actionRunner:this.actionRunner}),this.actionProvider.getActions(t,n).then(function(t){p.push(t,{icon:!0,label:!1})}),h=p.addListener2(r.EventType.RUN,function(t){t.error&&u.onError(t.error)})):l.removeClass("has-actions");var f=(a?a[e.CONTENTS_CLEANUP_FN_KEY]:e.NO_OP)||e.NO_OP;f(t,n);var _=this.renderContents(t,n,v.getHTMLElement(),null),N=function(){h&&h.dispose(),p&&p.dispose(),_&&_(t,n)};return N[e.CONTENTS_CLEANUP_FN_KEY]=_,N},e.prototype.getContentHeight=function(t,e){return 20},e.prototype.renderContents=function(t,e,n,o){return null},e.prototype.getActionContext=function(t,e){return null},e.prototype.onError=function(t){},e.prototype.dispose=function(){this.actionProvider=null},e.CONTENTS_CLEANUP_FN_KEY="__$ActionsRenderer.contentCleanupFn",e.NO_OP=function(){},e}(s.LegacyRenderer);e.ActionsRenderer=a});