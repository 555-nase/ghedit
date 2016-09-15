import { IOneCursorState, IViewModelHelper, OneCursor } from 'vs/editor/common/controller/oneCursor';
import { Selection } from 'vs/editor/common/core/selection';
import { IConfiguration, IModel, ISelection } from 'vs/editor/common/editorCommon';
import { Position } from 'vs/editor/common/core/position';
export interface ICursorCollectionState {
    primary: IOneCursorState;
    secondary: IOneCursorState[];
}
export declare class CursorCollection {
    private editorId;
    private model;
    private configuration;
    private modeConfiguration;
    private primaryCursor;
    private secondaryCursors;
    private lastAddedCursorIndex;
    private viewModelHelper;
    constructor(editorId: number, model: IModel, configuration: IConfiguration, viewModelHelper: IViewModelHelper);
    dispose(): void;
    saveState(): ICursorCollectionState;
    restoreState(state: ICursorCollectionState): void;
    updateMode(): void;
    getAll(): OneCursor[];
    getPosition(index: number): Position;
    getViewPosition(index: number): Position;
    getPositions(): Position[];
    getViewPositions(): Position[];
    getSelection(index: number): Selection;
    getSelections(): Selection[];
    getViewSelections(): Selection[];
    setSelections(selections: ISelection[], viewSelections?: ISelection[]): void;
    killSecondaryCursors(): boolean;
    normalize(): void;
    addSecondaryCursor(selection: ISelection): void;
    duplicateCursors(): void;
    getLastAddedCursor(): OneCursor;
    /**
     * Creates or disposes secondary cursors as necessary to match the number of `secondarySelections`.
     * Return value:
     * 		- a positive number indicates the number of secondary cursors added
     * 		- a negative number indicates the number of secondary cursors removed
     * 		- 0 indicates that no changes have been done to the secondary cursors list
     */
    private _setSecondarySelections(secondarySelections);
    private _removeSecondaryCursor(removeIndex);
    private _mergeCursorsIfNecessary();
    private getModeConfiguration();
}
