/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)};define(["require","exports","vs/base/browser/dom","vs/platform/platform","vs/base/common/winjs.base","vs/workbench/browser/composite","vs/base/common/actions"],function(e,t,n,o,i,r,s){"use strict";var a=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t}(r.Composite);t.Panel=a;var p=function(e){function t(t,n,o,i,r){e.call(this,t,n,o,i,r)}return __extends(t,e),t}(r.CompositeDescriptor);t.PanelDescriptor=p;var c=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.registerPanel=function(t){e.prototype.registerComposite.call(this,t)},t.prototype.getPanel=function(e){return this.getComposite(e)},t.prototype.getPanels=function(){return this.getComposits()},t.prototype.setDefaultPanelId=function(e){this.defaultPanelId=e},t.prototype.getDefaultPanelId=function(){return this.defaultPanelId},t}(r.CompositeRegistry);t.PanelRegistry=c;var l=function(e){function t(t,n,o,i,r,s){e.call(this,t,name),this.panelService=i,this.partService=r,this.editorService=s,this.panelId=o}return __extends(t,e),t.prototype.run=function(){return this.isPanelShowing()?(this.partService.setPanelHidden(!0),i.TPromise.as(!0)):this.panelService.openPanel(this.panelId,!0)},t.prototype.isPanelShowing=function(){var e=this.panelService.getActivePanel();return e&&e.getId()===this.panelId},t.prototype.isPanelFocussed=function(){var e=this.panelService.getActivePanel(),t=document.activeElement;return e&&t&&n.isAncestor(t,e.getContainer().getHTMLElement())},t}(s.Action);t.TogglePanelAction=l,t.Extensions={Panels:"workbench.contributions.panels"},o.Registry.add(t.Extensions.Panels,new c)});