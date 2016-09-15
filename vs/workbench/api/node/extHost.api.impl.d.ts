import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { ExtHostExtensionService } from 'vs/workbench/api/node/extHostExtensionService';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import vscode = require('vscode');
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
/**
 * This class implements the API described in vscode.d.ts,
 * for the case of the extensionHost host process
 */
export declare class ExtHostAPIImplementation {
    version: typeof vscode.version;
    env: typeof vscode.env;
    Uri: typeof vscode.Uri;
    Location: typeof vscode.Location;
    Diagnostic: typeof vscode.Diagnostic;
    DiagnosticSeverity: typeof vscode.DiagnosticSeverity;
    Disposable: typeof vscode.Disposable;
    TextEdit: typeof vscode.TextEdit;
    WorkspaceEdit: typeof vscode.WorkspaceEdit;
    ViewColumn: typeof vscode.ViewColumn;
    StatusBarAlignment: typeof vscode.StatusBarAlignment;
    Position: typeof vscode.Position;
    Range: typeof vscode.Range;
    Selection: typeof vscode.Selection;
    CancellationTokenSource: typeof vscode.CancellationTokenSource;
    EventEmitter: typeof vscode.EventEmitter;
    Hover: typeof vscode.Hover;
    DocumentHighlightKind: typeof vscode.DocumentHighlightKind;
    DocumentHighlight: typeof vscode.DocumentHighlight;
    SymbolKind: typeof vscode.SymbolKind;
    SymbolInformation: typeof vscode.SymbolInformation;
    CodeLens: typeof vscode.CodeLens;
    ParameterInformation: typeof vscode.ParameterInformation;
    SignatureInformation: typeof vscode.SignatureInformation;
    SignatureHelp: typeof vscode.SignatureHelp;
    CompletionItem: typeof vscode.CompletionItem;
    CompletionItemKind: typeof vscode.CompletionItemKind;
    CompletionList: typeof vscode.CompletionList;
    DocumentLink: typeof vscode.DocumentLink;
    IndentAction: typeof vscode.IndentAction;
    OverviewRulerLane: typeof vscode.OverviewRulerLane;
    TextEditorRevealType: typeof vscode.TextEditorRevealType;
    EndOfLine: typeof vscode.EndOfLine;
    TextEditorCursorStyle: typeof vscode.TextEditorCursorStyle;
    commands: typeof vscode.commands;
    window: typeof vscode.window;
    workspace: typeof vscode.workspace;
    languages: typeof vscode.languages;
    extensions: typeof vscode.extensions;
    constructor(threadService: IThreadService, extensionService: ExtHostExtensionService, contextService: IWorkspaceContextService, telemetryService: ITelemetryService);
}
export declare function defineAPI(impl: typeof vscode): void;
