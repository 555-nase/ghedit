/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)},__decorate=this&&this.__decorate||function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s},__param=this&&this.__param||function(e,t){return function(i,r){t(i,r,e)}};define(["require","exports","vs/base/common/winjs.base","vs/nls","vs/platform/platform","vs/base/common/actions","vs/workbench/browser/parts/compositePart","vs/workbench/browser/viewlet","vs/workbench/common/actionRegistry","vs/platform/actions/common/actions","vs/workbench/services/viewlet/common/viewletService","vs/workbench/services/part/common/partService","vs/workbench/browser/actionBarRegistry","vs/platform/storage/common/storage","vs/platform/contextview/browser/contextView","vs/platform/event/common/event","vs/platform/message/common/message","vs/platform/telemetry/common/telemetry","vs/platform/keybinding/common/keybinding","vs/base/common/keyCodes","vs/platform/instantiation/common/instantiation","vs/base/common/event","vs/css!./media/sidebarpart"],function(e,t,i,r,o,n,s,c,a,v,p,m,l,d,h,w,f,_,u,y,S,b){"use strict";var g=function(e){function t(i,r,n,s,a,v,p,m,d){e.call(this,r,n,s,a,v,p,m,d,o.Registry.as(c.Extensions.Viewlets),t.activeViewletSettingsKey,"sideBar","viewlet",l.Scope.VIEWLET,i),this._onDidActiveViewletChange=new b.Emitter,this.onDidActiveViewletChange=this._onDidActiveViewletChange.event}return __extends(t,e),t.prototype.openViewlet=function(e,t){var r=this;if(this.blockOpeningViewlet)return i.TPromise.as(null);if(this.partService.isSideBarHidden())try{this.blockOpeningViewlet=!0,this.partService.setSideBarHidden(!1)}finally{this.blockOpeningViewlet=!1}return this.openComposite(e,t).then(function(e){return r._onDidActiveViewletChange.fire(e),e})},t.prototype.getActiveViewlet=function(){return this.getActiveComposite()},t.prototype.getLastActiveViewletId=function(){return this.getLastActiveCompositetId()},t.prototype.hideActiveViewlet=function(){return this.hideActiveComposite()},t.activeViewletSettingsKey="workbench.sidebar.activeviewletid",t=__decorate([__param(1,f.IMessageService),__param(2,d.IStorageService),__param(3,w.IEventService),__param(4,_.ITelemetryService),__param(5,h.IContextMenuService),__param(6,m.IPartService),__param(7,u.IKeybindingService),__param(8,S.IInstantiationService)],t)}(s.CompositePart);t.SidebarPart=g;var V=function(e){function t(t,i,r,o){e.call(this,t,i),this.viewletService=r,this.partService=o}return __extends(t,e),t.prototype.run=function(){if(this.partService.isSideBarHidden())this.partService.setSideBarHidden(!1);else{var e=this.viewletService.getActiveViewlet();e&&e.focus()}return i.TPromise.as(!0)},t.ID="workbench.action.focusSideBar",t.LABEL=r.localize("focusSideBar","Focus into Side Bar"),t=__decorate([__param(2,p.IViewletService),__param(3,m.IPartService)],t)}(n.Action),A=o.Registry.as(a.Extensions.WorkbenchActions);A.registerWorkbenchAction(new v.SyncActionDescriptor(V,V.ID,V.LABEL,{primary:y.KeyMod.CtrlCmd|y.KeyCode.KEY_0}),"View: Focus into Side Bar",r.localize("viewCategory","View"))});