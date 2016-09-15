var __decorate=this&&this.__decorate||function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s},__param=this&&this.__param||function(e,t){return function(i,n){t(i,n,e)}};define(["require","exports","vs/base/common/errors","vs/nls","vs/base/common/mime","vs/base/common/uri","vs/base/common/paths","vs/base/common/arrays","vs/workbench/common/editor/diffEditorInput","vs/platform/editor/common/editor","vs/workbench/parts/files/common/files","vs/platform/files/common/files","vs/workbench/parts/files/common/editors/fileEditorInput","vs/workbench/parts/files/common/editors/textFileEditorModel","vs/workbench/common/events","vs/workbench/services/group/common/groupService","vs/workbench/services/untitled/common/untitledEditorService","vs/workbench/services/editor/common/editorService","vs/workbench/services/activity/common/activityService","vs/platform/event/common/event","vs/platform/instantiation/common/instantiation","vs/base/common/lifecycle","vs/workbench/services/history/common/history"],function(e,t,i,n,o,r,s,c,a,d,u,p,v,f,h,l,E,g,y,m,S,D,I){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var F=function(){function e(e,t,i,n,o,r,s,c){this.eventService=e,this.editorService=t,this.activityService=i,this.textFileService=n,this.historyService=o,this.editorGroupService=r,this.instantiationService=s,this.untitledEditorService=c,this.toUnbind=[],this.stacks=r.getStacksModel(),this.pendingDirtyResources=[],this.registerListeners()}return e.prototype.getId=function(){return"vs.files.filetracker"},e.prototype.registerListeners=function(){var e=this;this.toUnbind.push(this.editorGroupService.onEditorsChanged(function(){return e.onEditorsChanged()})),this.toUnbind.push(this.eventService.addListener2(h.EventType.UNTITLED_FILE_SAVED,function(t){return e.onUntitledEditorSaved(t)})),this.toUnbind.push(this.eventService.addListener2(h.EventType.UNTITLED_FILE_DIRTY,function(t){return e.onUntitledEditorDirty(t)})),this.toUnbind.push(this.eventService.addListener2(u.EventType.FILE_DIRTY,function(t){return e.onTextFileDirty(t)})),this.toUnbind.push(this.eventService.addListener2(u.EventType.FILE_SAVE_ERROR,function(t){return e.onTextFileSaveError(t)})),this.toUnbind.push(this.eventService.addListener2(u.EventType.FILE_SAVED,function(t){return e.onTextFileSaved(t)})),this.toUnbind.push(this.eventService.addListener2(u.EventType.FILE_REVERTED,function(t){return e.onTextFileReverted(t)})),this.toUnbind.push(this.eventService.addListener2("files.internal:fileChanged",function(t){return e.onLocalFileChange(t)})),this.toUnbind.push(this.eventService.addListener2(p.EventType.FILE_CHANGES,function(t){return e.onFileChanges(t)}))},e.prototype.onEditorsChanged=function(){this.disposeUnusedTextFileModels()},e.prototype.onTextFileDirty=function(e){var t=this;this.textFileService.getAutoSaveMode()!==u.AutoSaveMode.AFTER_SHORT_DELAY&&this.updateActivityBadge(),this.pendingDirtyResources.push(e.resource),this.pendingDirtyHandle||(this.pendingDirtyHandle=setTimeout(function(){return t.doOpenDirtyResources()},250))},e.prototype.doOpenDirtyResources=function(){var e=this,t=c.distinct(this.pendingDirtyResources.filter(function(t){return!e.stacks.isOpen(t)&&e.textFileService.isDirty(t)}),function(e){return e.toString()});this.pendingDirtyHandle=void 0,this.pendingDirtyResources=[];var n=this.editorService.getActiveEditor(),o=n?n.position:d.Position.LEFT;this.editorService.openEditors(t.map(function(e){return{input:{resource:e,options:{inactive:!0,pinned:!0,preserveFocus:!0}},position:o}})).done(null,i.onUnexpectedError)},e.prototype.onTextFileSaveError=function(e){this.updateActivityBadge()},e.prototype.onTextFileSaved=function(e){this.lastDirtyCount>0&&this.updateActivityBadge()},e.prototype.onTextFileReverted=function(e){this.lastDirtyCount>0&&this.updateActivityBadge()},e.prototype.onUntitledEditorDirty=function(e){this.updateActivityBadge()},e.prototype.onUntitledEditorSaved=function(e){this.lastDirtyCount>0&&this.updateActivityBadge()},e.prototype.updateActivityBadge=function(){var e=this.textFileService.getDirty().length;this.lastDirtyCount=e,e>0?this.activityService.showActivity(u.VIEWLET_ID,new y.NumberBadge(e,function(t){return n.localize("dirtyFiles","{0} unsaved files",e)}),"explorer-viewlet-label"):this.activityService.clearActivity(u.VIEWLET_ID)},e.prototype.onLocalFileChange=function(e){if(e.gotMoved()){var t=e.getBefore(),i=e.getAfter();this.handleMovedFileInVisibleEditors(t?t.resource:null,i?i.resource:null,i?i.mime:null)}var n=e.getBefore();(e.gotMoved()||e.gotDeleted())&&this.handleDelete(n.resource)},e.prototype.onFileChanges=function(t){var n=this,o=t.getDeleted();o&&o.length>0&&o.forEach(function(e){n.handleDelete(e.resource)}),t.getUpdated().map(function(e){return f.CACHE.get(e.resource)}).filter(function(t){var i=n.canDispose(t);return!!i&&!(Date.now()-t.getLastDirtyTime()<e.FILE_CHANGE_UPDATE_DELAY)}).forEach(function(e){return f.CACHE.dispose(e.getResource())});var r=this.editorService.getVisibleEditors();r.forEach(function(o){var r=o.input;if(r instanceof a.DiffEditorInput&&(r=n.getMatchingFileEditorInputFromDiff(r,t)),r instanceof v.FileEditorInput){var s=r,c=s.getResource();if(t.contains(c,p.FileChangeType.UPDATED)||t.contains(c,p.FileChangeType.ADDED)){var d=f.CACHE.get(c);if(d){var h=d.getState();if(h===u.ModelState.SAVED){var l=d.getLastDirtyTime();if(Date.now()-l>e.FILE_CHANGE_UPDATE_DELAY){var E=o.getControl(),g=E.saveViewState(),y=d.getLastModifiedTime();d.load().done(function(){d.getLastModifiedTime()!==y&&n.isEditorShowingPath(o,d.getResource())&&E.restoreViewState(g)},i.onUnexpectedError)}}}else o.getId()===u.BINARY_FILE_EDITOR_ID&&n.editorService.openEditor(o.input,{forceOpen:!0,preserveFocus:!0},o.position).done(null,i.onUnexpectedError)}}})},e.prototype.isEditorShowingPath=function(e,t){if(!e.isVisible())return!1;var i=e.getInput();return!!i&&(i instanceof a.DiffEditorInput&&(i=i.modifiedInput),i instanceof v.FileEditorInput&&i.getResource().toString()===t.toString())},e.prototype.handleMovedFileInVisibleEditors=function(e,t,n){var c=this,d=this.editorGroupService.getStacksModel(),u=this.editorService.getVisibleEditors();u.forEach(function(u){var p=d.groupAt(u.position),f=u.input;f instanceof a.DiffEditorInput&&(f=f.modifiedInput);var h;if(f instanceof v.FileEditorInput&&(h=f.getResource()),h){var l=!1;if(s.isEqualOrParent(h.fsPath,e.fsPath)&&(l=!0),l){var E=void 0;if(e.toString()===h.toString())E=t;else{var g=h.fsPath.indexOf(e.fsPath);E=r["default"].file(s.join(t.fsPath,h.fsPath.substr(g+e.fsPath.length+1)))}if(f instanceof v.FileEditorInput){var y=c.instantiationService.createInstance(v.FileEditorInput,E,n||o.MIME_UNKNOWN,void 0);c.editorService.openEditor(y,{preserveFocus:!0,pinned:p.isPinned(f),index:p.indexOf(f)},u.position).done(null,i.onUnexpectedError)}}}})},e.prototype.getMatchingFileEditorInputFromDiff=function(e,t){var i=e.modifiedInput,n=this.getMatchingFileEditorInputFromInput(i,t);return n?n:this.getMatchingFileEditorInputFromInput(e.originalInput,t)},e.prototype.getMatchingFileEditorInputFromInput=function(e,t){if(e instanceof v.FileEditorInput)if(t instanceof r["default"]){var i=t;if(this.containsResource(e,i))return e}else{var n=t;if(n.contains(e.getResource(),p.FileChangeType.UPDATED))return e}return null},e.prototype.handleDelete=function(e){var t=this;if(!this.textFileService.isDirty(e)){var i=v.FileEditorInput.getAll(e),n=this.historyService.getHistory();this.stacks.groups.forEach(function(e){return n.push.apply(n,e.getEditors())}),n.forEach(function(n){n instanceof a.DiffEditorInput?(n=t.getMatchingFileEditorInputFromDiff(n,e),n instanceof v.FileEditorInput&&i.push(n)):n instanceof v.FileEditorInput&&t.containsResource(n,e)&&i.push(n)}),i.forEach(function(e){e.isDirty()||(t.historyService.remove(e),e.isDisposed()||e.dispose())}),f.CACHE.dispose(e)}},e.prototype.containsResource=function(e,t){var i;return e instanceof v.FileEditorInput&&(i=e.getResource()),!!s.isEqualOrParent(i.fsPath,t.fsPath)},e.prototype.disposeUnusedTextFileModels=function(){var e=this;f.CACHE.getAll().filter(function(t){return!e.stacks.isOpen(t.getResource())&&e.canDispose(t)}).forEach(function(e){return f.CACHE.dispose(e.getResource())})},e.prototype.canDispose=function(e){return!!e&&(!e.isDisposed()&&((!e.textEditorModel||!e.textEditorModel.isAttachedToEditor())&&e.getState()===u.ModelState.SAVED))},e.prototype.dispose=function(){D.dispose(this.toUnbind)},e.FILE_CHANGE_UPDATE_DELAY=2e3,e=__decorate([__param(0,m.IEventService),__param(1,g.IWorkbenchEditorService),__param(2,y.IActivityService),__param(3,u.ITextFileService),__param(4,I.IHistoryService),__param(5,l.IEditorGroupService),__param(6,S.IInstantiationService),__param(7,E.IUntitledEditorService)],e)}();t.FileTracker=F});