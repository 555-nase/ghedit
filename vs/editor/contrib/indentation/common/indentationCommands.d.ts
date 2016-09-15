import { ICommand, ICursorStateComputerData, IEditOperationBuilder, ITokenizedModel } from 'vs/editor/common/editorCommon';
import { Selection } from 'vs/editor/common/core/selection';
export declare class IndentationToSpacesCommand implements ICommand {
    private selection;
    private tabSize;
    private selectionId;
    constructor(selection: Selection, tabSize: number);
    getEditOperations(model: ITokenizedModel, builder: IEditOperationBuilder): void;
    computeCursorState(model: ITokenizedModel, helper: ICursorStateComputerData): Selection;
}
export declare class IndentationToTabsCommand implements ICommand {
    private selection;
    private tabSize;
    private selectionId;
    constructor(selection: Selection, tabSize: number);
    getEditOperations(model: ITokenizedModel, builder: IEditOperationBuilder): void;
    computeCursorState(model: ITokenizedModel, helper: ICursorStateComputerData): Selection;
}
