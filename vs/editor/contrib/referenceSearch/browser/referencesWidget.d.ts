import 'vs/css!./referencesWidget';
import Event from 'vs/base/common/event';
import { TPromise } from 'vs/base/common/winjs.base';
import { IEditorService } from 'vs/platform/editor/common/editor';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { ICodeEditor } from 'vs/editor/browser/editorBrowser';
import { PeekViewWidget } from 'vs/editor/contrib/zoneWidget/browser/peekViewWidget';
import { OneReference, ReferencesModel } from './referencesModel';
export interface LayoutData {
    ratio: number;
    heightInLines: number;
}
export interface SelectionEvent {
    kind: 'goto' | 'show' | 'side' | 'open';
    source: 'editor' | 'tree' | 'title';
    element: OneReference;
}
/**
 * ZoneWidget that is shown inside the editor
 */
export declare class ReferenceWidget extends PeekViewWidget {
    layoutData: LayoutData;
    private _editorService;
    private _contextService;
    private _instantiationService;
    static INNER_EDITOR_CONTEXT_KEY: string;
    private _model;
    private _decorationsManager;
    private _disposeOnNewModel;
    private _onDidSelectReference;
    private _tree;
    private _treeContainer;
    private _sash;
    private _preview;
    private _previewNotAvailableMessage;
    private _previewContainer;
    private _messageContainer;
    constructor(editor: ICodeEditor, layoutData: LayoutData, _editorService: IEditorService, _contextService: IWorkspaceContextService, _instantiationService: IInstantiationService);
    dispose(): void;
    onDidSelectReference: Event<SelectionEvent>;
    show(where: editorCommon.IRange): void;
    focus(): void;
    protected _onTitleClick(e: MouseEvent): void;
    protected _fillBody(containerElement: HTMLElement): void;
    protected _doLayoutBody(heightInPixel: number, widthInPixel: number): void;
    _onWidth(widthInPixel: number): void;
    setSelection(selection: OneReference): TPromise<any>;
    setModel(newModel: ReferencesModel): TPromise<any>;
    private _onNewModel();
    private _getFocusedReference();
    private _revealReference(reference);
}
