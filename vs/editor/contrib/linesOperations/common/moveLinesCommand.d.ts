import { Selection } from 'vs/editor/common/core/selection';
import { ICommand, ICursorStateComputerData, IEditOperationBuilder, ITokenizedModel } from 'vs/editor/common/editorCommon';
export declare class MoveLinesCommand implements ICommand {
    private _selection;
    private _isMovingDown;
    private _selectionId;
    private _moveEndPositionDown;
    constructor(selection: Selection, isMovingDown: boolean);
    getEditOperations(model: ITokenizedModel, builder: IEditOperationBuilder): void;
    computeCursorState(model: ITokenizedModel, helper: ICursorStateComputerData): Selection;
}
