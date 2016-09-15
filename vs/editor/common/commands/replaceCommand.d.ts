import { Selection } from 'vs/editor/common/core/selection';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { Range } from 'vs/editor/common/core/range';
export declare class ReplaceCommand implements editorCommon.ICommand {
    private _range;
    private _text;
    constructor(range: Range, text: string);
    getText(): string;
    getRange(): Range;
    setRange(newRange: Range): void;
    getEditOperations(model: editorCommon.ITokenizedModel, builder: editorCommon.IEditOperationBuilder): void;
    computeCursorState(model: editorCommon.ITokenizedModel, helper: editorCommon.ICursorStateComputerData): Selection;
}
export declare class ReplaceCommandWithoutChangingPosition extends ReplaceCommand {
    constructor(range: Range, text: string);
    computeCursorState(model: editorCommon.ITokenizedModel, helper: editorCommon.ICursorStateComputerData): Selection;
}
export declare class ReplaceCommandWithOffsetCursorState extends ReplaceCommand {
    private _columnDeltaOffset;
    private _lineNumberDeltaOffset;
    constructor(range: Range, text: string, lineNumberDeltaOffset: number, columnDeltaOffset: number);
    computeCursorState(model: editorCommon.ITokenizedModel, helper: editorCommon.ICursorStateComputerData): Selection;
}
export declare class ReplaceCommandThatPreservesSelection extends ReplaceCommand {
    private _initialSelection;
    private _selectionId;
    constructor(editRange: Range, text: string, initialSelection: Selection);
    getEditOperations(model: editorCommon.ITokenizedModel, builder: editorCommon.IEditOperationBuilder): void;
    computeCursorState(model: editorCommon.ITokenizedModel, helper: editorCommon.ICursorStateComputerData): Selection;
}
