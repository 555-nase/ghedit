import Event from 'vs/base/common/event';
import { TPromise } from 'vs/base/common/winjs.base';
import { IThreadService } from 'vs/workbench/services/thread/common/threadService';
import { ExtHostDocuments } from 'vs/workbench/api/node/extHostDocuments';
import { Selection, Range, Position, EndOfLine } from './extHostTypes';
import { IResolvedTextEditorConfiguration, ISelectionChangeEvent } from 'vs/workbench/api/node/mainThreadEditorsTracker';
import { TextDocument, TextEditorSelectionChangeEvent, TextEditorOptionsChangeEvent, TextEditorViewColumnChangeEvent, ViewColumn } from 'vscode';
import { ExtHostEditorsShape, ITextEditorAddData, ITextEditorPositionData } from './extHost.protocol';
export declare class ExtHostEditors extends ExtHostEditorsShape {
    onDidChangeTextEditorSelection: Event<TextEditorSelectionChangeEvent>;
    private _onDidChangeTextEditorSelection;
    onDidChangeTextEditorOptions: Event<TextEditorOptionsChangeEvent>;
    private _onDidChangeTextEditorOptions;
    onDidChangeTextEditorViewColumn: Event<TextEditorViewColumnChangeEvent>;
    private _onDidChangeTextEditorViewColumn;
    private _editors;
    private _proxy;
    private _onDidChangeActiveTextEditor;
    private _extHostDocuments;
    private _activeEditorId;
    private _visibleEditorIds;
    constructor(threadService: IThreadService, extHostDocuments: ExtHostDocuments);
    getActiveTextEditor(): vscode.TextEditor;
    getVisibleTextEditors(): vscode.TextEditor[];
    onDidChangeActiveTextEditor: Event<vscode.TextEditor>;
    showTextDocument(document: TextDocument, column: ViewColumn, preserveFocus: boolean): TPromise<vscode.TextEditor>;
    createTextEditorDecorationType(options: vscode.DecorationRenderOptions): vscode.TextEditorDecorationType;
    $acceptTextEditorAdd(data: ITextEditorAddData): void;
    $acceptOptionsChanged(id: string, opts: IResolvedTextEditorConfiguration): void;
    $acceptSelectionsChanged(id: string, event: ISelectionChangeEvent): void;
    $acceptActiveEditorAndVisibleEditors(id: string, visibleIds: string[]): void;
    $acceptEditorPositionData(data: ITextEditorPositionData): void;
    $acceptTextEditorRemove(id: string): void;
}
export interface ITextEditOperation {
    range: Range;
    text: string;
    forceMoveMarkers: boolean;
}
export interface IEditData {
    documentVersionId: number;
    edits: ITextEditOperation[];
    setEndOfLine: EndOfLine;
}
export declare class TextEditorEdit {
    private _documentVersionId;
    private _collectedEdits;
    private _setEndOfLine;
    constructor(document: vscode.TextDocument);
    finalize(): IEditData;
    replace(location: Position | Range | Selection, value: string): void;
    insert(location: Position, value: string): void;
    delete(location: Range | Selection): void;
    setEndOfLine(endOfLine: EndOfLine): void;
}
