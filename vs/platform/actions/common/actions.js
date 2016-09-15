var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},__decorate=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,c=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,i);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(c=(r<3?o(c):r>3?o(e,n,c):o(e,n))||c);return r>3&&c&&Object.defineProperty(e,n,c),c},__param=this&&this.__param||function(t,e){return function(n,i){e(n,i,t)}};define(["require","exports","vs/base/common/actions","vs/base/common/winjs.base","vs/platform/instantiation/common/descriptors","vs/platform/commands/common/commands","vs/platform/instantiation/common/instantiation"],function(t,e,n,i,o,r,c){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";!function(t){t[t.EditorTitle=1]="EditorTitle",t[t.EditorContext=2]="EditorContext",t[t.ExplorerContext=3]="ExplorerContext"}(e.MenuId||(e.MenuId={}));e.MenuId;e.IMenuService=c.createDecorator("menuService"),e.MenuRegistry=new(function(){function t(){this.commands=Object.create(null),this.menuItems=Object.create(null)}return t.prototype.addCommand=function(t){var e=this.commands[t.id];return this.commands[t.id]=t,void 0!==e},t.prototype.getCommand=function(t){return this.commands[t]},t.prototype.appendMenuItem=function(t,e){var n=this.menuItems[t];return n?n.push(e):this.menuItems[t]=n=[e],{dispose:function(){var t=n.indexOf(e);t>=0&&n.splice(t,1)}}},t.prototype.getMenuItems=function(t){return this.menuItems[t]||[]},t}());var s=function(t){function e(n,i){t.call(this,e._getMenuItemId(n),n.command.title),this._item=n,this._commandService=i,this.order=this._item.order}return __extends(e,t),e._getMenuItemId=function(t){var e=t.command.id;return t.alt&&(e+="||"+t.alt.id),e},Object.defineProperty(e.prototype,"resource",{get:function(){return this._resource},set:function(t){this._resource=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"item",{get:function(){return this._item},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"command",{get:function(){return this._item.command},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"altCommand",{get:function(){return this._item.alt},enumerable:!0,configurable:!0}),e.prototype.run=function(t){var e=(t===!0&&this._item.alt||this._item.command).id;return this._commandService.executeCommand(e,this._resource)},e=__decorate([__param(1,r.ICommandService)],e)}(n.Action);e.MenuItemAction=s;var a=function(t){function e(e,n,i){t.call(this,e,n),this._commandService=i}return __extends(e,t),e.prototype.run=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return(n=this._commandService).executeCommand.apply(n,[this.id].concat(t));var n},e=__decorate([__param(2,r.ICommandService)],e)}(n.Action);e.ExecuteCommandAction=a;var u=function(){function t(t,e,n,i,r,c){this._id=e,this._label=n,this._keybindings=i,this._keybindingContext=r,this._keybindingWeight=c,this._descriptor=o.createSyncDescriptor(t,this._id,this._label)}return Object.defineProperty(t.prototype,"syncDescriptor",{get:function(){return this._descriptor},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"keybindings",{get:function(){return this._keybindings},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"keybindingContext",{get:function(){return this._keybindingContext},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"keybindingWeight",{get:function(){return this._keybindingWeight},enumerable:!0,configurable:!0}),t}();e.SyncActionDescriptor=u;var d=function(t){function e(e,n,i,o,r,c){void 0===o&&(o=""),void 0===r&&(r=""),void 0===c&&(c=!0),t.call(this,i,o,r,c),this._instantiationService=e,this._descriptor=n}return __extends(e,t),Object.defineProperty(e.prototype,"cachedAction",{get:function(){return this._cachedAction},set:function(t){this._cachedAction=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"id",{get:function(){return this._cachedAction instanceof n.Action?this._cachedAction.id:this._id},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"label",{get:function(){return this._cachedAction instanceof n.Action?this._cachedAction.label:this._label},set:function(t){this._cachedAction instanceof n.Action?this._cachedAction.label=t:this._setLabel(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"class",{get:function(){return this._cachedAction instanceof n.Action?this._cachedAction["class"]:this._cssClass},set:function(t){this._cachedAction instanceof n.Action?this._cachedAction["class"]=t:this._setClass(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"enabled",{get:function(){return this._cachedAction instanceof n.Action?this._cachedAction.enabled:this._enabled},set:function(t){this._cachedAction instanceof n.Action?this._cachedAction.enabled=t:this._setEnabled(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"order",{get:function(){return this._cachedAction instanceof n.Action?this._cachedAction.order:this._order},set:function(t){this._cachedAction instanceof n.Action?this._cachedAction.order=t:this._order=t},enumerable:!0,configurable:!0}),e.prototype.run=function(t){return this._cachedAction?this._cachedAction.run(t):this._createAction().then(function(e){return e.run(t)})},e.prototype._createAction=function(){var t=this,e=i.TPromise.as(void 0);return e.then(function(){return t._instantiationService.createInstance(t._descriptor)}).then(function(e){if(!(e instanceof n.Action))throw new Error("Action must be an instanceof Base Action");return t._cachedAction=e,t._emitterUnbind=e.onDidChange(function(e){return t._onDidChange.fire(e)}),e})},e.prototype.dispose=function(){this._emitterUnbind&&this._emitterUnbind.dispose(),this._cachedAction&&this._cachedAction.dispose(),t.prototype.dispose.call(this)},e}(n.Action);e.DeferredAction=d});