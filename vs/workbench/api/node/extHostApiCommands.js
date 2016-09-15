define(["require","exports","vs/base/common/uri","vs/base/common/winjs.base","vs/workbench/api/node/extHostTypeConverters","vs/workbench/api/node/extHostTypes"],function(e,t,o,r,n,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function s(e){new a(e).registerCommands()}t.registerApiCommands=s;var a=function(){function e(e){this._disposables=[],this._commands=e}return e.prototype.registerCommands=function(){var e=this;this._register("vscode.executeWorkspaceSymbolProvider",this._executeWorkspaceSymbolProvider,{description:"Execute all workspace symbol provider.",args:[{name:"query",description:"Search string",constraint:String}],returns:"A promise that resolves to an array of SymbolInformation-instances."}),this._register("vscode.executeDefinitionProvider",this._executeDefinitionProvider,{description:"Execute all definition provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"position",description:"Position of a symbol",constraint:i.Position}],returns:"A promise that resolves to an array of Location-instances."}),this._register("vscode.executeHoverProvider",this._executeHoverProvider,{description:"Execute all hover provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"position",description:"Position of a symbol",constraint:i.Position}],returns:"A promise that resolves to an array of Hover-instances."}),this._register("vscode.executeDocumentHighlights",this._executeDocumentHighlights,{description:"Execute document highlight provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"position",description:"Position in a text document",constraint:i.Position}],returns:"A promise that resolves to an array of DocumentHighlight-instances."}),this._register("vscode.executeReferenceProvider",this._executeReferenceProvider,{description:"Execute reference provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"position",description:"Position in a text document",constraint:i.Position}],returns:"A promise that resolves to an array of Location-instances."}),this._register("vscode.executeDocumentRenameProvider",this._executeDocumentRenameProvider,{description:"Execute rename provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"position",description:"Position in a text document",constraint:i.Position},{name:"newName",description:"The new symbol name",constraint:String}],returns:"A promise that resolves to a WorkspaceEdit."}),this._register("vscode.executeSignatureHelpProvider",this._executeSignatureHelpProvider,{description:"Execute signature help provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"position",description:"Position in a text document",constraint:i.Position},{name:"triggerCharacter",description:"(optional) Trigger signature help when the user types the character, like `,` or `(`",constraint:function(e){return void 0===e||"string"==typeof e}}],returns:"A promise that resolves to SignatureHelp."}),this._register("vscode.executeDocumentSymbolProvider",this._executeDocumentSymbolProvider,{description:"Execute document symbol provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]}],returns:"A promise that resolves to an array of SymbolInformation-instances."}),this._register("vscode.executeCompletionItemProvider",this._executeCompletionItemProvider,{description:"Execute completion item provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"position",description:"Position in a text document",constraint:i.Position},{name:"triggerCharacter",description:"(optional) Trigger completion when the user types the character, like `,` or `(`",constraint:function(e){return void 0===e||"string"==typeof e}}],returns:"A promise that resolves to a CompletionList-instance."}),this._register("vscode.executeCodeActionProvider",this._executeCodeActionProvider,{description:"Execute code action provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"range",description:"Range in a text document",constraint:i.Range}],returns:"A promise that resolves to an array of Command-instances."}),this._register("vscode.executeCodeLensProvider",this._executeCodeLensProvider,{description:"Execute code lens provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]}],returns:"A promise that resolves to an array of CodeLens-instances."}),this._register("vscode.executeFormatDocumentProvider",this._executeFormatDocumentProvider,{description:"Execute document format provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"options",description:"Formatting options"}],returns:"A promise that resolves to an array of TextEdits."}),this._register("vscode.executeFormatRangeProvider",this._executeFormatRangeProvider,{description:"Execute range format provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"range",description:"Range in a text document",constraint:i.Range},{name:"options",description:"Formatting options"}],returns:"A promise that resolves to an array of TextEdits."}),this._register("vscode.executeFormatOnTypeProvider",this._executeFormatOnTypeProvider,{description:"Execute document format provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]},{name:"position",description:"Position in a text document",constraint:i.Position},{name:"ch",description:"Character that got typed",constraint:String},{name:"options",description:"Formatting options"}],returns:"A promise that resolves to an array of TextEdits."}),this._register("vscode.executeLinkProvider",this._executeDocumentLinkProvider,{description:"Execute document link provider.",args:[{name:"uri",description:"Uri of a text document",constraint:o["default"]}],returns:"A promise that resolves to an array of DocumentLink-instances."}),this._register("vscode.previewHtml",function(t,o,r){return e._commands.executeCommand("_workbench.previewHtml",t,"number"==typeof o&&n.fromViewColumn(o),r)},{description:"\n\t\t\t\t\tRender the html of the resource in an editor view.\n\n\t\t\t\t\tLinks contained in the document will be handled by VS Code whereby it supports `file`-resources and\n\t\t\t\t\t[virtual](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts#L3295)-resources\n\t\t\t\t\tas well as triggering commands using the `command`-scheme. Use the query part of a command-uri to pass along JSON-encoded\n\t\t\t\t\targuments - note that URL-encoding must be applied. The snippet below defines a command-link that calls the _previewHtml_\n\t\t\t\t\tcommand and passes along an uri:\n\t\t\t\t\t```\n\t\t\t\t\tlet href = encodeURI('command:vscode.previewHtml?' + JSON.stringify(someUri));\n\t\t\t\t\tlet html = '<a href=\"' + href + '\">Show Resource...</a>.';\n\t\t\t\t\t```\n\t\t\t\t",args:[{name:"uri",description:"Uri of the resource to preview.",constraint:function(e){return e instanceof o["default"]||"string"==typeof e}},{name:"column",description:"(optional) Column in which to preview.",constraint:function(e){return"undefined"==typeof e||"number"==typeof e&&"string"==typeof i.ViewColumn[e]}},{name:"label",description:"(optional) An human readable string that is used as title for the preview.",constraint:function(e){return"string"==typeof e||"undefined"==typeof e}}]}),this._register("vscode.openFolder",function(t,o){return t?e._commands.executeCommand("_workbench.ipc","vscode:windowOpen",[[t.fsPath],o]):e._commands.executeCommand("_workbench.ipc","vscode:openFolderPicker",[o])},{description:"Open a folder in the current window or new window depending on the newWindow argument. Note that opening in the same window will shutdown the current extension host process and start a new one on the given folder unless the newWindow parameter is set to true.",args:[{name:"uri",description:"(optional) Uri of the folder to open. If not provided, a native dialog will ask the user for the folder",constraint:function(e){return void 0===e||e instanceof o["default"]}},{name:"newWindow",description:"(optional) Wether to open the folder in a new window or the same. Defaults to opening in the same window.",constraint:function(e){return void 0===e||"boolean"==typeof e}}]}),this._register("vscode.startDebug",function(t){return e._commands.executeCommand("_workbench.startDebug",t)},{description:"Start a debugging session.",args:[{name:"configuration",description:"(optional) Name of the debug configuration from 'launch.json' to use. Or a configuration json object to use."}]}),this._register("vscode.diff",function(t,o,r){return e._commands.executeCommand("_workbench.diff",[t,o,r])},{description:"Opens the provided resources in the diff editor to compare their contents.",args:[{name:"left",description:"Left-hand side resource of the diff editor",constraint:o["default"]},{name:"right",description:"Right-hand side resource of the diff editor",constraint:o["default"]},{name:"title",description:"(optional) Human readable title for the diff editor",constraint:function(e){return void 0===e||"string"==typeof e}}]}),this._register("vscode.open",function(t,o){return e._commands.executeCommand("_workbench.open",[t,n.fromViewColumn(o)])},{description:"Opens the provided resource in the editor. Can be a text or binary file, or a http(s) url",args:[{name:"resource",description:"Resource to open",constraint:o["default"]},{name:"column",description:"(optional) Column in which to open",constraint:function(e){return void 0===e||"number"==typeof e}}]})},e.prototype._register=function(e,t,o){var r=this._commands.registerCommand(e,t,this,o);this._disposables.push(r)},e.prototype._executeWorkspaceSymbolProvider=function(e){return this._commands.executeCommand("_executeWorkspaceSymbolProvider",{query:e}).then(function(e){if(Array.isArray(e))return e.map(n.toSymbolInformation)})},e.prototype._executeDefinitionProvider=function(e,t){var o={resource:e,position:t&&n.fromPosition(t)};return this._commands.executeCommand("_executeDefinitionProvider",o).then(function(e){if(Array.isArray(e))return e.map(n.location.to)})},e.prototype._executeHoverProvider=function(e,t){var o={resource:e,position:t&&n.fromPosition(t)};return this._commands.executeCommand("_executeHoverProvider",o).then(function(e){if(Array.isArray(e))return e.map(n.toHover)})},e.prototype._executeDocumentHighlights=function(e,t){var o={resource:e,position:t&&n.fromPosition(t)};return this._commands.executeCommand("_executeDocumentHighlights",o).then(function(e){if(Array.isArray(e))return e.map(n.toDocumentHighlight)})},e.prototype._executeReferenceProvider=function(e,t){var o={resource:e,position:t&&n.fromPosition(t)};return this._commands.executeCommand("_executeReferenceProvider",o).then(function(e){if(Array.isArray(e))return e.map(n.location.to)})},e.prototype._executeDocumentRenameProvider=function(e,t,o){var s={resource:e,position:t&&n.fromPosition(t),newName:o};return this._commands.executeCommand("_executeDocumentRenameProvider",s).then(function(e){if(e){if(e.rejectReason)return r.TPromise.wrapError(e.rejectReason);for(var t=new i.WorkspaceEdit,o=0,s=e.edits;o<s.length;o++){var a=s[o];t.replace(a.resource,n.toRange(a.range),a.newText)}return t}})},e.prototype._executeSignatureHelpProvider=function(e,t,o){var r={resource:e,position:t&&n.fromPosition(t),triggerCharacter:o};return this._commands.executeCommand("_executeSignatureHelpProvider",r).then(function(e){if(e)return n.SignatureHelp.to(e)})},e.prototype._executeCompletionItemProvider=function(e,t,o){var r={resource:e,position:t&&n.fromPosition(t),triggerCharacter:o};return this._commands.executeCommand("_executeCompletionItemProvider",r).then(function(e){if(e){for(var o=[],r=void 0,s=0,a=e;s<a.length;s++){var c=a[s];r=c.container.incomplete||r,o.push(n.Suggest.to(c.container,t,c.suggestion))}return new i.CompletionList(o,r)}})},e.prototype._executeDocumentSymbolProvider=function(e){var t={resource:e};return this._commands.executeCommand("_executeDocumentSymbolProvider",t).then(function(e){if(e&&Array.isArray(e.entries))return e.entries.map(n.SymbolInformation.fromOutlineEntry)})},e.prototype._executeCodeActionProvider=function(e,t){var o={resource:e,range:n.fromRange(t)};return this._commands.executeCommand("_executeCodeActionProvider",o).then(function(e){if(Array.isArray(e))return e.map(function(e){return n.Command.to(e.command)})})},e.prototype._executeCodeLensProvider=function(e){var t={resource:e};return this._commands.executeCommand("_executeCodeLensProvider",t).then(function(e){if(Array.isArray(e))return e.map(function(e){return new i.CodeLens(n.toRange(e.symbol.range),n.Command.to(e.symbol.command))})})},e.prototype._executeFormatDocumentProvider=function(e,t){var o={resource:e,options:t};return this._commands.executeCommand("_executeFormatDocumentProvider",o).then(function(e){if(Array.isArray(e))return e.map(function(e){return new i.TextEdit(n.toRange(e.range),e.text)})})},e.prototype._executeFormatRangeProvider=function(e,t,o){var r={resource:e,range:n.fromRange(t),options:o};return this._commands.executeCommand("_executeFormatRangeProvider",r).then(function(e){if(Array.isArray(e))return e.map(function(e){return new i.TextEdit(n.toRange(e.range),e.text)})})},e.prototype._executeFormatOnTypeProvider=function(e,t,o,r){var s={resource:e,position:n.fromPosition(t),ch:o,options:r};return this._commands.executeCommand("_executeFormatOnTypeProvider",s).then(function(e){if(Array.isArray(e))return e.map(function(e){return new i.TextEdit(n.toRange(e.range),e.text)})})},e.prototype._executeDocumentLinkProvider=function(e){return this._commands.executeCommand("_executeLinkProvider",e).then(function(e){if(Array.isArray(e))return e.map(n.DocumentLink.to)})},e}()});