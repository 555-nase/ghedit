import * as editorCommon from 'vs/editor/common/editorCommon';
import { ICodeEditor } from 'vs/editor/browser/editorBrowser';
export declare class FoldingController implements editorCommon.IEditorContribution {
    static ID: string;
    static MAX_FOLDING_REGIONS: number;
    static getFoldingController(editor: editorCommon.ICommonCodeEditor): FoldingController;
    private editor;
    private _isEnabled;
    private globalToDispose;
    private computeToken;
    private cursorChangedScheduler;
    private contentChangedScheduler;
    private localToDispose;
    private decorations;
    constructor(editor: ICodeEditor);
    getId(): string;
    dispose(): void;
    /**
     * Store view state.
     */
    saveViewState(): any;
    /**
     * Restore view state.
     */
    restoreViewState(state: any): void;
    private cleanState();
    private applyRegions(regions);
    private onModelChanged();
    private computeCollapsibleRegions();
    private revealCursor();
    private mouseDownInfo;
    private onEditorMouseDown(e);
    private onEditorMouseUp(e);
    private updateHiddenAreas(focusLine);
    unfold(): void;
    fold(): void;
    foldUnfoldRecursively(isFold: boolean): void;
    changeAll(collapse: boolean): void;
    foldLevel(foldLevel: number, selectedLineNumbers: number[]): void;
}
