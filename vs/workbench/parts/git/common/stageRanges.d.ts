import { IChange, IModel } from 'vs/editor/common/editorCommon';
import { Selection } from 'vs/editor/common/core/selection';
/**
 * Returns an intersection between a change and a selection.
 * Returns null if intersection does not exist.
 */
export declare function intersectChangeAndSelection(change: IChange, selection: Selection): IChange;
/**
 * Returns all selected changes (there can be multiple selections due to multiple cursors).
 * If a change is partially selected, the selected part of the change will be returned.
 */
export declare function getSelectedChanges(changes: IChange[], selections: Selection[]): IChange[];
/**
 * Applies a list of changes to the original model and returns the new IModel.
 * First sorts changes by line number.
 */
export declare function applyChangesToModel(original: IModel, modified: IModel, changes: IChange[]): string;
