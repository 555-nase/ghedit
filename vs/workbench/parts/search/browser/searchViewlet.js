/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function s(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(s.prototype=t.prototype,new s)},__decorate=this&&this.__decorate||function(e,t,s,i){var n,r=arguments.length,o=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,s,o):n(t,s))||o);return r>3&&o&&Object.defineProperty(t,s,o),o},__param=this&&this.__param||function(e,t){return function(s,i){t(s,i,e)}};define(["require","exports","vs/nls","vs/base/common/winjs.base","vs/editor/common/editorCommon","vs/base/common/lifecycle","vs/base/common/errors","vs/base/browser/ui/aria/aria","vs/base/common/types","vs/base/common/strings","vs/base/browser/dom","vs/base/browser/keyboardEvent","vs/base/browser/builder","vs/base/browser/ui/findinput/findInput","vs/base/parts/tree/browser/treeImpl","vs/workbench/common/memento","vs/workbench/browser/actions/openSettings","vs/workbench/common/events","vs/workbench/services/group/common/groupService","vs/workbench/common/editor","vs/platform/files/common/files","vs/workbench/browser/viewlet","vs/workbench/parts/search/common/searchModel","vs/workbench/parts/search/common/searchQuery","vs/workbench/parts/search/common/constants","vs/base/browser/ui/inputbox/inputBox","vs/workbench/services/editor/common/editorService","vs/platform/storage/common/storage","vs/platform/configuration/common/configuration","vs/platform/contextview/browser/contextView","vs/platform/event/common/event","vs/platform/instantiation/common/instantiation","vs/platform/message/common/message","vs/platform/search/common/search","vs/platform/progress/common/progress","vs/platform/workspace/common/workspace","vs/platform/keybinding/common/keybinding","vs/platform/telemetry/common/telemetry","vs/base/common/keyCodes","vs/workbench/parts/search/browser/patternInputWidget","vs/workbench/parts/search/browser/searchResultsView","vs/workbench/parts/search/browser/searchWidget","vs/workbench/parts/search/browser/searchActions","vs/workbench/parts/search/common/replace","vs/base/common/severity","vs/css!./media/searchviewlet"],function(e,t,s,i,n,r,o,a,c,l,h,u,d,p,v,g,f,m,S,y,w,b,E,R,C,x,P,I,W,M,_,T,A,F,L,O,k,V,U,G,z,q,K,N,D){"use strict";var H=function(e){function t(t,s,i,n,r,o,a,c,l,h,u,d,p,v){var f=this;e.call(this,C.VIEWLET_ID,t),this.eventService=s,this.editorService=i,this.editorGroupService=n,this.progressService=r,this.messageService=o,this.storageService=a,this.contextViewService=c,this.instantiationService=l,this.configurationService=h,this.contextService=u,this.searchService=d,this.keybindingService=p,this.replaceService=v,this.toDispose=[],this.viewletVisible=p.createKey("searchViewletVisible",!0),this.callOnModelChange=[],this.queryBuilder=this.instantiationService.createInstance(R.QueryBuilder),this.viewletSettings=this.getMemento(a,g.Scope.WORKSPACE),this.toUnbind.push(this.eventService.addListener2(w.EventType.FILE_CHANGES,function(e){return f.onFilesChanged(e)})),this.toUnbind.push(this.eventService.addListener2(m.EventType.UNTITLED_FILE_SAVED,function(e){return f.onUntitledFileSaved(e)})),this.toUnbind.push(this.configurationService.onDidUpdateConfiguration(function(e){return f.onConfigurationUpdated(e.config)}))}return __extends(t,e),t.prototype.onConfigurationUpdated=function(e){this.updateGlobalPatternExclusions(e)},t.prototype.create=function(t){var n=this;e.prototype.create.call(this,t),this.viewModel=this.instantiationService.createInstance(E.SearchModel);var r;this.domNode=t.div({"class":"search-viewlet"},function(e){r=e}),r.div({"class":["search-widgets-container"]},function(e){n.searchWidgetsContainer=e}),this.createSearchWidget(this.searchWidgetsContainer);var o=this.viewletSettings["query.filePatterns"]||"",a=this.viewletSettings["query.folderExclusions"]||"",c=this.viewletSettings["query.exclusionsUsePattern"],l=this.viewletSettings["query.includesUsePattern"],v=this.viewletSettings["query.folderIncludes"]||"",g=function(e){e.keyCode===U.KeyCode.Enter?n.onQueryChanged(!0):e.keyCode===U.KeyCode.Escape&&n.cancelSearch()};this.queryDetails=this.searchWidgetsContainer.div({"class":["query-details"]},function(e){e.div({"class":"more",tabindex:0,role:"button",title:s.localize("moreSearch","Toggle Search Details")}).on(h.EventType.CLICK,function(e){h.EventHelper.stop(e),n.toggleFileTypes(!0)}).on(h.EventType.KEY_UP,function(e){var t=new u.StandardKeyboardEvent(e);(t.equals(U.CommonKeybindings.ENTER)||t.equals(U.CommonKeybindings.SPACE))&&(h.EventHelper.stop(e),n.toggleFileTypes())}),e.div({"class":"file-types"},function(e){var t=s.localize("searchScope.includes","files to include");e.element("h4",{text:t}),n.inputPatternIncludes=new G.PatternInputWidget(e.getContainer(),n.contextViewService,{ariaLabel:s.localize("label.includes","Search Include Patterns")}),n.inputPatternIncludes.setIsGlobPattern(l),n.inputPatternIncludes.setValue(v),n.inputPatternIncludes.on(h.EventType.KEY_UP,g).on(h.EventType.KEY_DOWN,function(e){var t=new u.StandardKeyboardEvent(e);t.equals(U.CommonKeybindings.UP_ARROW)?(h.EventHelper.stop(e),n.searchWidget.focus(!0,!0)):t.equals(U.CommonKeybindings.DOWN_ARROW)&&(h.EventHelper.stop(e),n.inputPatternExclusions.focus(),n.inputPatternExclusions.select())}).on(p.FindInput.OPTION_CHANGE,function(e){n.onQueryChanged(!1)}),n.inputPatternIncludes.onSubmit(function(){return n.onQueryChanged(!0)})}),e.div({"class":"file-types"},function(e){var t=s.localize("searchScope.excludes","files to exclude");e.element("h4",{text:t}),n.inputPatternExclusions=new G.PatternInputWidget(e.getContainer(),n.contextViewService,{ariaLabel:s.localize("label.excludes","Search Exclude Patterns")}),n.inputPatternExclusions.setIsGlobPattern(c),n.inputPatternExclusions.setValue(a),n.inputPatternExclusions.on(h.EventType.KEY_UP,g).on(h.EventType.KEY_DOWN,function(e){var t=new u.StandardKeyboardEvent(e);t.equals(U.CommonKeybindings.UP_ARROW)?(h.EventHelper.stop(e),n.inputPatternIncludes.focus(),n.inputPatternIncludes.select()):t.equals(U.CommonKeybindings.DOWN_ARROW)&&(h.EventHelper.stop(e),n.selectTreeIfNotSelected())}).on(p.FindInput.OPTION_CHANGE,function(e){n.onQueryChanged(!1)}),n.inputPatternExclusions.onSubmit(function(){return n.onQueryChanged(!0)})}),n.inputPatternGlobalExclusionsContainer=e.div({"class":"file-types global-exclude disabled"},function(e){var t=s.localize("global.searchScope.folders","files excluded through settings");e.element("h4",{text:t}),n.inputPatternGlobalExclusions=new x.InputBox(e.getContainer(),n.contextViewService,{actions:[n.instantiationService.createInstance(K.ConfigureGlobalExclusionsAction)],ariaLabel:s.localize("label.global.excludes","Configured Search Exclude Patterns")}),n.inputPatternGlobalExclusions.inputElement.readOnly=!0,d.$(n.inputPatternGlobalExclusions.inputElement).attr("aria-readonly","true"),d.$(n.inputPatternGlobalExclusions.inputElement).addClass("disabled")}).hide()}).getHTMLElement(),this.messages=r.div({"class":"messages"}).hide().clone(),this.createSearchResultsView(r),this.actionRegistry={};var f=[new K.CollapseAllAction(this),new K.RefreshAction(this),new K.ClearSearchResultsAction(this)];return f.forEach(function(e){n.actionRegistry[e.id]=e}),""===o&&""===a&&""===v||this.toggleFileTypes(!0,!0,!0),this.updateGlobalPatternExclusions(this.configurationService.getConfiguration()),this.toUnbind.push(this.viewModel.searchResult.onChange(function(e){return n.onSearchResultsChanged(e)})),i.TPromise.as(null)},Object.defineProperty(t.prototype,"searchAndReplaceWidget",{get:function(){return this.searchWidget},enumerable:!0,configurable:!0}),t.prototype.createSearchWidget=function(e){var s=this,i=this.viewletSettings["query.contentPattern"]||"",n=this.viewletSettings["query.regex"]===!0,r=this.viewletSettings["query.wholeWords"]===!0,o=this.viewletSettings["query.caseSensitive"]===!0;this.searchWidget=new q.SearchWidget(e,this.contextViewService,{value:i,isRegex:n,isCaseSensitive:o,isWholeWords:r},this.keybindingService,this.instantiationService),this.storageService.getBoolean(t.SHOW_REPLACE_STORAGE_KEY,I.StorageScope.WORKSPACE,!0)&&this.searchWidget.toggleReplace(!0),this.toUnbind.push(this.searchWidget),this.toUnbind.push(this.searchWidget.onSearchSubmit(function(e){return s.onQueryChanged(e)})),this.toUnbind.push(this.searchWidget.onSearchCancel(function(){return s.cancelSearch()})),this.toUnbind.push(this.searchWidget.searchInput.onDidOptionChange(function(e){return s.onQueryChanged(!0,e)})),this.toUnbind.push(this.searchWidget.onReplaceToggled(function(){return s.onReplaceToggled()})),this.toUnbind.push(this.searchWidget.onReplaceStateChange(function(e){s.viewModel.replaceActive=e,s.tree.refresh()})),this.toUnbind.push(this.searchWidget.onReplaceValueChanged(function(e){s.viewModel.replaceString=s.searchWidget.getReplaceValue(),s.refreshInputs(),s.tree.refresh()})),this.toUnbind.push(this.searchWidget.onKeyDownArrow(function(){s.showsFileTypes()?s.toggleFileTypes(!0,s.showsFileTypes()):s.selectTreeIfNotSelected()})),this.toUnbind.push(this.searchWidget.onReplaceAll(function(){return s.replaceAll()}))},t.prototype.onReplaceToggled=function(){this.layout(this.size),this.storageService.store(t.SHOW_REPLACE_STORAGE_KEY,this.searchAndReplaceWidget.isReplaceShown(),I.StorageScope.WORKSPACE)},t.prototype.onSearchResultsChanged=function(e){var t=this;return this.refreshTree(e).then(function(){t.searchWidget.setReplaceAllActionState(!t.viewModel.searchResult.isEmpty())})},t.prototype.refreshTree=function(e){var t=this;return e?e.added||e.removed?this.tree.refresh(this.viewModel.searchResult).then(function(){e.added&&e.elements.forEach(function(e){t.autoExpandFileMatch(e,!0)})}):1===e.elements.length?this.tree.refresh(e.elements[0]):this.tree.refresh(e.elements):this.tree.refresh(this.viewModel.searchResult)},t.prototype.refreshInputs=function(){var e=this;this.viewModel.searchResult.matches().forEach(function(t){e.replaceService.refreshInput(t)})},t.prototype.replaceAll=function(){var e=this;if(0!==this.viewModel.searchResult.count()){var t=this.progressService.show(100),i=this.viewModel.searchResult.count(),n=this.viewModel.searchResult.fileCount(),r=this.searchWidget.getReplaceValue()||"",a=r?s.localize("replaceAll.message","Replaced {0} occurrences across {1} files with {2}.",i,n,r):s.localize("removeAll.message","Removed {0} occurrences across {1} files.",i,n),c={title:s.localize("replaceAll.confirmation.title","Replace All"),message:r?s.localize("replaceAll.confirmation.message","Replace {0} occurrences across {1} files with '{2}'?",i,n,r):s.localize("removeAll.confirmation.message","Remove {0} occurrences across {1} files?",i,n),primaryButton:s.localize("replaceAll.confirm.button","Replace")};this.messageService.confirm(c)&&(this.searchWidget.setReplaceAllActionState(!1),this.viewModel.searchResult.replaceAll(t).then(function(){t.done(),e.showMessage(a)},function(s){t.done(),o.isPromiseCanceledError(s),e.messageService.show(D["default"].Error,s)}))}},t.prototype.showMessage=function(e){return this.messages.empty().show().asContainer().div({"class":"message",text:e})},t.prototype.createSearchResultsView=function(e){var t=this;e.div({"class":"results"},function(e){t.results=e;var i=new z.SearchDataSource,n=t.instantiationService.createInstance(z.SearchRenderer,t.getActionRunner(),t);t.tree=new v.Tree(e.getHTMLElement(),{dataSource:i,renderer:n,sorter:new z.SearchSorter,filter:new z.SearchFilter,controller:new z.SearchController(t,t.instantiationService),accessibilityProvider:t.instantiationService.createInstance(z.SearchAccessibilityProvider)},{ariaLabel:s.localize("treeAriaLabel","Search Results")}),t.tree.setInput(t.viewModel.searchResult),t.toUnbind.push(n),t.toUnbind.push(t.tree.addListener2("selection",function(e){var s,i=e.payload&&"keyboard"===e.payload.origin;s=i?t.tree.getFocus():e.selection[0];var n=e.payload&&e.payload.originalEvent,r=e.payload&&"mouse"===e.payload.origin&&n&&2===n.detail;r&&n.preventDefault();var o=n&&(n.ctrlKey||n.metaKey),a=i&&n.keyCode===U.KeyCode.Enter||r;if(s instanceof E.Match){var c=s;t.currentSelectedFileMatch&&t.currentSelectedFileMatch.setSelectedMatch(null),t.currentSelectedFileMatch=c.parent(),t.currentSelectedFileMatch.setSelectedMatch(c),t.onFocus(c,!a,o,r)}}))})},t.prototype.updateGlobalPatternExclusions=function(e){if(this.inputPatternGlobalExclusionsContainer){var t=R.getExcludes(e);if(t){var i=Object.getOwnPropertyNames(t).filter(function(e){return t[e]===!0||"string"==typeof t[e].when}).map(function(e){return t[e]===!0?e:s.localize("globLabel","{0} when {1}",e,t[e].when)});if(i.length){var n=i.join(", ");this.inputPatternGlobalExclusions.value=n,this.inputPatternGlobalExclusions.inputElement.title=n,this.inputPatternGlobalExclusionsContainer.show()}else this.inputPatternGlobalExclusionsContainer.hide()}}},t.prototype.setVisible=function(t){var s;if(this.viewletVisible.set(t),t?(s=e.prototype.setVisible.call(this,t),this.tree.onVisible()):(this.tree.onHidden(),s=e.prototype.setVisible.call(this,t)),this.viewModel&&this.viewModel.searchResult.toggleHighlights(t),t&&!this.editorService.getActiveEditor()){var i=this.tree.getFocus();i&&this.onFocus(i)}return s},t.prototype.focus=function(){e.prototype.focus.call(this);var t=this.getSearchTextFromEditor();t&&this.searchWidget.searchInput.setValue(t),this.searchWidget.focus()},t.prototype.moveFocusFromResults=function(){this.showsFileTypes()?this.toggleFileTypes(!0,!0,!1,!0):this.searchWidget.focus(!0,!0)},t.prototype.reLayout=function(){if(!this.isDisposed){this.searchWidget.setWidth(this.size.width-25),this.inputPatternExclusions.setWidth(this.size.width-28),this.inputPatternIncludes.setWidth(this.size.width-28),this.inputPatternGlobalExclusions.width=this.size.width-28-24;var e=this.size.height-h.getTotalHeight(this.searchWidgetsContainer.getContainer())-6;this.results.style({height:e+"px"}),this.tree.layout(e)}},t.prototype.layout=function(e){this.size=e,this.reLayout()},t.prototype.getControl=function(){return this.tree},t.prototype.clearSearchResults=function(){this.viewModel.searchResult.clear(),this.showEmptyStage(),this.searchWidget.clear(),this.viewModel.cancelSearch()},t.prototype.cancelSearch=function(){return!!this.viewModel.cancelSearch()&&(this.searchWidget.focus(),!0)},t.prototype.selectTreeIfNotSelected=function(){if(this.tree.getInput()){this.tree.DOMFocus();var e=this.tree.getSelection();0===e.length&&this.tree.focusNext()}},t.prototype.getSearchTextFromEditor=function(){if(!this.editorService.getActiveEditor())return null;var e=this.editorService.getActiveEditor().getControl();if(!e||!c.isFunction(e.getEditorType)||e.getEditorType()!==n.EditorType.ICodeEditor)return null;var t=e.getSelection();if(t&&!t.isEmpty()&&t.startLineNumber===t.endLineNumber){var s=e.getModel().getLineContent(t.startLineNumber);return s=s.substring(t.startColumn-1,t.endColumn-1)}return null},t.prototype.showsFileTypes=function(){return h.hasClass(this.queryDetails,"more")},t.prototype.toggleFileTypes=function(e,t,s,i){var n="more";t="undefined"==typeof t?!h.hasClass(this.queryDetails,n):Boolean(t),s=Boolean(s),t?(h.addClass(this.queryDetails,n),e&&(i?(this.inputPatternExclusions.focus(),this.inputPatternExclusions.select()):(this.inputPatternIncludes.focus(),this.inputPatternIncludes.select()))):(h.removeClass(this.queryDetails,n),e&&this.searchWidget.focus()),!s&&this.size&&this.layout(this.size)},t.prototype.searchInFolder=function(e){this.showsFileTypes()||this.toggleFileTypes(!0,!0);var t=this.contextService.toWorkspaceRelativePath(e);t&&(this.inputPatternIncludes.setIsGlobPattern(!1),this.inputPatternIncludes.setValue(t),this.searchWidget.focus(!1))},t.prototype.onQueryChanged=function(e,s){var i=this.searchWidget.searchInput.getRegex(),n=this.searchWidget.searchInput.getWholeWords(),r=this.searchWidget.searchInput.getCaseSensitive(),o=this.searchWidget.searchInput.getValue(),a=this.inputPatternExclusions.getValue().trim(),c=this.inputPatternExclusions.isGlobPattern(),h=this.inputPatternIncludes.getValue().trim(),u=this.inputPatternIncludes.isGlobPattern();if(this.viewletSettings["query.contentPattern"]=o,this.viewletSettings["query.regex"]=i,this.viewletSettings["query.wholeWords"]=n,this.viewletSettings["query.caseSensitive"]=r,this.viewletSettings["query.folderExclusions"]=a,this.viewletSettings["query.exclusionsUsePattern"]=c,this.viewletSettings["query.folderIncludes"]=h,this.viewletSettings["query.includesUsePattern"]=u,e&&0!==o.length){if(i){var d=void 0;try{d=new RegExp(o)}catch(p){return}if(l.regExpLeadsToEndlessLoop(d))return}var v={pattern:o,isRegExp:i,isCaseSensitive:r,isWordMatch:n},g=this.inputPatternExclusions.getGlob(),f=this.inputPatternIncludes.getGlob(),m={folderResources:this.contextService.getWorkspace()?[this.contextService.getWorkspace().resource]:[],extraFileResources:y.getOutOfWorkspaceEditorResources(this.editorGroupService,this.contextService),excludePattern:g,maxResults:t.MAX_TEXT_RESULTS,includePattern:f};this.onQueryTriggered(this.queryBuilder.text(v,m),a,h),s||this.searchWidget.focus(!1)}},t.prototype.autoExpandFileMatch=function(e,t){var s=e.matches().length;s<10||t&&1===this.viewModel.searchResult.count()&&s<50?this.tree.expand(e).done(null,o.onUnexpectedError):this.tree.collapse(e).done(null,o.onUnexpectedError)},t.prototype.onQueryTriggered=function(e,t,i){var n=this;this.viewModel.cancelSearch();var r=100,c=this.progressService.show(r),l=0;this.loading=!0,this.searchWidget.searchInput.clearMessage(),this.showEmptyStage();var u=Object.create(null),p=function(e){var t=n.viewModel.searchResult.matches();t.forEach(function(t){u[t.id()]||(u[t.id()]=!0,n.autoExpandFileMatch(t,e))})},v=!1,g=function(e){v=!0,e?(c.worked(r-l),setTimeout(function(){return c.done()},200)):c.done(),n.onSearchResultsChanged().then(function(){return p(!0)}),n.viewModel.replaceString=n.searchWidget.getReplaceValue();var u=!n.viewModel.searchResult.isEmpty();if(n.loading=!1,n.actionRegistry.refresh.enabled=!0,n.actionRegistry["vs.tree.collapse"].enabled=u,n.actionRegistry.clearSearchResults.enabled=u,e&&e.limitHit&&n.searchWidget.searchInput.showMessage({content:s.localize("searchMaxResultsWarning","The result set only contains a subset of all matches. Please be more specific in your search to narrow down the results."),type:x.MessageType.WARNING}),u)n.viewModel.searchResult.toggleHighlights(!0),a.status(s.localize("ariaSearchResultsStatus","Search returned {0} results in {1} files",n.viewModel.searchResult.count(),n.viewModel.searchResult.fileCount()));else{var g=!!t,m=!!i,S=void 0;S=e?m&&g?s.localize("noResultsIncludesExcludes","No results found in '{0}' excluding '{1}' - ",i,t):m?s.localize("noResultsIncludes","No results found in '{0}' - ",i):g?s.localize("noResultsExcludes","No results found excluding '{0}' - ",t):s.localize("noResultsFound","No results found. Review your settings for configured exclusions - "):s.localize("searchCanceled","Search was canceled before any results could be found - "),a.status(S),n.tree.onHidden(),n.results.hide();var y=n.showMessage(S);e?m||g?d.$(y).a({"class":["pointer","prominent"],tabindex:"0",text:s.localize("rerunSearchInAll.message","Search again in all files")}).on(h.EventType.CLICK,function(e){h.EventHelper.stop(e,!1),n.inputPatternExclusions.setValue(""),n.inputPatternIncludes.setValue(""),n.onQueryChanged(!0)}):d.$(y).a({"class":["pointer","prominent"],tabindex:"0",text:s.localize("openSettings.message","Open Settings")}).on(h.EventType.CLICK,function(e){h.EventHelper.stop(e,!1);var t=n.instantiationService.createInstance(f.OpenGlobalSettingsAction,f.OpenGlobalSettingsAction.ID,f.OpenGlobalSettingsAction.LABEL);t.run().done(function(){return t.dispose()},o.onUnexpectedError)}):d.$(y).a({"class":["pointer","prominent"],text:s.localize("rerunSearch.message","Search again")}).on(h.EventType.CLICK,function(e){h.EventHelper.stop(e,!1),n.onQueryChanged(!0)})}},m=function(e){o.isPromiseCanceledError(e)?g(null):(n.loading=!1,v=!0,c.done(),n.messageService.show(2,e))},S=0,y=0,w=0,b=function(e){e.total&&(S=e.total),e.worked&&(y=e.worked)},E=setInterval(function(){if(v)return void window.clearInterval(E);var e=!0;if(S>0&&y>0){var t=Math.round(y/S*100);t>l&&(c.worked(t-l),l=t,e=!1)}e&&l<90&&(l++,c.worked(1));var s=n.viewModel.searchResult.fileCount();w!==s&&(w=s,n.tree.refresh().then(function(){p(!1)}).done(null,o.onUnexpectedError)),s>0&&(n.actionRegistry["vs.tree.collapse"].enabled||(n.actionRegistry["vs.tree.collapse"].enabled=!0))},200);this.searchWidget.setReplaceAllActionState(!1),this.replaceService.disposeAllInputs(),this.viewModel.search(e).done(g,m,b)},t.prototype.showEmptyStage=function(){this.actionRegistry.refresh.enabled=!1,this.actionRegistry["vs.tree.collapse"].enabled=!1,this.actionRegistry.clearSearchResults.enabled=!1,this.replaceService.disposeAllInputs(),this.messages.hide(),this.results.show(),this.tree.onVisible(),this.currentSelectedFileMatch=null},t.prototype.onFocus=function(e,t,s,n){return e instanceof E.Match?(this.telemetryService.publicLog("searchResultChosen"),this.viewModel.isReplaceActive()&&this.viewModel.replaceString?this.replaceService.openReplacePreviewEditor(e,t,s,n):this.open(e,t,s,n)):i.TPromise.as(!0)},t.prototype.open=function(e,t,s,i){var n=this.getSelectionFrom(e),r=e instanceof E.Match?e.parent().resource():e.resource();return this.editorService.openEditor({resource:r,options:{preserveFocus:t,pinned:i,selection:n,revealIfVisible:!0}},s)},t.prototype.getSelectionFrom=function(e){var t=null;if(e instanceof E.Match&&(t=e),e instanceof E.FileMatch&&e.count()>0&&(t=e.matches()[e.matches().length-1]),t){var s=t.range();if(this.viewModel.isReplaceActive()){var i=t.replaceString;return{startLineNumber:s.startLineNumber,startColumn:s.startColumn+i.length,endLineNumber:s.startLineNumber,endColumn:s.startColumn+i.length}}return s}},t.prototype.onUntitledFileSaved=function(e){if(this.viewModel)for(var t=this.viewModel.searchResult.matches(),s=0,i=t.length;s<i;s++)e.resource.toString()===t[s].resource().toString()&&this.viewModel.searchResult.remove(t[s])},t.prototype.onFilesChanged=function(e){if(this.viewModel)for(var t=this.viewModel.searchResult.matches(),s=0,i=t.length;s<i;s++)e.contains(t[s].resource(),w.FileChangeType.DELETED)&&this.viewModel.searchResult.remove(t[s])},t.prototype.getActions=function(){return[this.actionRegistry.refresh,this.actionRegistry["vs.tree.collapse"],this.actionRegistry.clearSearchResults]},t.prototype.dispose=function(){this.isDisposed=!0,this.toDispose=r.dispose(this.toDispose),this.tree&&this.tree.dispose(),this.searchWidget.dispose(),this.inputPatternIncludes.dispose(),this.inputPatternExclusions.dispose(),this.viewModel.dispose(),e.prototype.dispose.call(this)},t.MAX_TEXT_RESULTS=2048,t.SHOW_REPLACE_STORAGE_KEY="vs.search.show.replace",t=__decorate([__param(0,V.ITelemetryService),__param(1,_.IEventService),__param(2,P.IWorkbenchEditorService),__param(3,S.IEditorGroupService),__param(4,L.IProgressService),__param(5,A.IMessageService),__param(6,I.IStorageService),__param(7,M.IContextViewService),__param(8,T.IInstantiationService),__param(9,W.IConfigurationService),__param(10,O.IWorkspaceContextService),__param(11,F.ISearchService),__param(12,k.IKeybindingService),__param(13,N.IReplaceService)],t)}(b.Viewlet);t.SearchViewlet=H});