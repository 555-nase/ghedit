var __extends=this&&this.__extends||function(e,o){function r(){this.constructor=e}for(var t in o)o.hasOwnProperty(t)&&(e[t]=o[t]);e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)},__decorate=this&&this.__decorate||function(e,o,r,t){var i,n=arguments.length,c=n<3?o:null===t?t=Object.getOwnPropertyDescriptor(o,r):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,o,r,t);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(c=(n<3?i(c):n>3?i(o,r,c):i(o,r))||c);return n>3&&c&&Object.defineProperty(o,r,c),c},__param=this&&this.__param||function(e,o){return function(r,t){o(r,t,e)}};define(["require","exports","vs/platform/platform","vs/nls","vs/workbench/browser/quickopen","vs/workbench/browser/parts/statusbar/statusbar","vs/workbench/browser/parts/editor/baseEditor","vs/workbench/common/editor","vs/workbench/common/editor/stringEditorInput","vs/workbench/browser/parts/editor/stringEditor","vs/workbench/common/editor/diffEditorInput","vs/workbench/common/editor/untitledEditorInput","vs/workbench/common/editor/resourceEditorInput","vs/platform/instantiation/common/instantiation","vs/platform/keybinding/common/keybindingsRegistry","vs/platform/keybinding/common/keybinding","vs/workbench/browser/parts/editor/textDiffEditor","vs/workbench/services/editor/common/editorService","vs/workbench/browser/parts/editor/binaryDiffEditor","vs/workbench/services/group/common/groupService","vs/platform/configuration/common/configurationRegistry","vs/workbench/browser/parts/editor/editorStatus","vs/workbench/common/actionRegistry","vs/workbench/browser/actionBarRegistry","vs/platform/actions/common/actions","vs/platform/instantiation/common/descriptors","vs/base/common/keyCodes","vs/workbench/browser/parts/editor/editorActions","vs/workbench/browser/parts/editor/editorCommands"],function(e,o,r,t,i,n,c,s,d,p,a,y,E,A,u,l,C,h,K,g,w,m,b,k,v,f,I,S,G){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function D(e,o){var r=e.get(h.IWorkbenchEditorService),t=[r.getActiveEditor()].concat(r.getVisibleEditors()).filter(function(e){return e instanceof C.TextDiffEditor});t.length>0&&(o?t[0].getDiffNavigator().next():t[0].getDiffNavigator().previous())}function L(e){return e?{primary:I.KeyMod.CtrlCmd|I.KeyMod.Shift|I.KeyCode.KEY_P,secondary:[I.KeyMod.CtrlCmd|I.KeyMod.Shift|I.KeyCode.KEY_E,I.KeyMod.CtrlCmd|I.KeyMod.Shift|I.KeyCode.Tab],mac:{primary:I.KeyMod.CtrlCmd|I.KeyMod.Shift|I.KeyCode.KEY_P,secondary:[I.KeyMod.CtrlCmd|I.KeyMod.Shift|I.KeyCode.KEY_E,I.KeyMod.WinCtrl|I.KeyMod.Shift|I.KeyCode.Tab]}}:{primary:I.KeyMod.CtrlCmd|I.KeyCode.KEY_P,secondary:[I.KeyMod.CtrlCmd|I.KeyCode.KEY_E,I.KeyMod.CtrlCmd|I.KeyCode.Tab],mac:{primary:I.KeyMod.CtrlCmd|I.KeyCode.KEY_P,secondary:[I.KeyMod.CtrlCmd|I.KeyCode.KEY_E,I.KeyMod.WinCtrl|I.KeyCode.Tab]}}}function M(e){switch(e){case 0:return I.KeyCode.KEY_0;case 1:return I.KeyCode.KEY_1;case 2:return I.KeyCode.KEY_2;case 3:return I.KeyCode.KEY_3;case 4:return I.KeyCode.KEY_4;case 5:return I.KeyCode.KEY_5;case 6:return I.KeyCode.KEY_6;case 7:return I.KeyCode.KEY_7;case 8:return I.KeyCode.KEY_8;case 9:return I.KeyCode.KEY_9}}r.Registry.as(s.Extensions.Editors).registerEditor(new c.EditorDescriptor(p.StringEditor.ID,t.localize("textEditor","Text Editor"),"vs/workbench/browser/parts/editor/stringEditor","StringEditor"),[new f.SyncDescriptor(d.StringEditorInput),new f.SyncDescriptor(y.UntitledEditorInput),new f.SyncDescriptor(E.ResourceEditorInput)]),r.Registry.as(s.Extensions.Editors).registerEditor(new c.EditorDescriptor(C.TextDiffEditor.ID,t.localize("textDiffEditor","Text Diff Editor"),"vs/workbench/browser/parts/editor/textDiffEditor","TextDiffEditor"),[new f.SyncDescriptor(a.DiffEditorInput)]),r.Registry.as(s.Extensions.Editors).registerEditor(new c.EditorDescriptor(K.BinaryResourceDiffEditor.ID,t.localize("binaryDiffEditor","Binary Diff Editor"),"vs/workbench/browser/parts/editor/binaryDiffEditor","BinaryResourceDiffEditor"),[new f.SyncDescriptor(a.DiffEditorInput)]);var _=r.Registry.as(n.Extensions.Statusbar);_.registerStatusbarItem(new n.StatusbarItemDescriptor(m.EditorStatus,n.StatusbarAlignment.RIGHT,100));var R=r.Registry.as(b.Extensions.WorkbenchActions);R.registerWorkbenchAction(new v.SyncActionDescriptor(m.ChangeModeAction,m.ChangeModeAction.ID,m.ChangeModeAction.LABEL,{primary:I.KeyMod.chord(I.KeyMod.CtrlCmd|I.KeyCode.KEY_K,I.KeyCode.KEY_M)}),"Change Language Mode"),R.registerWorkbenchAction(new v.SyncActionDescriptor(m.ChangeEOLAction,m.ChangeEOLAction.ID,m.ChangeEOLAction.LABEL),"Change End of Line Sequence"),R.registerWorkbenchAction(new v.SyncActionDescriptor(m.ChangeEncodingAction,m.ChangeEncodingAction.ID,m.ChangeEncodingAction.LABEL),"Change File Encoding"),u.KeybindingsRegistry.registerCommandDesc({id:"workbench.action.compareEditor.nextChange",weight:u.KeybindingsRegistry.WEIGHT.workbenchContrib(),when:l.KbExpr.has("textCompareEditorVisible"),primary:null,handler:function(e){return D(e,!0)}}),u.KeybindingsRegistry.registerCommandDesc({id:"workbench.action.compareEditor.previousChange",weight:u.KeybindingsRegistry.WEIGHT.workbenchContrib(),when:l.KbExpr.has("textCompareEditorVisible"),primary:null,handler:function(e){return D(e,!1)}}),u.KeybindingsRegistry.registerCommandDesc({id:"_workbench.printStacksModel",weight:u.KeybindingsRegistry.WEIGHT.workbenchContrib(0),handler:function(e){console.log(e.get(g.IEditorGroupService).getStacksModel().toString()+"\n\n")},when:void 0,primary:void 0}),u.KeybindingsRegistry.registerCommandDesc({id:"_workbench.validateStacksModel",weight:u.KeybindingsRegistry.WEIGHT.workbenchContrib(0),handler:function(e){e.get(g.IEditorGroupService).getStacksModel().validate()},when:void 0,primary:void 0});var O=function(e){function o(o){e.call(this),this.instantiationService=o}return __extends(o,e),o.prototype.hasActions=function(e){var o=this.getEntry(e);return!!o},o.prototype.getActions=function(e){var o=[],r=this.getEntry(e);return r&&(this.openToSideActionInstance||(this.openToSideActionInstance=this.instantiationService.createInstance(S.OpenToSideAction)),o.push(this.openToSideActionInstance)),o},o.prototype.getEntry=function(e){return e&&e.element?S.toEditorQuickOpenEntry(e.element):null},o=__decorate([__param(0,A.IInstantiationService)],o)}(k.ActionBarContributor);o.QuickOpenActionContributor=O;var W=r.Registry.as(k.Extensions.Actionbar);W.registerActionBarContributor(k.Scope.VIEWER,O),r.Registry.as(i.Extensions.Quickopen).registerQuickOpenHandler(new i.QuickOpenHandlerDescriptor("vs/workbench/browser/parts/editor/editorPicker","LeftEditorGroupPicker",S.NAVIGATE_IN_LEFT_GROUP_PREFIX,[{prefix:S.NAVIGATE_IN_LEFT_GROUP_PREFIX,needsEditor:!1,description:t.localize("leftEditorGroupPicker","Show Editors in Left Group")}])),r.Registry.as(i.Extensions.Quickopen).registerQuickOpenHandler(new i.QuickOpenHandlerDescriptor("vs/workbench/browser/parts/editor/editorPicker","CenterEditorGroupPicker",S.NAVIGATE_IN_CENTER_GROUP_PREFIX,[{prefix:S.NAVIGATE_IN_CENTER_GROUP_PREFIX,needsEditor:!1,description:t.localize("centerEditorGroupPicker","Show Editors in Center Group")}])),r.Registry.as(i.Extensions.Quickopen).registerQuickOpenHandler(new i.QuickOpenHandlerDescriptor("vs/workbench/browser/parts/editor/editorPicker","RightEditorGroupPicker",S.NAVIGATE_IN_RIGHT_GROUP_PREFIX,[{prefix:S.NAVIGATE_IN_RIGHT_GROUP_PREFIX,needsEditor:!1,description:t.localize("rightEditorGroupPicker","Show Editors in Right Group")}])),r.Registry.as(i.Extensions.Quickopen).registerQuickOpenHandler(new i.QuickOpenHandlerDescriptor("vs/workbench/browser/parts/editor/editorPicker","AllEditorsPicker",S.NAVIGATE_ALL_EDITORS_GROUP_PREFIX,[{prefix:S.NAVIGATE_ALL_EDITORS_GROUP_PREFIX,needsEditor:!1,description:t.localize("allEditorsPicker","Show All Opened Editors")}]));var P={primary:I.KeyMod.CtrlCmd|I.KeyCode.KEY_P,secondary:[I.KeyMod.CtrlCmd|I.KeyCode.KEY_E]},x=t.localize("view","View");R.registerWorkbenchAction(new v.SyncActionDescriptor(S.OpenNextRecentlyUsedEditorInGroupAction,S.OpenNextRecentlyUsedEditorInGroupAction.ID,S.OpenNextRecentlyUsedEditorInGroupAction.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyCode.Tab,mac:{primary:I.KeyMod.WinCtrl|I.KeyCode.Tab}}),"Open Next Recently Used Editor in Group"),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.OpenPreviousRecentlyUsedEditorInGroupAction,S.OpenPreviousRecentlyUsedEditorInGroupAction.ID,S.OpenPreviousRecentlyUsedEditorInGroupAction.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyMod.Shift|I.KeyCode.Tab,mac:{primary:I.KeyMod.WinCtrl|I.KeyMod.Shift|I.KeyCode.Tab}}),"Open Previous Recently Used Editor in Group"),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.ShowAllEditorsAction,S.ShowAllEditorsAction.ID,S.ShowAllEditorsAction.LABEL,{primary:I.KeyMod.chord(I.KeyMod.CtrlCmd|I.KeyCode.KEY_K,I.KeyMod.CtrlCmd|I.KeyCode.KEY_P),mac:{primary:I.KeyMod.CtrlCmd|I.KeyMod.Alt|I.KeyCode.Tab}}),"View: Show All Editors",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.ShowEditorsInLeftGroupAction,S.ShowEditorsInLeftGroupAction.ID,S.ShowEditorsInLeftGroupAction.LABEL),"View: Show Editors in Left Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.ShowEditorsInCenterGroupAction,S.ShowEditorsInCenterGroupAction.ID,S.ShowEditorsInCenterGroupAction.LABEL),"View: Show Editors in Center Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.ShowEditorsInRightGroupAction,S.ShowEditorsInRightGroupAction.ID,S.ShowEditorsInRightGroupAction.LABEL),"View: Show Editors in Left Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.OpenNextEditor,S.OpenNextEditor.ID,S.OpenNextEditor.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyCode.PageDown,mac:{primary:I.KeyMod.CtrlCmd|I.KeyMod.Alt|I.KeyCode.RightArrow}}),"View: Open Next Editor",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.OpenPreviousEditor,S.OpenPreviousEditor.ID,S.OpenPreviousEditor.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyCode.PageUp,mac:{primary:I.KeyMod.CtrlCmd|I.KeyMod.Alt|I.KeyCode.LeftArrow}}),"View: Open Previous Editor",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.ReopenClosedEditorAction,S.ReopenClosedEditorAction.ID,S.ReopenClosedEditorAction.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyMod.Shift|I.KeyCode.KEY_T}),"View: Reopen Closed Editor",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.KeepEditorAction,S.KeepEditorAction.ID,S.KeepEditorAction.LABEL,{primary:I.KeyMod.chord(I.KeyMod.CtrlCmd|I.KeyCode.KEY_K,I.KeyCode.Enter)}),"View: Keep Editor",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.CloseAllEditorsAction,S.CloseAllEditorsAction.ID,S.CloseAllEditorsAction.LABEL,{primary:I.KeyMod.chord(I.KeyMod.CtrlCmd|I.KeyCode.KEY_K,I.KeyMod.CtrlCmd|I.KeyCode.KEY_W)}),"View: Close All Editors",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.CloseLeftEditorsInGroupAction,S.CloseLeftEditorsInGroupAction.ID,S.CloseLeftEditorsInGroupAction.LABEL),"View: Close Editors to the Left",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.CloseRightEditorsInGroupAction,S.CloseRightEditorsInGroupAction.ID,S.CloseRightEditorsInGroupAction.LABEL),"View: Close Editors to the Right",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.CloseEditorsInGroupAction,S.CloseEditorsInGroupAction.ID,S.CloseEditorsInGroupAction.LABEL,{primary:I.KeyMod.chord(I.KeyMod.CtrlCmd|I.KeyCode.KEY_K,I.KeyCode.KEY_W)}),"View: Close All Editors in Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.CloseOtherEditorsInGroupAction,S.CloseOtherEditorsInGroupAction.ID,S.CloseOtherEditorsInGroupAction.LABEL,{primary:null,mac:{primary:I.KeyMod.CtrlCmd|I.KeyMod.Alt|I.KeyCode.KEY_T}}),"View: Close Other Editors",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.CloseEditorsInOtherGroupsAction,S.CloseEditorsInOtherGroupsAction.ID,S.CloseEditorsInOtherGroupsAction.LABEL),"View: Close Editors in Other Groups",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.SplitEditorAction,S.SplitEditorAction.ID,S.SplitEditorAction.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyCode.US_BACKSLASH}),"View: Split Editor",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.NavigateBetweenGroupsAction,S.NavigateBetweenGroupsAction.ID,S.NavigateBetweenGroupsAction.LABEL),"View: Navigate Between Editor Groups",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.FocusFirstGroupAction,S.FocusFirstGroupAction.ID,S.FocusFirstGroupAction.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyCode.KEY_1}),"View: Focus Left Editor Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.FocusSecondGroupAction,S.FocusSecondGroupAction.ID,S.FocusSecondGroupAction.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyCode.KEY_2}),"View: Focus Center Editor Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.FocusThirdGroupAction,S.FocusThirdGroupAction.ID,S.FocusThirdGroupAction.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyCode.KEY_3}),"View: Focus Right Editor Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.FocusLastEditorInStackAction,S.FocusLastEditorInStackAction.ID,S.FocusLastEditorInStackAction.LABEL,{primary:I.KeyMod.Alt|I.KeyCode.KEY_0,mac:{primary:I.KeyMod.WinCtrl|I.KeyCode.KEY_0}}),"View: Focus Last Editor in Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.EvenGroupWidthsAction,S.EvenGroupWidthsAction.ID,S.EvenGroupWidthsAction.LABEL),"View: Even Editor Group Widths",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.MaximizeGroupAction,S.MaximizeGroupAction.ID,S.MaximizeGroupAction.LABEL),"View: Maximize Editor Group and Hide Sidebar",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.MinimizeOtherGroupsAction,S.MinimizeOtherGroupsAction.ID,S.MinimizeOtherGroupsAction.LABEL),"View: Minimize Other Editor Groups",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.MoveGroupLeftAction,S.MoveGroupLeftAction.ID,S.MoveGroupLeftAction.LABEL,{primary:I.KeyMod.chord(I.KeyMod.CtrlCmd|I.KeyCode.KEY_K,I.KeyCode.LeftArrow)}),"View: Move Editor Group Left",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.MoveGroupRightAction,S.MoveGroupRightAction.ID,S.MoveGroupRightAction.LABEL,{primary:I.KeyMod.chord(I.KeyMod.CtrlCmd|I.KeyCode.KEY_K,I.KeyCode.RightArrow)}),"View: Move Editor Group Right",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.MoveEditorToLeftGroupAction,S.MoveEditorToLeftGroupAction.ID,S.MoveEditorToLeftGroupAction.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyMod.Alt|I.KeyCode.LeftArrow,mac:{primary:I.KeyMod.CtrlCmd|I.KeyMod.WinCtrl|I.KeyCode.LeftArrow}}),"View: Move Editor into Group to the Left",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.MoveEditorToRightGroupAction,S.MoveEditorToRightGroupAction.ID,S.MoveEditorToRightGroupAction.LABEL,{primary:I.KeyMod.CtrlCmd|I.KeyMod.Alt|I.KeyCode.RightArrow,mac:{primary:I.KeyMod.CtrlCmd|I.KeyMod.WinCtrl|I.KeyCode.RightArrow}}),"View: Move Editor into Group to the Right",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.FocusPreviousGroup,S.FocusPreviousGroup.ID,S.FocusPreviousGroup.LABEL,{primary:I.KeyMod.chord(I.KeyMod.CtrlCmd|I.KeyCode.KEY_K,I.KeyMod.CtrlCmd|I.KeyCode.LeftArrow)}),"View: Focus Previous Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.FocusNextGroup,S.FocusNextGroup.ID,S.FocusNextGroup.LABEL,{primary:I.KeyMod.chord(I.KeyMod.CtrlCmd|I.KeyCode.KEY_K,I.KeyMod.CtrlCmd|I.KeyCode.RightArrow)}),"View: Focus Next Group",x),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.NavigateForwardAction,S.NavigateForwardAction.ID,S.NavigateForwardAction.LABEL,{primary:null,win:{primary:I.KeyMod.Alt|I.KeyCode.RightArrow},mac:{primary:I.KeyMod.WinCtrl|I.KeyMod.Shift|I.KeyCode.US_MINUS},linux:{primary:I.KeyMod.CtrlCmd|I.KeyMod.Shift|I.KeyCode.US_MINUS}}),"Go Forward"),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.NavigateBackwardsAction,S.NavigateBackwardsAction.ID,S.NavigateBackwardsAction.LABEL,{primary:null,win:{primary:I.KeyMod.Alt|I.KeyCode.LeftArrow},mac:{primary:I.KeyMod.WinCtrl|I.KeyCode.US_MINUS},linux:{primary:I.KeyMod.CtrlCmd|I.KeyMod.Alt|I.KeyCode.US_MINUS}}),"Go Back"),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.GlobalQuickOpenAction,S.GlobalQuickOpenAction.ID,S.GlobalQuickOpenAction.LABEL,P),"Go to File..."),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.OpenPreviousEditorFromHistoryAction,S.OpenPreviousEditorFromHistoryAction.ID,S.OpenPreviousEditorFromHistoryAction.LABEL),"Open Previous Editor from History"),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.ClearEditorHistoryAction,S.ClearEditorHistoryAction.ID,S.ClearEditorHistoryAction.LABEL),"Clear Editor History"),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.RemoveFromEditorHistoryAction,S.RemoveFromEditorHistoryAction.ID,S.RemoveFromEditorHistoryAction.LABEL),"Remove From Editor History"),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.QuickOpenNavigateNextAction,S.QuickOpenNavigateNextAction.ID,S.QuickOpenNavigateNextAction.LABEL,L(!1),l.KbExpr.has("inQuickOpen")),"Navigate Next in Quick Open"),R.registerWorkbenchAction(new v.SyncActionDescriptor(S.QuickOpenNavigatePreviousAction,S.QuickOpenNavigatePreviousAction.ID,S.QuickOpenNavigatePreviousAction.LABEL,L(!0),l.KbExpr.has("inQuickOpen"),u.KeybindingsRegistry.WEIGHT.workbenchContrib(50)),"Navigate Previous in Quick Open");for(var B=function(e){var o=e,r=e+1;u.KeybindingsRegistry.registerCommandDesc({id:"workbench.action.openEditorAtIndex"+r,weight:u.KeybindingsRegistry.WEIGHT.workbenchContrib(),when:void 0,primary:I.KeyMod.Alt|M(r),mac:{primary:I.KeyMod.WinCtrl|M(r)},handler:function(e){var r=e.get(h.IWorkbenchEditorService),t=e.get(g.IEditorGroupService),i=r.getActiveEditor();if(i){var n=t.getStacksModel().groupAt(i.position),c=n.getEditor(o);if(c)return r.openEditor(c)}}})},N=0;N<9;N++)B(N);var T=r.Registry.as(w.Extensions.Configuration);T.registerConfiguration({id:"workbench",order:7,title:t.localize("workbenchConfigurationTitle","Workbench"),type:"object",properties:{"workbench.editor.showTabs":{type:"boolean",description:t.localize("showEditorTabs","Controls if opened editors should show in tabs or not."),"default":!0},"workbench.editor.enablePreview":{type:"boolean",description:t.localize("enablePreview","Controls if opened editors show as preview. Preview editors are reused until they are kept (e.g. via double click or editing)."),"default":!0},"workbench.editor.enablePreviewFromQuickOpen":{type:"boolean",description:t.localize("enablePreviewFromQuickOpen","Controls if opened editors from quick open show as preview. Preview editors are reused until they are kept (e.g. via double click or editing)."),"default":!0},"workbench.editor.openPositioning":{type:"string","enum":["left","right","first","last"],"default":"right",description:t.localize("editorOpenPositioning","Controls where editors open. Select 'left' or 'right' to open editors to the left or right of the current active one. Select 'first' or 'last' to open editors independently from the currently active one.")}}}),G.registerEditorComamnds()});