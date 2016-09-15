/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(e,t,i,n){var s,c=arguments.length,o=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(c<3?s(o):c>3?s(t,i,o):s(t,i))||o);return c>3&&o&&Object.defineProperty(t,i,o),o},__param=this&&this.__param||function(e,t){return function(i,n){t(i,n,e)}};define(["require","exports","vs/nls","vs/base/common/strings","vs/base/common/async","vs/base/browser/dom","vs/base/common/lifecycle","vs/workbench/parts/git/common/git","vs/workbench/services/quickopen/common/quickOpenService","vs/platform/instantiation/common/instantiation","vs/platform/telemetry/common/telemetry","./gitActions","vs/base/common/severity","vs/platform/message/common/message"],function(e,t,i,n,s,c,o,r,a,h,l,m,u,p){"use strict";var b=500,d=function(){function e(e,t,i,n,c){this.messageService=n,this.telemetryService=c,this.instantiationService=e,this.gitService=t,this.quickOpenService=i,this.disablementDelayer=new s.Delayer(b),this.syncAction=e.createInstance(m.SyncAction,m.SyncAction.ID,m.SyncAction.LABEL),this.publishAction=e.createInstance(m.PublishAction,m.PublishAction.ID,m.PublishAction.LABEL),this.toDispose=[this.syncAction,this.publishAction],this.state={serviceState:r.ServiceState.NotInitialized,isBusy:!1,isSyncing:!1,HEAD:null,remotes:[],ps1:""}}return e.prototype.render=function(e){var t=this;return this.element=c.append(e,c.emmet(".git-statusbar-group")),this.branchElement=c.append(this.element,c.emmet("a")),this.publishElement=c.append(this.element,c.emmet("a.octicon.octicon-cloud-upload")),this.publishElement.title=i.localize("publishBranch","Publish Branch"),this.publishElement.onclick=function(){return t.onPublishClick()},this.syncElement=c.append(this.element,c.emmet("a.git-statusbar-sync-item")),this.syncElement.title=i.localize("syncBranch","Synchronize Changes"),this.syncElement.onclick=function(){return t.onSyncClick()},c.append(this.syncElement,c.emmet("span.octicon.octicon-sync")),this.syncLabelElement=c.append(this.syncElement,c.emmet("span.ahead-behind")),this.setState(this.state),this.toDispose.push(this.gitService.addBulkListener2(function(){return t.onGitServiceChange()})),o.combinedDisposable(this.toDispose)},e.prototype.onGitServiceChange=function(){var e=this.gitService.getModel();this.setState({serviceState:this.gitService.getState(),isBusy:this.gitService.getRunningOperations().some(function(e){return e.id===r.ServiceOperations.CHECKOUT||e.id===r.ServiceOperations.BRANCH}),isSyncing:this.gitService.getRunningOperations().some(function(e){return e.id===r.ServiceOperations.SYNC}),HEAD:e.getHEAD(),remotes:e.getRemotes(),ps1:e.getPS1()})},e.prototype.setState=function(e){var t=this;this.state=e;var s,o=!1,a="git-statusbar-branch-item",h="",l="",m=null;if(e.serviceState!==r.ServiceState.OK)o=!0,a+=" disabled",l=i.localize("gitNotEnabled","Git is not enabled in this workspace."),s=" ";else{var u=e.HEAD;e.isBusy?a+=" busy":m=function(){return t.onBranchClick()},u?u.name?u.commit&&u.upstream&&(u.ahead||u.behind)?(s=e.ps1,h=n.format("{0}↓ {1}↑",u.behind,u.ahead)):s=e.ps1:(s=e.ps1,a+=" headless"):s=e.ps1}this.branchElement.className=a,this.branchElement.title=l,this.branchElement.textContent=s,this.branchElement.onclick=m,this.syncLabelElement.textContent=h,o?(c.hide(this.branchElement),c.hide(this.publishElement),c.hide(this.syncElement)):(c.show(this.branchElement),e.HEAD&&e.HEAD.upstream?(c.show(this.syncElement),c.toggleClass(this.syncElement,"syncing",this.state.isSyncing),c.toggleClass(this.syncElement,"empty",!h),this.disablementDelayer.trigger(function(){return c.toggleClass(t.syncElement,"disabled",!t.syncAction.enabled)},this.syncAction.enabled?0:b),c.hide(this.publishElement)):e.remotes.length>0?(c.hide(this.syncElement),c.show(this.publishElement),this.disablementDelayer.trigger(function(){return c.toggleClass(t.publishElement,"disabled",!t.publishAction.enabled)},this.publishAction.enabled?0:b)):(c.hide(this.syncElement),c.hide(this.publishElement)))},e.prototype.onBranchClick=function(){this.quickOpenService.show("git checkout ")},e.prototype.onPublishClick=function(){this.runAction(this.publishAction)},e.prototype.onSyncClick=function(){this.runAction(this.syncAction)},e.prototype.runAction=function(e){var t=this;e.enabled&&(this.telemetryService.publicLog("workbenchActionExecuted",{id:e.id,from:"status bar"}),e.run().done(null,function(e){return t.messageService.show(u["default"].Error,e)}))},e=__decorate([__param(0,h.IInstantiationService),__param(1,r.IGitService),__param(2,a.IQuickOpenService),__param(3,p.IMessageService),__param(4,l.ITelemetryService)],e)}();t.GitStatusbarItem=d});