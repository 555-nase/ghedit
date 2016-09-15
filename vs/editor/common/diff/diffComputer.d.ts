import { ILineChange } from 'vs/editor/common/editorCommon';
export interface IDiffComputerOpts {
    shouldPostProcessCharChanges: boolean;
    shouldIgnoreTrimWhitespace: boolean;
    shouldConsiderTrimWhitespaceInEmptyCase: boolean;
}
export declare class DiffComputer {
    private shouldPostProcessCharChanges;
    private shouldIgnoreTrimWhitespace;
    private maximumRunTimeMs;
    private original;
    private modified;
    private computationStartTime;
    constructor(originalLines: string[], modifiedLines: string[], opts: IDiffComputerOpts);
    computeDiff(): ILineChange[];
    private _continueProcessingPredicate();
}
