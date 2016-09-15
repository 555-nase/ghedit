import EditorCommon = require('vs/editor/common/editorCommon');
import Event from 'vs/base/common/event';
import { IEditor } from 'vs/platform/editor/common/editor';
import { ICodeEditorService } from 'vs/editor/common/services/codeEditorService';
import { IModelService } from 'vs/editor/common/services/modelService';
import { Selection } from 'vs/editor/common/core/selection';
import { EndOfLine } from 'vs/workbench/api/node/extHostTypes';
export interface ITextEditorConfigurationUpdate {
    tabSize?: number | string;
    insertSpaces?: boolean | string;
    cursorStyle?: EditorCommon.TextEditorCursorStyle;
}
export interface IResolvedTextEditorConfiguration {
    tabSize: number;
    insertSpaces: boolean;
    cursorStyle: EditorCommon.TextEditorCursorStyle;
}
export interface ISelectionChangeEvent {
    selections: Selection[];
    source?: string;
}
export interface IFocusTracker {
    onGainedFocus(): void;
    onLostFocus(): void;
}
export declare enum TextEditorRevealType {
    Default = 0,
    InCenter = 1,
    InCenterIfOutsideViewport = 2,
}
/**
 * Text Editor that is permanently bound to the same model.
 * It can be bound or not to a CodeEditor.
 */
export declare class MainThreadTextEditor {
    private _id;
    private _model;
    private _modelService;
    private _modelListeners;
    private _codeEditor;
    private _focusTracker;
    private _codeEditorListeners;
    private _lastSelection;
    private _configuration;
    private _onSelectionChanged;
    private _onConfigurationChanged;
    constructor(id: string, model: EditorCommon.IModel, codeEditor: EditorCommon.ICommonCodeEditor, focusTracker: IFocusTracker, modelService: IModelService);
    dispose(): void;
    getId(): string;
    getModel(): EditorCommon.IModel;
    hasCodeEditor(codeEditor: EditorCommon.ICommonCodeEditor): boolean;
    setCodeEditor(codeEditor: EditorCommon.ICommonCodeEditor): void;
    isVisible(): boolean;
    onSelectionChanged: Event<ISelectionChangeEvent>;
    onConfigurationChanged: Event<IResolvedTextEditorConfiguration>;
    getSelections(): Selection[];
    setSelections(selections: EditorCommon.ISelection[]): void;
    getConfiguration(): IResolvedTextEditorConfiguration;
    private _setIndentConfiguration(newConfiguration);
    setConfiguration(newConfiguration: ITextEditorConfigurationUpdate): void;
    setDecorations(key: string, ranges: EditorCommon.IDecorationOptions[]): void;
    revealRange(range: EditorCommon.IRange, revealType: TextEditorRevealType): void;
    private _readConfiguration(model, codeEditor);
    private _setConfiguration(newConfiguration);
    isFocused(): boolean;
    matches(editor: IEditor): boolean;
    applyEdits(versionIdCheck: number, edits: EditorCommon.ISingleEditOperation[], setEndOfLine: EndOfLine): boolean;
}
/**
 * Keeps track of what goes on in the main thread and maps models => text editors
 */
export declare class MainThreadEditorsTracker {
    private static _Ids;
    private _toDispose;
    private _codeEditorService;
    private _modelService;
    private _updateMapping;
    private _editorModelChangeListeners;
    private _model2TextEditors;
    private _focusedTextEditorId;
    private _visibleTextEditorIds;
    private _onTextEditorAdd;
    private _onTextEditorRemove;
    private _onDidChangeFocusedTextEditor;
    private _onDidUpdateTextEditors;
    private _focusTracker;
    constructor(editorService: ICodeEditorService, modelService: IModelService);
    dispose(): void;
    private _onModelAdded(model);
    private _onModelRemoved(model);
    private _onCodeEditorAdd(codeEditor);
    private _onCodeEditorRemove(codeEditor);
    private _doUpdateMapping();
    private _updateFocusedTextEditor();
    private _findFocusedTextEditorId();
    private _findVisibleTextEditorIds();
    private _setFocusedTextEditorId(focusedTextEditorId);
    private _printState();
    private _getVisibleModels();
    getFocusedTextEditorId(): string;
    getVisibleTextEditorIds(): string[];
    onTextEditorAdd: Event<MainThreadTextEditor>;
    onTextEditorRemove: Event<MainThreadTextEditor>;
    onDidUpdateTextEditors: Event<void>;
    onChangedFocusedTextEditor: Event<string>;
    findTextEditorIdFor(codeEditor: EditorCommon.ICommonCodeEditor): string;
    registerTextEditorDecorationType(key: string, options: EditorCommon.IDecorationRenderOptions): void;
    removeTextEditorDecorationType(key: string): void;
}
