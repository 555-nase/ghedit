var __extends=this&&this.__extends||function(e,t){function o(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)},__decorate=this&&this.__decorate||function(e,t,o,i){var r,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(s=(n<3?r(s):n>3?r(t,o,s):r(t,o))||s);return n>3&&s&&Object.defineProperty(t,o,s),s},__param=this&&this.__param||function(e,t){return function(o,i){t(o,i,e)}};define(["require","exports","vs/base/common/winjs.base","vs/nls","vs/platform/platform","vs/base/common/actions","vs/platform/actions/common/actions","vs/workbench/common/actionRegistry","vs/workbench/services/part/common/partService"],function(e,t,o,i,r,n,s,c,a){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var l=function(e){function t(t,o,i){e.call(this,t,o),this.partService=i,this.enabled=!!this.partService}return __extends(t,e),t.prototype.run=function(){var e=this.partService.getSideBarPosition();return this.partService.setSideBarPosition(e===a.Position.LEFT?a.Position.RIGHT:a.Position.LEFT),o.TPromise.as(null)},t.ID="workbench.action.toggleSidebarPosition",t.LABEL=i.localize("togglePosition","Toggle Side Bar Position"),t=__decorate([__param(2,a.IPartService)],t)}(n.Action);t.ToggleSidebarPositionAction=l;var p=r.Registry.as(c.Extensions.WorkbenchActions);p.registerWorkbenchAction(new s.SyncActionDescriptor(l,l.ID,l.LABEL),"View: Toggle Side Bar Position",i.localize("view","View"))});