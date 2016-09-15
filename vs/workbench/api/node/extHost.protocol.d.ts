import { ProxyIdentifier, IThreadService } from 'vs/workbench/services/thread/common/threadService';
import * as vscode from 'vscode';
import URI from 'vs/base/common/uri';
import Severity from 'vs/base/common/severity';
import { TPromise } from 'vs/base/common/winjs.base';
import { IMarkerData } from 'vs/platform/markers/common/markers';
import { Position as EditorPosition } from 'vs/platform/editor/common/editor';
import { IMessage, IExtensionDescription } from 'vs/platform/extensions/common/extensions';
import { StatusbarAlignment as MainThreadStatusBarAlignment } from 'vs/platform/statusbar/common/statusbar';
import { ITelemetryInfo } from 'vs/platform/telemetry/common/telemetry';
import { ICommandHandlerDescription } from 'vs/platform/commands/common/commands';
import * as editorCommon from 'vs/editor/common/editorCommon';
import * as modes from 'vs/editor/common/modes';
import { IResourceEdit } from 'vs/editor/common/services/bulkEdit';
import { IPickOpenEntry, IPickOptions } from 'vs/workbench/services/quickopen/common/quickOpenService';
import { ITypeBearing } from 'vs/workbench/parts/search/common/search';
import { TextEditorRevealType, ITextEditorConfigurationUpdate, IResolvedTextEditorConfiguration, ISelectionChangeEvent } from './mainThreadEditorsTracker';
import { EndOfLine } from './extHostTypes';
export interface InstanceSetter<T> {
    set<R extends T>(instance: T): R;
}
export declare class InstanceCollection {
    private _items;
    constructor();
    define<T>(id: ProxyIdentifier<T>): InstanceSetter<T>;
    _set<T>(id: ProxyIdentifier<T>, value: T): void;
    finish(isMain: boolean, threadService: IThreadService): void;
}
export declare abstract class MainThreadCommandsShape {
    $registerCommand(id: string): TPromise<any>;
    $executeCommand<T>(id: string, args: any[]): Thenable<T>;
    $getCommands(): Thenable<string[]>;
}
export declare abstract class MainThreadDiagnosticsShape {
    $changeMany(owner: string, entries: [URI, IMarkerData[]][]): TPromise<any>;
    $clear(owner: string): TPromise<any>;
}
export declare abstract class MainThreadDocumentsShape {
    $tryOpenDocument(uri: URI): TPromise<any>;
    $registerTextContentProvider(handle: number, scheme: string): void;
    $onVirtualDocumentChange(uri: URI, value: string): void;
    $unregisterTextContentProvider(handle: number): void;
    $trySaveDocument(uri: URI): TPromise<boolean>;
}
export declare abstract class MainThreadEditorsShape {
    $tryShowTextDocument(resource: URI, position: EditorPosition, preserveFocus: boolean): TPromise<string>;
    $registerTextEditorDecorationType(key: string, options: editorCommon.IDecorationRenderOptions): void;
    $removeTextEditorDecorationType(key: string): void;
    $tryShowEditor(id: string, position: EditorPosition): TPromise<void>;
    $tryHideEditor(id: string): TPromise<void>;
    $trySetOptions(id: string, options: ITextEditorConfigurationUpdate): TPromise<any>;
    $trySetDecorations(id: string, key: string, ranges: editorCommon.IDecorationOptions[]): TPromise<any>;
    $tryRevealRange(id: string, range: editorCommon.IRange, revealType: TextEditorRevealType): TPromise<any>;
    $trySetSelections(id: string, selections: editorCommon.ISelection[]): TPromise<any>;
    $tryApplyEdits(id: string, modelVersionId: number, edits: editorCommon.ISingleEditOperation[], setEndOfLine: EndOfLine): TPromise<boolean>;
}
export declare abstract class MainThreadErrorsShape {
    onUnexpectedExtHostError(err: any): void;
}
export declare abstract class MainThreadLanguageFeaturesShape {
    $unregister(handle: number): TPromise<any>;
    $registerOutlineSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerCodeLensSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerDeclaractionSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerHoverProvider(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerDocumentHighlightProvider(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerReferenceSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerQuickFixSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerDocumentFormattingSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerRangeFormattingSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerOnTypeFormattingSupport(handle: number, selector: vscode.DocumentSelector, autoFormatTriggerCharacters: string[]): TPromise<any>;
    $registerNavigateTypeSupport(handle: number): TPromise<any>;
    $registerRenameSupport(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $registerSuggestSupport(handle: number, selector: vscode.DocumentSelector, triggerCharacters: string[]): TPromise<any>;
    $registerSignatureHelpProvider(handle: number, selector: vscode.DocumentSelector, triggerCharacter: string[]): TPromise<any>;
    $registerDocumentLinkProvider(handle: number, selector: vscode.DocumentSelector): TPromise<any>;
    $setLanguageConfiguration(handle: number, languageId: string, configuration: vscode.LanguageConfiguration): TPromise<any>;
}
export declare abstract class MainThreadLanguagesShape {
    $getLanguages(): TPromise<string[]>;
}
export declare abstract class MainThreadMessageServiceShape {
    $showMessage(severity: Severity, message: string, commands: {
        title: string;
        isCloseAffordance: boolean;
        handle: number;
    }[]): Thenable<number>;
}
export declare abstract class MainThreadOutputServiceShape {
    $append(channelId: string, label: string, value: string): TPromise<void>;
    $clear(channelId: string, label: string): TPromise<void>;
    $reveal(channelId: string, label: string, preserveFocus: boolean): TPromise<void>;
    $close(channelId: string): TPromise<void>;
}
export interface MyQuickPickItems extends IPickOpenEntry {
    handle: number;
}
export declare abstract class MainThreadQuickOpenShape {
    $show(options: IPickOptions): Thenable<number>;
    $setItems(items: MyQuickPickItems[]): Thenable<any>;
    $setError(error: Error): Thenable<any>;
    $input(options: vscode.InputBoxOptions, validateInput: boolean): Thenable<string>;
}
export declare abstract class MainThreadStatusBarShape {
    $setEntry(id: number, text: string, tooltip: string, command: string, color: string, alignment: MainThreadStatusBarAlignment, priority: number): void;
    $dispose(id: number): void;
}
export declare abstract class MainThreadStorageShape {
    $getValue<T>(shared: boolean, key: string): TPromise<T>;
    $setValue(shared: boolean, key: string, value: any): TPromise<any>;
}
export declare abstract class MainThreadTelemetryShape {
    $publicLog(eventName: string, data?: any): void;
    $getTelemetryInfo(): TPromise<ITelemetryInfo>;
}
export declare abstract class MainThreadWorkspaceShape {
    $startSearch(include: string, exclude: string, maxResults: number, requestId: number): Thenable<URI[]>;
    $cancelSearch(requestId: number): Thenable<boolean>;
    $saveAll(includeUntitled?: boolean): Thenable<boolean>;
    $applyWorkspaceEdit(edits: IResourceEdit[]): TPromise<boolean>;
}
export declare abstract class MainProcessExtensionServiceShape {
    $onExtensionHostReady(extensionDescriptions: IExtensionDescription[], messages: IMessage[]): TPromise<void>;
    $localShowMessage(severity: Severity, msg: string): void;
    $onExtensionActivated(extensionId: string): void;
    $onExtensionActivationFailed(extensionId: string): void;
}
export declare abstract class ExtHostCommandsShape {
    $executeContributedCommand<T>(id: string, ...args: any[]): Thenable<T>;
    $getContributedCommandHandlerDescriptions(): TPromise<{
        [id: string]: string | ICommandHandlerDescription;
    }>;
}
export declare abstract class ExtHostConfigurationShape {
    $acceptConfigurationChanged(config: any): void;
}
export declare abstract class ExtHostDiagnosticsShape {
}
export interface IModelAddedData {
    url: URI;
    versionId: number;
    value: editorCommon.IRawText;
    modeId: string;
    isDirty: boolean;
}
export declare abstract class ExtHostDocumentsShape {
    $provideTextDocumentContent(handle: number, uri: URI): TPromise<string>;
    $acceptModelAdd(initData: IModelAddedData): void;
    $acceptModelModeChanged(strURL: string, oldModeId: string, newModeId: string): void;
    $acceptModelSaved(strURL: string): void;
    $acceptModelDirty(strURL: string): void;
    $acceptModelReverted(strURL: string): void;
    $acceptModelRemoved(strURL: string): void;
    $acceptModelChanged(strURL: string, events: editorCommon.IModelContentChangedEvent2[]): void;
}
export interface ITextEditorAddData {
    id: string;
    document: URI;
    options: IResolvedTextEditorConfiguration;
    selections: editorCommon.ISelection[];
    editorPosition: EditorPosition;
}
export interface ITextEditorPositionData {
    [id: string]: EditorPosition;
}
export declare abstract class ExtHostEditorsShape {
    $acceptTextEditorAdd(data: ITextEditorAddData): void;
    $acceptOptionsChanged(id: string, opts: IResolvedTextEditorConfiguration): void;
    $acceptSelectionsChanged(id: string, event: ISelectionChangeEvent): void;
    $acceptActiveEditorAndVisibleEditors(id: string, visibleIds: string[]): void;
    $acceptEditorPositionData(data: ITextEditorPositionData): void;
    $acceptTextEditorRemove(id: string): void;
}
export declare abstract class ExtHostExtensionServiceShape {
    $localShowMessage(severity: Severity, msg: string): void;
    $activateExtension(extensionDescription: IExtensionDescription): TPromise<void>;
}
export interface FileSystemEvents {
    created: URI[];
    changed: URI[];
    deleted: URI[];
}
export declare abstract class ExtHostFileSystemEventServiceShape {
    $onFileEvent(events: FileSystemEvents): void;
}
export declare abstract class ExtHostLanguageFeaturesShape {
    $provideDocumentSymbols(handle: number, resource: URI): TPromise<modes.SymbolInformation[]>;
    $provideCodeLenses(handle: number, resource: URI): TPromise<modes.ICodeLensSymbol[]>;
    $resolveCodeLens(handle: number, resource: URI, symbol: modes.ICodeLensSymbol): TPromise<modes.ICodeLensSymbol>;
    $provideDefinition(handle: number, resource: URI, position: editorCommon.IPosition): TPromise<modes.Definition>;
    $provideHover(handle: number, resource: URI, position: editorCommon.IPosition): TPromise<modes.Hover>;
    $provideDocumentHighlights(handle: number, resource: URI, position: editorCommon.IPosition): TPromise<modes.DocumentHighlight[]>;
    $provideReferences(handle: number, resource: URI, position: editorCommon.IPosition, context: modes.ReferenceContext): TPromise<modes.Location[]>;
    $provideCodeActions(handle: number, resource: URI, range: editorCommon.IRange): TPromise<modes.CodeAction[]>;
    $provideDocumentFormattingEdits(handle: number, resource: URI, options: modes.FormattingOptions): TPromise<editorCommon.ISingleEditOperation[]>;
    $provideDocumentRangeFormattingEdits(handle: number, resource: URI, range: editorCommon.IRange, options: modes.FormattingOptions): TPromise<editorCommon.ISingleEditOperation[]>;
    $provideOnTypeFormattingEdits(handle: number, resource: URI, position: editorCommon.IPosition, ch: string, options: modes.FormattingOptions): TPromise<editorCommon.ISingleEditOperation[]>;
    $getNavigateToItems(handle: number, search: string): TPromise<ITypeBearing[]>;
    $provideRenameEdits(handle: number, resource: URI, position: editorCommon.IPosition, newName: string): TPromise<modes.WorkspaceEdit>;
    $provideCompletionItems(handle: number, resource: URI, position: editorCommon.IPosition): TPromise<modes.ISuggestResult[]>;
    $resolveCompletionItem(handle: number, resource: URI, position: editorCommon.IPosition, suggestion: modes.ISuggestion): TPromise<modes.ISuggestion>;
    $provideSignatureHelp(handle: number, resource: URI, position: editorCommon.IPosition): TPromise<modes.SignatureHelp>;
    $providDocumentLinks(handle: number, resource: URI): TPromise<modes.ILink[]>;
}
export declare abstract class ExtHostQuickOpenShape {
    $onItemSelected(handle: number): void;
    $validateInput(input: string): TPromise<string>;
}
export declare const MainContext: {
    MainThreadCommands: ProxyIdentifier<MainThreadCommandsShape>;
    MainThreadDiagnostics: ProxyIdentifier<MainThreadDiagnosticsShape>;
    MainThreadDocuments: ProxyIdentifier<MainThreadDocumentsShape>;
    MainThreadEditors: ProxyIdentifier<MainThreadEditorsShape>;
    MainThreadErrors: ProxyIdentifier<MainThreadErrorsShape>;
    MainThreadLanguageFeatures: ProxyIdentifier<MainThreadLanguageFeaturesShape>;
    MainThreadLanguages: ProxyIdentifier<MainThreadLanguagesShape>;
    MainThreadMessageService: ProxyIdentifier<MainThreadMessageServiceShape>;
    MainThreadOutputService: ProxyIdentifier<MainThreadOutputServiceShape>;
    MainThreadQuickOpen: ProxyIdentifier<MainThreadQuickOpenShape>;
    MainThreadStatusBar: ProxyIdentifier<MainThreadStatusBarShape>;
    MainThreadStorage: ProxyIdentifier<MainThreadStorageShape>;
    MainThreadTelemetry: ProxyIdentifier<MainThreadTelemetryShape>;
    MainThreadWorkspace: ProxyIdentifier<MainThreadWorkspaceShape>;
    MainProcessExtensionService: ProxyIdentifier<MainProcessExtensionServiceShape>;
};
export declare const ExtHostContext: {
    ExtHostCommands: ProxyIdentifier<ExtHostCommandsShape>;
    ExtHostConfiguration: ProxyIdentifier<ExtHostConfigurationShape>;
    ExtHostDiagnostics: ProxyIdentifier<ExtHostDiagnosticsShape>;
    ExtHostDocuments: ProxyIdentifier<ExtHostDocumentsShape>;
    ExtHostEditors: ProxyIdentifier<ExtHostEditorsShape>;
    ExtHostFileSystemEventService: ProxyIdentifier<ExtHostFileSystemEventServiceShape>;
    ExtHostLanguageFeatures: ProxyIdentifier<ExtHostLanguageFeaturesShape>;
    ExtHostQuickOpen: ProxyIdentifier<ExtHostQuickOpenShape>;
    ExtHostExtensionService: ProxyIdentifier<ExtHostExtensionServiceShape>;
};
