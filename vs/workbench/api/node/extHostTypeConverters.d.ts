import { ExtHostCommands } from 'vs/workbench/api/node/extHostCommands';
import Severity from 'vs/base/common/severity';
import { IDisposable } from 'vs/base/common/lifecycle';
import * as modes from 'vs/editor/common/modes';
import * as types from './extHostTypes';
import { Position as EditorPosition } from 'vs/platform/editor/common/editor';
import { IPosition, ISelection, IRange, IDecorationOptions, ISingleEditOperation } from 'vs/editor/common/editorCommon';
import { ITypeBearing } from 'vs/workbench/parts/search/common/search';
import * as vscode from 'vscode';
export interface PositionLike {
    line: number;
    character: number;
}
export interface RangeLike {
    start: PositionLike;
    end: PositionLike;
}
export interface SelectionLike extends RangeLike {
    anchor: PositionLike;
    active: PositionLike;
}
export declare function toSelection(selection: ISelection): types.Selection;
export declare function fromSelection(selection: SelectionLike): ISelection;
export declare function fromRange(range: RangeLike): IRange;
export declare function toRange(range: IRange): types.Range;
export declare function toPosition(position: IPosition): types.Position;
export declare function fromPosition(position: types.Position): IPosition;
export declare function fromDiagnosticSeverity(value: number): Severity;
export declare function toDiagnosticSeverty(value: Severity): types.DiagnosticSeverity;
export declare function fromViewColumn(column?: vscode.ViewColumn): EditorPosition;
export declare function toViewColumn(position?: EditorPosition): vscode.ViewColumn;
export declare function fromRangeOrRangeWithMessage(ranges: vscode.Range[] | vscode.DecorationOptions[]): IDecorationOptions[];
export declare const TextEdit: {
    from(edit: vscode.TextEdit): ISingleEditOperation;
    to(edit: ISingleEditOperation): vscode.TextEdit;
};
export declare namespace SymbolInformation {
    function fromOutlineEntry(entry: modes.SymbolInformation): types.SymbolInformation;
    function toOutlineEntry(symbol: vscode.SymbolInformation): modes.SymbolInformation;
}
export declare function fromSymbolInformation(info: vscode.SymbolInformation): ITypeBearing;
export declare function toSymbolInformation(bearing: ITypeBearing): types.SymbolInformation;
export declare const location: {
    from(value: types.Location): modes.Location;
    to(value: modes.Location): types.Location;
};
export declare function fromHover(hover: vscode.Hover): modes.Hover;
export declare function toHover(info: modes.Hover): types.Hover;
export declare function toDocumentHighlight(occurrence: modes.DocumentHighlight): types.DocumentHighlight;
export declare const CompletionItemKind: {
    from(kind: types.CompletionItemKind): "method" | "function" | "constructor" | "field" | "variable" | "class" | "interface" | "module" | "property" | "unit" | "value" | "enum" | "keyword" | "snippet" | "text" | "color" | "file" | "reference" | "customcolor";
    to(type: "method" | "function" | "constructor" | "field" | "variable" | "class" | "interface" | "module" | "property" | "unit" | "value" | "enum" | "keyword" | "snippet" | "text" | "color" | "file" | "reference" | "customcolor"): types.CompletionItemKind;
};
export declare const Suggest: {
    from(item: vscode.CompletionItem): modes.ISuggestion;
    to(container: modes.ISuggestResult, position: types.Position, suggestion: modes.ISuggestion): types.CompletionItem;
};
export declare namespace SignatureHelp {
    function from(signatureHelp: types.SignatureHelp): modes.SignatureHelp;
    function to(hints: modes.SignatureHelp): types.SignatureHelp;
}
export declare namespace DocumentLink {
    function from(link: types.DocumentLink): modes.ILink;
    function to(link: modes.ILink): types.DocumentLink;
}
export declare namespace Command {
    function initialize(commands: ExtHostCommands): types.Disposable;
    function from(command: vscode.Command, disposables: IDisposable[]): modes.Command;
    function to(command: modes.Command): vscode.Command;
}
