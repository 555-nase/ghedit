define(["require","exports","vs/nls","vs/base/common/keyCodes","vs/base/browser/browser","vs/platform/keybinding/common/keybinding","vs/editor/common/editorCommon","vs/editor/common/editorCommonExtensions","./quickCommand"],function(o,e,i,t,n,m,r,s,d){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";s.CommonEditorRegistry.registerEditorAction({ctor:d.QuickCommandAction,id:d.QuickCommandAction.ID,label:i.localize("label","Command Palette"),alias:"Command Palette",kbOpts:{context:s.ContextKey.EditorFocus,primary:n.isIE11orEarlier?t.KeyMod.Alt|t.KeyCode.F1:t.KeyCode.F1},menuOpts:{kbExpr:m.KbExpr.has(r.KEYBINDING_CONTEXT_EDITOR_FOCUS)}})});