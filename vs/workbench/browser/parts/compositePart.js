/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)};define(["require","exports","vs/nls","vs/base/common/timer","vs/base/common/uuid","vs/base/common/winjs.base","vs/platform/platform","vs/base/common/lifecycle","vs/base/browser/builder","vs/base/common/events","vs/base/common/strings","vs/base/common/types","vs/base/common/errors","vs/base/browser/ui/toolbar/toolbar","vs/base/browser/ui/actionbar/actionbar","vs/base/browser/ui/progressbar/progressbar","vs/workbench/browser/actionBarRegistry","vs/workbench/browser/part","vs/workbench/common/events","vs/workbench/browser/composite","vs/workbench/services/progress/browser/progressService","vs/platform/storage/common/storage","vs/platform/instantiation/common/serviceCollection","vs/platform/message/common/message","vs/platform/progress/common/progress","vs/css!./media/compositepart"],function(t,e,o,i,s,r,n,a,c,p,m,h,v,l,C,d,u,g,f,y,b,S,T,A,I){"use strict";var w=function(t){function e(e,o,i,s,r,n,a,c,p,m,h,v,l,C){t.call(this,C),this.messageService=e,this.storageService=o,this.eventService=i,this.telemetryService=s,this.contextMenuService=r,this.partService=n,this.keybindingService=a,this.instantiationService=c,this.registry=p,this.activeCompositeSettingsKey=m,this.nameForTelemetry=h,this.compositeCSSClass=v,this.actionContributionScope=l,this.activeCompositeListeners=[],this.instantiatedCompositeListeners=[],this.mapCompositeToCompositeContainer={},this.mapActionsBindingToComposite={},this.mapProgressServiceToComposite={},this.activeComposite=null,this.instantiatedComposits=[],this.compositeLoaderPromises={}}return __extends(e,t),e.prototype.openComposite=function(t,e){return this.activeComposite&&this.activeComposite.getId()===t?(e&&this.activeComposite.focus(),r.TPromise.as(this.activeComposite)):this.doOpenComposite(t,e)},e.prototype.doOpenComposite=function(t,e){var o=this,n=i.start(i.Topic.WORKBENCH,m.format("Open Composite {0}",t.substr(t.lastIndexOf(".")+1))),a=s.generateUuid();this.currentCompositeOpenToken=a,this.emit(f.EventType.COMPOSITE_OPENING,new f.CompositeEvent(t));var c;return c=this.activeComposite?this.hideActiveComposite():r.TPromise.as(null),c.then(function(){return o.updateTitle(t),o.createComposite(t,!0).then(function(t){return o.currentCompositeOpenToken!==a||o.activeComposite&&o.activeComposite.getId()!==t.getId()?(n.stop(),r.TPromise.as(null)):o.activeComposite&&o.activeComposite.getId()===t.getId()?(e&&t.focus(),n.stop(),r.TPromise.as(t)):o.showComposite(t).then(function(){return e&&t.focus(),n.stop(),t})})})},e.prototype.createComposite=function(t,e){for(var o=this,i=0;i<this.instantiatedComposits.length;i++)if(this.instantiatedComposits[i].getId()===t)return r.TPromise.as(this.instantiatedComposits[i]);var s=this.registry.getComposite(t);if(s){var n=this.compositeLoaderPromises[t];if(!n){var a=new b.WorkbenchProgressService(this.eventService,this.progressBar,s.id,e),c=this.instantiationService.createChild(new T.ServiceCollection([I.IProgressService,a]));n=c.createInstance(s).then(function(e){return o.mapProgressServiceToComposite[e.getId()]=a,o.instantiatedComposits.push(e),o.instantiatedCompositeListeners.push(e.addListener2(y.EventType.INTERNAL_COMPOSITE_TITLE_AREA_UPDATE,function(t){o.onTitleAreaUpdate(t)})),delete o.compositeLoaderPromises[t],e}),a.showWhile(n,this.partService.isCreated()?800:3200),this.compositeLoaderPromises[t]=n}return n}throw new Error(m.format("Unable to find composite with id {0}",t))},e.prototype.showComposite=function(t){var e=this;this.activeComposite=t,this.storageService.store(this.activeCompositeSettingsKey,this.activeComposite.getId(),S.StorageScope.WORKSPACE),this.lastActiveCompositeId=this.activeComposite.getId(),this.activeCompositeListeners.push(this.eventService.addEmitter2(this.activeComposite,this.activeComposite.getId()));var o,i=this.mapCompositeToCompositeContainer[t.getId()];i?o=r.TPromise.as(null):(i=c.$().div({"class":["composite",this.compositeCSSClass],id:t.getId()},function(e){o=t.create(e)}),this.mapCompositeToCompositeContainer[t.getId()]=i);var s=this.mapProgressServiceToComposite[t.getId()];return s&&!i&&this.mapProgressServiceToComposite[t.getId()].showWhile(o,this.partService.isCreated()?800:3200),o.then(function(){if(e.activeComposite&&t.getId()===e.activeComposite.getId()){i.build(e.getContentArea()),i.show(),e.toolBar.actionRunner=t.getActionRunner();var o=e.registry.getComposite(t.getId());o&&o.name!==t.getTitle()&&e.updateTitle(t.getId(),t.getTitle());var s=e.mapActionsBindingToComposite[t.getId()];return s||(s=e.collectCompositeActions(t),e.mapActionsBindingToComposite[t.getId()]=s),s(),e.telemetryActionsListener&&(e.telemetryActionsListener.dispose(),e.telemetryActionsListener=null),e.telemetryActionsListener=e.toolBar.actionRunner.addListener2(p.EventType.RUN,function(t){t.error&&!v.isPromiseCanceledError(t.error)&&e.messageService.show(A.Severity.Error,t.error),e.telemetryService&&e.telemetryService.publicLog("workbenchActionExecuted",{id:t.action.id,from:e.nameForTelemetry})}),t.setVisible(!0).then(function(){e.activeComposite&&t.getId()===e.activeComposite.getId()&&(e.contentAreaSize&&t.layout(e.contentAreaSize),e.emit(f.EventType.COMPOSITE_OPENED,new f.CompositeEvent(e.activeComposite.getId())))})}},function(t){return e.onError(t)})},e.prototype.onTitleAreaUpdate=function(t){if(this.activeComposite&&this.activeComposite.getId()===t.compositeId){this.updateTitle(this.activeComposite.getId(),this.activeComposite.getTitle());var e=this.collectCompositeActions(this.activeComposite);this.mapActionsBindingToComposite[this.activeComposite.getId()]=e,e()}else delete this.mapActionsBindingToComposite[t.compositeId]},e.prototype.updateTitle=function(t,e){var i=this,s=this.registry.getComposite(t);if(s){e||(e=s.name);var r=null,n=this.keybindingService.lookupKeybindings(t).map(function(t){return i.keybindingService.getLabelFor(t)});n&&n.length&&(r=n[0]),this.titleLabel.safeInnerHtml(e),this.titleLabel.title(r?o.localize("compositeTitleTooltip","{0} ({1})",e,r):e),this.toolBar.setAriaLabel(o.localize("ariaCompositeToolbarLabel","{0} actions",e))}},e.prototype.collectCompositeActions=function(t){var e=t.getActions().slice(0),o=t.getSecondaryActions().slice(0);e.push.apply(e,this.getActions()),o.push.apply(o,this.getSecondaryActions());var i=n.Registry.as(u.Extensions.Actionbar);return e.push.apply(e,i.getActionBarActionsForContext(this.actionContributionScope,t)),o.push.apply(o,i.getSecondaryActionBarActionsForContext(this.actionContributionScope,t)),this.toolBar.setActions(u.prepareActions(e),u.prepareActions(o))},e.prototype.getActiveComposite=function(){return this.activeComposite},e.prototype.getLastActiveCompositetId=function(){return this.lastActiveCompositeId},e.prototype.hideActiveComposite=function(){var t=this;if(!this.activeComposite)return r.TPromise.as(null);var e=this.activeComposite;this.activeComposite=null;var o=this.mapCompositeToCompositeContainer[e.getId()];return e.setVisible(!1).then(function(){o.offDOM(),o.hide(),t.progressBar.stop().getContainer().hide(),t.toolBar.setActions([])(),t.activeCompositeListeners=a.dispose(t.activeCompositeListeners),t.emit(f.EventType.COMPOSITE_CLOSED,new f.CompositeEvent(e.getId()))})},e.prototype.createTitleArea=function(t){var e=this,o=c.$(t).div({"class":["composite","title"]});return c.$(o).div({"class":"title-label"},function(t){e.titleLabel=t.span()}),c.$(o).div({"class":"title-actions"},function(t){e.toolBar=new l.ToolBar(t.getHTMLElement(),e.contextMenuService,{actionItemProvider:function(t){return e.actionItemProvider(t)},orientation:C.ActionsOrientation.HORIZONTAL,getKeyBinding:function(t){var o=e.keybindingService.lookupKeybindings(t.id);return o.length>0?o[0]:null}})}),o},e.prototype.actionItemProvider=function(t){var e;if(this.activeComposite&&(e=this.activeComposite.getActionItem(t)),!e){var o=n.Registry.as(u.Extensions.Actionbar);e=o.getActionItemForContext(this.actionContributionScope,l.CONTEXT,t)}return e},e.prototype.createContentArea=function(t){var e=this;return c.$(t).div({"class":"content"},function(t){e.progressBar=new d.ProgressBar(t),e.progressBar.getContainer().hide()})},e.prototype.onError=function(t){this.messageService.show(A.Severity.Error,h.isString(t)?new Error(t):t)},e.prototype.getActions=function(){return[]},e.prototype.getSecondaryActions=function(){return[]},e.prototype.layout=function(e){var o=t.prototype.layout.call(this,e);return this.contentAreaSize=o[1],this.activeComposite&&this.activeComposite.layout(this.contentAreaSize),o},e.prototype.shutdown=function(){this.instantiatedComposits.forEach(function(t){return t.shutdown()}),t.prototype.shutdown.call(this)},e.prototype.dispose=function(){this.mapCompositeToCompositeContainer=null,this.mapProgressServiceToComposite=null,this.mapActionsBindingToComposite=null;for(var e=0;e<this.instantiatedComposits.length;e++)this.instantiatedComposits[e].dispose();this.instantiatedComposits=[],this.activeCompositeListeners=a.dispose(this.activeCompositeListeners),this.instantiatedCompositeListeners=a.dispose(this.instantiatedCompositeListeners),this.progressBar.dispose(),this.toolBar.dispose(),t.prototype.dispose.call(this)},e}(g.Part);e.CompositePart=w});