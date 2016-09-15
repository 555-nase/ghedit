/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(i,t,s,o){var e,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(i,t,s,o);else for(var h=i.length-1;h>=0;h--)(e=i[h])&&(r=(n<3?e(r):n>3?e(t,s,r):e(t,s))||r);return n>3&&r&&Object.defineProperty(t,s,r),r},__param=this&&this.__param||function(i,t){return function(s,o){t(s,o,i)}};define(["require","exports","vs/base/common/arrays","vs/base/common/event","vs/base/browser/mouseEvent","vs/base/common/types","vs/base/browser/builder","vs/base/browser/ui/sash/sash","vs/base/browser/ui/progressbar/progressbar","vs/base/browser/dom","vs/base/common/errors","vs/base/common/async","vs/base/common/platform","vs/workbench/services/editor/common/editorService","vs/platform/contextview/browser/contextView","vs/platform/editor/common/editor","vs/workbench/services/group/common/groupService","vs/platform/event/common/event","vs/workbench/browser/parts/editor/textEditor","vs/platform/message/common/message","vs/platform/telemetry/common/telemetry","vs/platform/configuration/common/configuration","vs/platform/instantiation/common/instantiation","vs/platform/instantiation/common/serviceCollection","vs/platform/keybinding/common/keybinding","vs/platform/extensions/common/extensions","vs/base/common/lifecycle","vs/workbench/browser/parts/editor/tabsTitleControl","vs/workbench/browser/parts/editor/titleControl","vs/workbench/browser/parts/editor/noTabsTitleControl","vs/workbench/common/editor","vs/base/browser/dnd","vs/css!./media/sidebyside"],function(i,t,s,o,e,n,r,h,a,d,l,E,c,T,u,p,f,v,I,g,P,R,S,_,C,N,m,y,W,D,O,b){"use strict";!function(i){i[i.NONE=0]="NONE",i[i.CENTER_TO_LEFT=1]="CENTER_TO_LEFT",i[i.RIGHT_TO_CENTER=2]="RIGHT_TO_CENTER",i[i.CENTER_AND_RIGHT_TO_LEFT=3]="CENTER_AND_RIGHT_TO_LEFT"}(t.Rochade||(t.Rochade={}));var H=t.Rochade;!function(i){i[i.INFINITE=0]="INFINITE",i[i.DONE=1]="DONE",i[i.STOP=2]="STOP"}(t.ProgressState||(t.ProgressState={}));var L=t.ProgressState,M=function(){function i(i,t,s,e,n,h,a,d,l,c,T){var u=this;this.editorService=t,this.editorGroupService=s,this.messageService=e,this.telemetryService=n,this.contextMenuService=h,this.eventService=a,this.configurationService=d,this.keybindingService=l,this.extensionService=c,this.instantiationService=T,this.stacks=s.getStacksModel(),this.toDispose=[],this.parent=i,this.dimension=new r.Dimension(0,0),this.silos=[],this.siloWidths=[],this.visibleEditors=[],this.visibleEditorFocusTrackers=[],this._onGroupFocusChanged=new o.Emitter,this.onStacksChangeScheduler=new E.RunOnceScheduler(function(){return u.handleStacksChanged()},0),this.toDispose.push(this.onStacksChangeScheduler),this.stacksChangedBuffer=[],this.create(this.parent),this.registerListeners()}return i.prototype.registerListeners=function(){var i=this;this.toDispose.push(this.stacks.onModelChanged(function(t){return i.onStacksChanged(t)})),this.toDispose.push(this.configurationService.onDidUpdateConfiguration(function(t){return i.onConfigurationUpdated(t.config)})),this.extensionService.onReady().then(function(){return i.onExtensionsReady()})},i.prototype.onConfigurationUpdated=function(i){var t=this,s=i.workbench.editor.showTabs;p.POSITIONS.forEach(function(i){var o=t.getTitleAreaControl(i),e=r.$(o.getContainer());if(s?e.addClass("tabs"):e.removeClass("tabs"),o){var n=o instanceof y.TabsTitleControl;n!==s&&(o.dispose(),e.empty(),t.createTitleControl(t.stacks.groupAt(i),t.silos[i],e,t.getInstantiationService(i)))}})},i.prototype.onExtensionsReady=function(){var i=this;p.POSITIONS.forEach(function(t){return i.getTitleAreaControl(t).update()})},i.prototype.onStacksChanged=function(i){this.stacksChangedBuffer.push(i),this.onStacksChangeScheduler.schedule()},i.prototype.handleStacksChanged=function(){var i=this,t=this.stacksChangedBuffer;this.stacksChangedBuffer=[],p.POSITIONS.forEach(function(t){var s=i.getTitleAreaControl(t),o=i.stacks.groupAt(t);s.setContext(o),o||s.refresh()}),t.forEach(function(t){var s=i.stacks.positionOfGroup(t.group);s>=0&&(t.structural?i.getTitleAreaControl(s).refresh():i.getTitleAreaControl(s).update())})},Object.defineProperty(i.prototype,"onGroupFocusChanged",{get:function(){return this._onGroupFocusChanged.event},enumerable:!0,configurable:!0}),i.prototype.show=function(i,t,s,o){var e=this.getVisibleEditorCount();this.visibleEditors[t]=i,s&&this.lastActiveEditor||this.doSetActive(i,t),this.trackFocus(i,t);var n=this.silos[t].child();if(i.getContainer().build(n),!o||2!==o.length&&3!==o.length)0===e&&this.dimension?(this.siloWidths[t]=this.dimension.width,this.layoutContainers()):t===p.Position.CENTER&&this.leftSash.isHidden()&&this.rightSash.isHidden()&&this.dimension?(this.siloWidths[p.Position.LEFT]=this.dimension.width/2,this.siloWidths[p.Position.CENTER]=this.dimension.width-this.siloWidths[p.Position.LEFT],this.leftSash.show(),this.leftSash.layout(),this.layoutContainers()):t===p.Position.RIGHT&&this.rightSash.isHidden()&&this.dimension&&(this.siloWidths[p.Position.LEFT]=this.dimension.width/3,this.siloWidths[p.Position.CENTER]=this.dimension.width/3,this.siloWidths[p.Position.RIGHT]=this.dimension.width-this.siloWidths[p.Position.LEFT]-this.siloWidths[p.Position.CENTER],this.leftSash.layout(),this.rightSash.show(),this.rightSash.layout(),this.layoutContainers());else{var r=this.dimension&&this.dimension.width;r||(this.siloInitialRatios=o),2===o.length?r&&(this.siloWidths[t]=this.dimension.width*o[t]):3===o.length&&(r&&(this.siloWidths[t]=this.dimension.width*o[t]),this.rightSash.isHidden()&&(this.rightSash.show(),this.rightSash.layout())),this.leftSash.isHidden()&&(this.leftSash.show(),this.leftSash.layout()),r&&this.layoutContainers()}i.getContainer().show(),this.updateParentStyle()},i.prototype.getVisibleEditorCount=function(){return this.visibleEditors.filter(function(i){return!!i}).length},i.prototype.trackFocus=function(i,t){var s=this;this.visibleEditorFocusTrackers[t]&&this.visibleEditorFocusTrackers[t].dispose(),this.visibleEditorFocusTrackers[t]=d.trackFocus(i.getContainer().getHTMLElement()),this.visibleEditorFocusTrackers[t].addFocusListener(function(){s.onFocusGained(i)})},i.prototype.onFocusGained=function(i){this.setActive(i)},i.prototype.setActive=function(t){var s=this;if(this.lastActiveEditor!==t){if(this.doSetActive(t,this.visibleEditors.indexOf(t)),this.siloWidths[this.lastActivePosition]===i.MIN_EDITOR_WIDTH){this.telemetryService&&this.telemetryService.publicLog("workbenchEditorMaximized");var o=this.dimension.width;p.POSITIONS.forEach(function(t){s.lastActivePosition!==t&&s.visibleEditors[t]&&(s.siloWidths[t]=i.MIN_EDITOR_WIDTH,o-=s.siloWidths[t])}),o>i.MIN_EDITOR_WIDTH&&(this.siloWidths[this.lastActivePosition]=o,this.leftSash.isHidden()||this.leftSash.layout(),this.rightSash.isHidden()||this.rightSash.layout(),this.layoutContainers())}this._onGroupFocusChanged.fire()}},i.prototype.focusNextNonMinimized=function(){var t=this;if(!n.isUndefinedOrNull(this.lastActivePosition)&&this.siloWidths[this.lastActivePosition]===i.MIN_EDITOR_WIDTH){var s=null,o=i.MIN_EDITOR_WIDTH;p.POSITIONS.forEach(function(i){i!==t.lastActivePosition&&t.visibleEditors[i]&&t.siloWidths[i]>o&&(s=i,o=t.siloWidths[i])}),n.isUndefinedOrNull(s)||this.editorGroupService.focusGroup(s)}},i.prototype.hide=function(i,t,s){var o=H.NONE,e=this.getVisibleEditorCount(),r=!!this.visibleEditors[p.Position.CENTER],h=!!this.visibleEditors[p.Position.RIGHT];if(i!==this.visibleEditors[t])return o;if(this.clearPosition(t),i.getContainer().offDOM().hide(),s&&(1===e?(this.siloWidths[t]=0,this.leftSash.hide(),this.rightSash.hide(),this.layoutContainers()):r&&!h?(this.siloWidths[p.Position.LEFT]=this.dimension.width,this.siloWidths[p.Position.CENTER]=0,this.leftSash.hide(),this.rightSash.hide(),t===p.Position.LEFT&&(this.rochade(p.Position.CENTER,p.Position.LEFT),o=H.CENTER_TO_LEFT),this.layoutContainers()):r&&h&&(this.siloWidths[p.Position.LEFT]=this.dimension.width/2,this.siloWidths[p.Position.CENTER]=this.dimension.width-this.siloWidths[p.Position.LEFT],this.siloWidths[p.Position.RIGHT]=0,this.leftSash.layout(),this.rightSash.hide(),t===p.Position.CENTER?(this.rochade(p.Position.RIGHT,p.Position.CENTER),o=H.RIGHT_TO_CENTER):t===p.Position.LEFT&&(this.rochade(p.Position.CENTER,p.Position.LEFT),this.rochade(p.Position.RIGHT,p.Position.CENTER),o=H.CENTER_AND_RIGHT_TO_LEFT),this.layoutContainers())),this.lastActiveEditor===i&&(this.doSetActive(null,null),s)){var a=void 0;switch(t){case p.Position.LEFT:a=r?p.Position.LEFT:null;break;case p.Position.CENTER:a=p.Position.LEFT;break;case p.Position.RIGHT:a=p.Position.CENTER}n.isUndefinedOrNull(a)||this.doSetActive(this.visibleEditors[a],a)}return this.updateParentStyle(),o},i.prototype.updateParentStyle=function(){var i=this.getVisibleEditorCount();i>1?this.parent.addClass("multiple-editors"):this.parent.removeClass("multiple-editors")},i.prototype.doSetActive=function(i,t){this.lastActivePosition=t,this.lastActiveEditor=i},i.prototype.clearPosition=function(i){this.visibleEditorFocusTrackers[i]&&(this.visibleEditorFocusTrackers[i].dispose(),this.visibleEditorFocusTrackers[i]=null),this.visibleEditors[i]=null},i.prototype.rochade=function(i,t){var s=this.silos[i].child();s.appendTo(this.silos[t]);var o=this.silos[t].child();o.appendTo(this.silos[i]);var e=this.visibleEditors[i];e.changePosition(t);var n=this.visibleEditorFocusTrackers[i];this.visibleEditorFocusTrackers[t]=n,this.visibleEditorFocusTrackers[i]=null,this.visibleEditors[t]=e,this.visibleEditors[i]=null,this.lastActivePosition===i&&this.doSetActive(this.lastActiveEditor,t)},i.prototype.move=function(i,t){if(1===Math.abs(i-t)){var o=this.silos[i].child();o.appendTo(this.silos[t]);var e=this.silos[t].child();e.appendTo(this.silos[i]),this.visibleEditors[i].changePosition(t),this.visibleEditors[t].changePosition(i),this.lastActivePosition===i?this.doSetActive(this.lastActiveEditor,t):this.lastActivePosition===t&&this.doSetActive(this.lastActiveEditor,i)}else{var n=void 0,r=void 0,h=void 0;i===p.Position.LEFT?(n=p.Position.RIGHT,r=p.Position.LEFT,h=p.Position.CENTER):(n=p.Position.CENTER,r=p.Position.RIGHT,h=p.Position.LEFT);var a=this.silos[p.Position.LEFT].child();a.appendTo(this.silos[n]);var d=this.silos[p.Position.CENTER].child();d.appendTo(this.silos[r]);var l=this.silos[p.Position.RIGHT].child();l.appendTo(this.silos[h]),this.visibleEditors[p.Position.LEFT].changePosition(n),this.visibleEditors[p.Position.CENTER].changePosition(r),this.visibleEditors[p.Position.RIGHT].changePosition(h),this.lastActivePosition===p.Position.LEFT?this.doSetActive(this.lastActiveEditor,n):this.lastActivePosition===p.Position.CENTER?this.doSetActive(this.lastActiveEditor,r):this.lastActivePosition===p.Position.RIGHT&&this.doSetActive(this.lastActiveEditor,h)}s.move(this.visibleEditors,i,t),s.move(this.visibleEditorFocusTrackers,i,t),s.move(this.siloWidths,i,t),this.leftSash.isHidden()||this.leftSash.layout(),this.rightSash.isHidden()||this.rightSash.layout(),this.layoutContainers()},i.prototype.arrangeGroups=function(t){var s=this;if(this.dimension){var o=this.dimension.width,e=this.getVisibleEditorCount();e<=1||(t===f.GroupArrangement.MINIMIZE_OTHERS?(p.POSITIONS.forEach(function(t){s.visibleEditors[t]&&t!==s.lastActivePosition&&(s.siloWidths[t]=i.MIN_EDITOR_WIDTH,o-=i.MIN_EDITOR_WIDTH)}),this.siloWidths[this.lastActivePosition]=o):t===f.GroupArrangement.EVEN_WIDTH&&p.POSITIONS.forEach(function(i){s.visibleEditors[i]&&(s.siloWidths[i]=o/e)}),this.layoutControl(this.dimension))}},i.prototype.getWidthRatios=function(){var i=this,t=[];if(this.dimension){var s=this.dimension.width;p.POSITIONS.forEach(function(o){i.visibleEditors[o]&&t.push(i.siloWidths[o]/s)})}return t},i.prototype.getActiveEditor=function(){return this.lastActiveEditor},i.prototype.getActivePosition=function(){return this.lastActivePosition},i.prototype.create=function(t){var s=this;this.enableDropTarget(t.getHTMLElement()),this.silos[p.Position.LEFT]=r.$(t).div({"class":"one-editor-silo editor-left monaco-editor-background"}),this.leftSash=new h.Sash(t.getHTMLElement(),this,{baseSize:5}),this.toDispose.push(this.leftSash.addListener2("start",function(){return s.onLeftSashDragStart()})),this.toDispose.push(this.leftSash.addListener2("change",function(i){return s.onLeftSashDrag(i)})),this.toDispose.push(this.leftSash.addListener2("end",function(){return s.onLeftSashDragEnd()})),this.toDispose.push(this.leftSash.addListener2("reset",function(){return s.onLeftSashReset()})),this.leftSash.hide(),this.silos[p.Position.CENTER]=r.$(t).div({"class":"one-editor-silo editor-center monaco-editor-background"}),this.rightSash=new h.Sash(t.getHTMLElement(),this,{baseSize:5}),this.toDispose.push(this.rightSash.addListener2("start",function(){return s.onRightSashDragStart()})),this.toDispose.push(this.rightSash.addListener2("change",function(i){return s.onRightSashDrag(i)})),this.toDispose.push(this.rightSash.addListener2("end",function(){return s.onRightSashDragEnd()})),this.toDispose.push(this.rightSash.addListener2("reset",function(){return s.onRightSashReset()})),this.rightSash.hide(),this.silos[p.Position.RIGHT]=r.$(t).div({"class":"one-editor-silo editor-right monaco-editor-background"});var o=!!this.configurationService.getConfiguration().workbench.editor.showTabs;p.POSITIONS.forEach(function(t){var e=s.silos[t],n=r.$(e).div({"class":"container"}),h=s.instantiationService.createChild(new _.ServiceCollection([C.IKeybindingService,s.keybindingService.createScoped(n.getHTMLElement())]));n.setProperty(i.INSTANTIATION_SERVICE_KEY,h);var d=r.$(n).div({"class":"title"});o&&d.addClass("tabs"),s.hookTitleDragListener(d),s.createTitleControl(s.stacks.groupAt(t),e,d,h);var l=new a.ProgressBar(r.$(n));l.getContainer().hide(),n.setProperty(i.PROGRESS_BAR_CONTROL_KEY,l)})},i.prototype.enableDropTarget=function(t){function s(){E=void 0,a&&(a.destroy(),a=void 0),d.removeClass(t,"dragged-over")}function o(i){var t=O.EditorOptions.create({pinned:!0}),s=u.editorService.getActiveEditor();return s instanceof I.BaseTextEditor&&s.position===g.positionOfGroup(i.group)&&i.editor.matches(s.input)&&(t=O.TextEditorOptions.create({pinned:!0}),t.viewState(s.getControl().saveViewState())),t}function e(i,e,n){var r=E;d.removeClass(t,"dropfeedback"),s();var h=u.editorService,a=u.editorGroupService,T="number"==typeof n,f=1===g.groups.length?p.Position.CENTER:p.Position.RIGHT,v=W.TitleControl.getDraggedEditor();if(v){var I=i.ctrlKey&&!c.isMacintosh||i.altKey&&c.isMacintosh;if(I)T?h.openEditor(v.editor,o(v),f).then(function(){n!==f&&a.moveGroup(f,n)}).done(null,l.onUnexpectedError):h.openEditor(v.editor,o(v),e).done(null,l.onUnexpectedError);else{var P=g.positionOfGroup(v.group);T?1===v.group.count?a.moveGroup(P,n):h.openEditor(v.editor,o(v),f).then(function(){n!==f&&a.moveGroup(f,n),a.moveEditor(v.editor,g.positionOfGroup(v.group),n)}).done(null,l.onUnexpectedError):a.moveEditor(v.editor,P,e)}}else r.length&&(window.focus(),h.openEditors(r.map(function(i){return{input:{resource:i,options:{pinned:!0}},position:T?f:e}})).then(function(){T&&n!==f&&a.moveGroup(f,n),a.focusGroup(T?n:e)}).done(null,l.onUnexpectedError))}function n(i,s,o){var e,n=i.target,r=i.offsetX,h="number"==typeof a.getProperty(v),l=n.clientWidth,E=h?l/5:l/10,T=i.ctrlKey&&!c.isMacintosh||i.altKey&&c.isMacintosh,u=W.TitleControl.getDraggedEditor(),f=r<E,I=r+E>l;if(s===p.POSITIONS.length)e=null;else if(!T&&u&&1===u.group.count){var P=g.positionOfGroup(u.group);switch(P){case p.Position.LEFT:o===p.Position.CENTER&&I&&(e=p.Position.CENTER);break;case p.Position.CENTER:o===p.Position.LEFT&&f&&(e=p.Position.LEFT);break;default:e=null}}else I?e=o===p.Position.LEFT?p.Position.CENTER:p.Position.RIGHT:f&&(e=o===p.Position.LEFT?p.Position.LEFT:p.Position.CENTER);var R="number"==typeof e;R?a.setProperty(v,e):a.removeProperty(v),R&&I?a.style({left:"50%",width:"50%"}):R&&f?a.style({width:"50%"}):a.style({left:"0",width:"100%"}),a.style({opacity:1}),d.addClass(t,"dragged-over")}function h(t){if(!a){var o=u.visibleEditors.filter(function(i){return!!i}).map(function(i){return i.getContainer()});o.forEach(function(h,l){if(h&&d.isAncestor(t,h.getHTMLElement())){var E=!!u.configurationService.getConfiguration().workbench.editor.showTabs;a=r.$("div").style({top:E?i.EDITOR_TITLE_HEIGHT+"px":0,height:E?"calc(100% - "+i.EDITOR_TITLE_HEIGHT+"px":"100%"}).id(f),a.appendTo(h),a.on(d.EventType.DROP,function(i){d.EventHelper.stop(i,!0),e(i,l,a.getProperty(v))}),a.on(d.EventType.DRAG_OVER,function(i){n(i,o.length,l)}),a.on([d.EventType.DRAG_LEAVE,d.EventType.DRAG_END],function(){s()}),a.once(d.EventType.MOUSE_OVER,function(){setTimeout(function(){s()},100)})}})}}var a,E,T=this,u=this,f="monaco-workbench-editor-drop-overlay",v="splitToPosition",g=this.editorGroupService.getStacksModel();this.toDispose.push(d.addDisposableListener(t,d.EventType.DROP,function(i){i.target===t?(d.EventHelper.stop(i,!0),e(i,p.Position.LEFT)):d.removeClass(t,"dropfeedback")})),this.toDispose.push(d.addDisposableListener(t,d.EventType.DRAG_OVER,function(i){if(E||(E=b.extractResources(i).filter(function(i){return"file"===i.scheme||"untitled"===i.scheme})),E.length||W.TitleControl.getDraggedEditor()){i.target===t&&d.addClass(t,"dropfeedback");var o=i.target;o&&(a&&o.id!==f&&s(),h(o),a&&d.removeClass(t,"dropfeedback"))}})),this.toDispose.push(d.addDisposableListener(t,d.EventType.DRAG_LEAVE,function(i){d.removeClass(t,"dropfeedback")})),[t,window].forEach(function(i){T.toDispose.push(d.addDisposableListener(i,d.EventType.DRAG_END,function(i){d.removeClass(t,"dropfeedback"),s()}))})},i.prototype.createTitleControl=function(t,s,o,e){var n=!!this.configurationService.getConfiguration().workbench.editor.showTabs,r=e.createInstance(n?y.TabsTitleControl:D.NoTabsTitleControl);r.create(o.getHTMLElement()),r.setContext(t),r.refresh(!0),s.child().setProperty(i.TITLE_AREA_CONTROL_KEY,r)},i.prototype.findPosition=function(i){for(var t=i.parentElement;t;){for(var s=0;s<p.POSITIONS.length;s++){var o=p.POSITIONS[s];if(this.silos[o].getHTMLElement()===t)return o}t=t.parentElement}return null},i.prototype.hookTitleDragListener=function(t){var s=this,o=!1;t.on(d.EventType.MOUSE_DOWN,function(n){var h=s.findPosition(t.getHTMLElement()),a=s.getTitleAreaControl(h);if(a.allowDragging(n.target||n.srcElement)&&(o=!1,a.setDragged(!1),!(s.getVisibleEditorCount()<=1)&&0===n.button)){d.EventHelper.stop(n);var l=r.$("div").style({top:i.EDITOR_TITLE_HEIGHT+"px",height:"100%"}).id("monaco-workbench-editor-move-overlay");l.appendTo(s.parent),s.dragging=!0;var E=s.getVisibleEditorCount(),c=new e.StandardMouseEvent(n),T=c.posx,u=null;s.silos[h].addClass("drag"),s.parent.addClass("drag");var f=r.$(window);f.on(d.EventType.MOUSE_MOVE,function(i){d.EventHelper.stop(i,!1);var t=new e.StandardMouseEvent(i),n=t.posx-T,r=null;switch(Math.abs(n)>5&&(o=!0),h){case p.Position.LEFT:r=Math.max(-1,Math.min(n,s.dimension.width-s.siloWidths[p.Position.LEFT]));break;case p.Position.CENTER:r=2===E?Math.min(s.siloWidths[p.Position.LEFT],Math.max(-1,s.siloWidths[p.Position.LEFT]+n)):Math.min(s.dimension.width-s.siloWidths[p.Position.CENTER],Math.max(-1,s.siloWidths[p.Position.LEFT]+n));break;case p.Position.RIGHT:r=Math.min(s.siloWidths[p.Position.LEFT]+s.siloWidths[p.Position.CENTER],Math.max(-1,s.siloWidths[p.Position.LEFT]+s.siloWidths[p.Position.CENTER]+n))}if(u!==r){u=r;var a=s.findMoveTarget(h,n);switch(h){case p.Position.LEFT:a===p.Position.LEFT||null===a?(s.silos[p.Position.CENTER].style({left:s.siloWidths[p.Position.LEFT]+"px",right:"auto",borderLeftWidth:"1px"}),s.silos[p.Position.RIGHT].style({left:"auto",right:0})):a===p.Position.CENTER?(s.silos[p.Position.CENTER].style({left:0,right:"auto",borderLeftWidth:0}),s.silos[p.Position.CENTER].addClass("draggedunder"),s.silos[p.Position.RIGHT].style({left:"auto",right:0})):a===p.Position.RIGHT&&(s.silos[p.Position.CENTER].style({left:0,right:"auto"}),s.silos[p.Position.RIGHT].style({left:"auto",right:s.siloWidths[p.Position.LEFT]+"px"}),s.silos[p.Position.RIGHT].addClass("draggedunder"));break;case p.Position.CENTER:a===p.Position.LEFT?(s.silos[p.Position.LEFT].style({left:s.siloWidths[p.Position.CENTER]+"px",right:"auto"}),s.silos[p.Position.LEFT].addClass("draggedunder")):a===p.Position.CENTER||null===a?(s.silos[p.Position.LEFT].style({left:0,right:"auto"}),s.silos[p.Position.RIGHT].style({left:"auto",right:0})):a===p.Position.RIGHT&&(s.silos[p.Position.RIGHT].style({left:"auto",right:s.siloWidths[p.Position.CENTER]+"px"}),s.silos[p.Position.RIGHT].addClass("draggedunder"),s.silos[p.Position.LEFT].style({left:0,right:"auto"}));break;case p.Position.RIGHT:a===p.Position.LEFT?(s.silos[p.Position.LEFT].style({left:s.siloWidths[p.Position.RIGHT]+"px",right:"auto"}),s.silos[p.Position.LEFT].addClass("draggedunder")):a===p.Position.CENTER?(s.silos[p.Position.LEFT].style({left:0,right:"auto"}),s.silos[p.Position.CENTER].style({left:s.siloWidths[p.Position.LEFT]+s.siloWidths[p.Position.RIGHT]+"px",right:"auto"}),s.silos[p.Position.CENTER].addClass("draggedunder")):a!==p.Position.RIGHT&&null!==a||(s.silos[p.Position.LEFT].style({left:0,right:"auto"}),s.silos[p.Position.CENTER].style({left:s.siloWidths[p.Position.LEFT]+"px",right:"auto"}))}null!==r&&(s.silos[h].style({left:r+"px"}),s.silos[h].addClass("dragging"),s.parent.addClass("dragging"))}}).once(d.EventType.MOUSE_UP,function(i){d.EventHelper.stop(i,!1),l.destroy(),s.dragging=!1,o&&a.setDragged(!0),s.parent.removeClass("drag"),s.silos[h].removeClass("drag"),s.parent.removeClass("dragging"),s.silos[h].removeClass("dragging"),p.POSITIONS.forEach(function(i){return s.silos[i].removeClass("draggedunder")}),s.silos[p.Position.LEFT].style({left:0,right:"auto"}),s.silos[p.Position.CENTER].style({left:"auto",right:"auto",borderLeftWidth:"1px"}),s.silos[p.Position.RIGHT].style({left:"auto",right:0,borderLeftWidth:"1px"});var t=new e.StandardMouseEvent(i),n=t.posx-T,r=s.findMoveTarget(h,n);null!==r?s.editorGroupService.moveGroup(h,r):s.layoutContainers(),o||h===s.getActivePosition()||s.editorGroupService.focusGroup(h),f.off("mousemove")})}})},i.prototype.findMoveTarget=function(i,t){var s=this.getVisibleEditorCount();switch(i){case p.Position.LEFT:if(2===s&&(t>=this.siloWidths[p.Position.LEFT]/2||t>=this.siloWidths[p.Position.CENTER]/2))return p.Position.CENTER;if(3===s&&(t>=this.siloWidths[p.Position.LEFT]/2+this.siloWidths[p.Position.CENTER]||t>=this.siloWidths[p.Position.RIGHT]/2+this.siloWidths[p.Position.CENTER]))return p.Position.RIGHT;if(3===s&&(t>=this.siloWidths[p.Position.LEFT]/2||t>=this.siloWidths[p.Position.CENTER]/2))return p.Position.CENTER;break;case p.Position.CENTER:if(2===s&&t>0)return null;if(2===s&&(Math.abs(t)>=this.siloWidths[p.Position.CENTER]/2||Math.abs(t)>=this.siloWidths[p.Position.LEFT]/2))return p.Position.LEFT;if(3===s&&(t<0&&Math.abs(t)>=this.siloWidths[p.Position.CENTER]/2||t<0&&Math.abs(t)>=this.siloWidths[p.Position.LEFT]/2))return p.Position.LEFT;if(3===s&&(t>0&&Math.abs(t)>=this.siloWidths[p.Position.CENTER]/2||t>0&&Math.abs(t)>=this.siloWidths[p.Position.RIGHT]/2))return p.Position.RIGHT;break;case p.Position.RIGHT:if(t>0)return null;if(Math.abs(t)>=this.siloWidths[p.Position.RIGHT]/2+this.siloWidths[p.Position.CENTER]||Math.abs(t)>=this.siloWidths[p.Position.LEFT]/2+this.siloWidths[p.Position.CENTER])return p.Position.LEFT;if(Math.abs(t)>=this.siloWidths[p.Position.RIGHT]/2||Math.abs(t)>=this.siloWidths[p.Position.CENTER]/2)return p.Position.CENTER}return null},i.prototype.centerSash=function(i,t){var s=this.siloWidths[i]+this.siloWidths[t],o=s/2;this.siloWidths[i]=o,this.siloWidths[t]=s-o,this.layoutContainers()},i.prototype.onLeftSashDragStart=function(){this.startLeftContainerWidth=this.siloWidths[p.Position.LEFT]},i.prototype.onLeftSashDrag=function(t){var s=this.siloWidths[p.Position.LEFT],o=this.startLeftContainerWidth+t.currentX-t.startX;this.rightSash.isHidden()?(o<i.MIN_EDITOR_WIDTH?o=i.MIN_EDITOR_WIDTH:this.dimension.width-o<i.MIN_EDITOR_WIDTH?o=this.dimension.width-i.MIN_EDITOR_WIDTH:o-i.SNAP_TO_MINIMIZED_THRESHOLD<=i.MIN_EDITOR_WIDTH?o=i.MIN_EDITOR_WIDTH:this.dimension.width-o-i.SNAP_TO_MINIMIZED_THRESHOLD<=i.MIN_EDITOR_WIDTH&&(o=this.dimension.width-i.MIN_EDITOR_WIDTH),this.siloWidths[p.Position.LEFT]=o,this.siloWidths[p.Position.CENTER]=this.dimension.width-o):(o<i.MIN_EDITOR_WIDTH?o=i.MIN_EDITOR_WIDTH:this.dimension.width-o-this.siloWidths[p.Position.RIGHT]<i.MIN_EDITOR_WIDTH?(this.dimension.width-o-this.siloWidths[p.Position.CENTER]<i.MIN_EDITOR_WIDTH?(o=this.dimension.width-2*i.MIN_EDITOR_WIDTH,this.siloWidths[p.Position.CENTER]=this.siloWidths[p.Position.RIGHT]=i.MIN_EDITOR_WIDTH):this.dimension.width-o-this.siloWidths[p.Position.CENTER]-i.SNAP_TO_MINIMIZED_THRESHOLD<=i.MIN_EDITOR_WIDTH?this.siloWidths[p.Position.RIGHT]=i.MIN_EDITOR_WIDTH:this.siloWidths[p.Position.RIGHT]=this.siloWidths[p.Position.RIGHT]-(o-s),this.rightSash.layout()):o-i.SNAP_TO_MINIMIZED_THRESHOLD<=i.MIN_EDITOR_WIDTH?o=i.MIN_EDITOR_WIDTH:this.dimension.width-this.siloWidths[p.Position.RIGHT]-o-i.SNAP_TO_MINIMIZED_THRESHOLD<=i.MIN_EDITOR_WIDTH&&(o=this.dimension.width-this.siloWidths[p.Position.RIGHT]-i.MIN_EDITOR_WIDTH),this.siloWidths[p.Position.LEFT]=o,this.siloWidths[p.Position.CENTER]=this.dimension.width-this.siloWidths[p.Position.LEFT]-this.siloWidths[p.Position.RIGHT]),this.layoutContainers()},i.prototype.onLeftSashDragEnd=function(){this.leftSash.layout(),this.rightSash.layout(),this.focusNextNonMinimized()},i.prototype.onLeftSashReset=function(){this.centerSash(p.Position.LEFT,p.Position.CENTER),this.leftSash.layout()},i.prototype.onRightSashDragStart=function(){this.startRightContainerWidth=this.siloWidths[p.Position.RIGHT]},i.prototype.onRightSashDrag=function(t){var s=this.siloWidths[p.Position.RIGHT],o=this.startRightContainerWidth-t.currentX+t.startX;o<i.MIN_EDITOR_WIDTH?o=i.MIN_EDITOR_WIDTH:this.dimension.width-o-this.siloWidths[p.Position.LEFT]<i.MIN_EDITOR_WIDTH?(this.dimension.width-o-this.siloWidths[p.Position.CENTER]<i.MIN_EDITOR_WIDTH?(o=this.dimension.width-2*i.MIN_EDITOR_WIDTH,this.siloWidths[p.Position.LEFT]=this.siloWidths[p.Position.CENTER]=i.MIN_EDITOR_WIDTH):this.dimension.width-o-this.siloWidths[p.Position.CENTER]-i.SNAP_TO_MINIMIZED_THRESHOLD<=i.MIN_EDITOR_WIDTH?this.siloWidths[p.Position.LEFT]=i.MIN_EDITOR_WIDTH:this.siloWidths[p.Position.LEFT]=this.siloWidths[p.Position.LEFT]-(o-s),this.leftSash.layout()):o-i.SNAP_TO_MINIMIZED_THRESHOLD<=i.MIN_EDITOR_WIDTH?o=i.MIN_EDITOR_WIDTH:this.dimension.width-this.siloWidths[p.Position.LEFT]-o-i.SNAP_TO_MINIMIZED_THRESHOLD<=i.MIN_EDITOR_WIDTH&&(o=this.dimension.width-this.siloWidths[p.Position.LEFT]-i.MIN_EDITOR_WIDTH),this.siloWidths[p.Position.RIGHT]=o,this.siloWidths[p.Position.CENTER]=this.dimension.width-this.siloWidths[p.Position.LEFT]-this.siloWidths[p.Position.RIGHT],this.layoutContainers()},i.prototype.onRightSashDragEnd=function(){this.leftSash.layout(),this.rightSash.layout(),this.focusNextNonMinimized()},i.prototype.onRightSashReset=function(){this.centerSash(p.Position.CENTER,p.Position.RIGHT),this.rightSash.layout()},i.prototype.getVerticalSashTop=function(i){return 0},i.prototype.getVerticalSashLeft=function(i){return i===this.leftSash?this.siloWidths[p.Position.LEFT]:this.siloWidths[p.Position.CENTER]+this.siloWidths[p.Position.LEFT]},i.prototype.getVerticalSashHeight=function(i){return this.dimension.height},i.prototype.isDragging=function(){return this.dragging},i.prototype.layout=function(i){i instanceof r.Dimension?this.layoutControl(i):this.layoutEditor(i)},i.prototype.layoutControl=function(t){var s=this,o=this.dimension;this.dimension=t,o&&o.width&&o.height||(o=t);var e=0;if(p.POSITIONS.forEach(function(t){if(s.visibleEditors[t]){if(s.siloWidths[t]!==i.MIN_EDITOR_WIDTH){var r=void 0;s.siloInitialRatios&&n.isNumber(s.siloInitialRatios[t])?(r=s.siloInitialRatios[t],delete s.siloInitialRatios[t]):r=s.siloWidths[t]/o.width,s.siloWidths[t]=Math.max(Math.round(s.dimension.width*r),i.MIN_EDITOR_WIDTH)}e+=s.siloWidths[t]}}),e>0){var r=e-this.dimension.width;if(r<0){var h=null;p.POSITIONS.forEach(function(t){s.visibleEditors[t]&&null===h&&s.siloWidths[t]!==i.MIN_EDITOR_WIDTH&&(h=t)}),null===h&&(h=p.Position.LEFT),this.siloWidths[h]-=r}else r>0&&p.POSITIONS.forEach(function(t){var o=s.siloWidths[t]-i.MIN_EDITOR_WIDTH;if(o>=r)s.siloWidths[t]-=r,r=0;else if(o>0){var e=r-o;s.siloWidths[t]-=e,r-=e}})}this.leftSash.layout(),this.rightSash.layout(),this.layoutContainers()},i.prototype.layoutContainers=function(){var i=this;p.POSITIONS.forEach(function(t){i.silos[t].size(i.siloWidths[t],i.dimension.height)}),this.visibleEditors[p.Position.RIGHT]?this.silos[p.Position.CENTER].position(null,this.siloWidths[p.Position.RIGHT]):this.silos[p.Position.CENTER].position(null,this.dimension.width-this.siloWidths[p.Position.LEFT]-this.siloWidths[p.Position.CENTER]),p.POSITIONS.forEach(function(t){i.visibleEditors[t]&&i.silos[t].isHidden()?i.silos[t].show():i.visibleEditors[t]||i.silos[t].isHidden()||i.silos[t].hide()}),p.POSITIONS.forEach(function(t){i.layoutEditor(t)}),p.POSITIONS.forEach(function(t){i.getTitleAreaControl(t).layout()})},i.prototype.layoutEditor=function(t){var s=this.siloWidths[t];s&&this.visibleEditors[t]&&this.visibleEditors[t].layout(new r.Dimension(s,this.dimension.height-i.EDITOR_TITLE_HEIGHT))},i.prototype.getInstantiationService=function(t){return this.getFromContainer(t,i.INSTANTIATION_SERVICE_KEY)},i.prototype.getProgressBar=function(t){return this.getFromContainer(t,i.PROGRESS_BAR_CONTROL_KEY)},i.prototype.getTitleAreaControl=function(t){return this.getFromContainer(t,i.TITLE_AREA_CONTROL_KEY)},i.prototype.getFromContainer=function(i,t){return this.silos[i].child().getProperty(t)},i.prototype.updateProgress=function(i,t){switch(t){case L.INFINITE:this.getProgressBar(i).infinite().getContainer().show();break;case L.DONE:this.getProgressBar(i).done().getContainer().hide();break;case L.STOP:this.getProgressBar(i).stop().getContainer().hide()}},i.prototype.dispose=function(){var i=this;m.dispose(this.toDispose),p.POSITIONS.forEach(function(t){i.clearPosition(t)}),p.POSITIONS.forEach(function(t){i.getTitleAreaControl(t).dispose(),i.getProgressBar(t).dispose()}),this.leftSash.dispose(),this.rightSash.dispose(),this.silos.forEach(function(i){i.destroy()}),this.lastActiveEditor=null,this.lastActivePosition=null,this.visibleEditors=null,this._onGroupFocusChanged.dispose()},i.TITLE_AREA_CONTROL_KEY="__titleAreaControl",i.PROGRESS_BAR_CONTROL_KEY="__progressBar",i.INSTANTIATION_SERVICE_KEY="__instantiationService",i.MIN_EDITOR_WIDTH=170,i.EDITOR_TITLE_HEIGHT=35,i.SNAP_TO_MINIMIZED_THRESHOLD=50,i=__decorate([__param(1,T.IWorkbenchEditorService),__param(2,f.IEditorGroupService),__param(3,g.IMessageService),__param(4,P.ITelemetryService),__param(5,u.IContextMenuService),__param(6,v.IEventService),__param(7,R.IConfigurationService),__param(8,C.IKeybindingService),__param(9,N.IExtensionService),__param(10,S.IInstantiationService)],i)}();t.SideBySideEditorControl=M});