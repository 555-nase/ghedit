import { Position } from 'vs/editor/common/core/position';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { ILinesCollection } from 'vs/editor/common/viewModel/viewModelImpl';
import { ViewLineTokens } from 'vs/editor/common/core/viewLineToken';
export declare class OutputPosition {
    _outputPositionBrand: void;
    outputLineIndex: number;
    outputOffset: number;
    constructor(outputLineIndex: number, outputOffset: number);
}
export interface ILineMapping {
    getOutputLineCount(): number;
    getWrappedLinesIndent(): string;
    getInputOffsetOfOutputPosition(outputLineIndex: number, outputOffset: number): number;
    getOutputPositionOfInputOffset(inputOffset: number): OutputPosition;
}
export interface ILineMapperFactory {
    createLineMapping(lineText: string, tabSize: number, wrappingColumn: number, columnsForFullWidthChar: number, wrappingIndent: editorCommon.WrappingIndent): ILineMapping;
}
export interface IModel {
    getLineTokens(lineNumber: number, inaccurateTokensAcceptable: boolean): editorCommon.ILineTokens;
    getLineContent(lineNumber: number): string;
    getLineMinColumn(lineNumber: number): number;
    getLineMaxColumn(lineNumber: number): number;
}
export interface ISplitLine {
    isVisible(): boolean;
    setVisible(isVisible: boolean): void;
    getOutputLineCount(): number;
    getOutputLineContent(model: IModel, myLineNumber: number, outputLineIndex: number): string;
    getOutputLineMinColumn(model: IModel, myLineNumber: number, outputLineIndex: number): number;
    getOutputLineMaxColumn(model: IModel, myLineNumber: number, outputLineIndex: number): number;
    getOutputLineTokens(model: IModel, myLineNumber: number, outputLineIndex: number): ViewLineTokens;
    getInputColumnOfOutputPosition(outputLineIndex: number, outputColumn: number): number;
    getOutputPositionOfInputPosition(deltaLineNumber: number, inputColumn: number): Position;
}
export declare class SplitLine implements ISplitLine {
    private positionMapper;
    private outputLineCount;
    private wrappedIndent;
    private wrappedIndentLength;
    private _isVisible;
    constructor(positionMapper: ILineMapping, isVisible: boolean);
    isVisible(): boolean;
    setVisible(isVisible: boolean): void;
    getOutputLineCount(): number;
    private getInputStartOffsetOfOutputLineIndex(outputLineIndex);
    private getInputEndOffsetOfOutputLineIndex(model, myLineNumber, outputLineIndex);
    getOutputLineContent(model: IModel, myLineNumber: number, outputLineIndex: number): string;
    getOutputLineMinColumn(model: IModel, myLineNumber: number, outputLineIndex: number): number;
    getOutputLineMaxColumn(model: IModel, myLineNumber: number, outputLineIndex: number): number;
    getOutputLineTokens(model: IModel, myLineNumber: number, outputLineIndex: number): ViewLineTokens;
    getInputColumnOfOutputPosition(outputLineIndex: number, outputColumn: number): number;
    getOutputPositionOfInputPosition(deltaLineNumber: number, inputColumn: number): Position;
}
export declare class SplitLinesCollection implements ILinesCollection {
    private model;
    private _validModelVersionId;
    private wrappingColumn;
    private columnsForFullWidthChar;
    private wrappingIndent;
    private tabSize;
    private lines;
    private prefixSumComputer;
    private linePositionMapperFactory;
    private hiddenAreasIds;
    constructor(model: editorCommon.IModel, linePositionMapperFactory: ILineMapperFactory, tabSize: number, wrappingColumn: number, columnsForFullWidthChar: number, wrappingIndent: editorCommon.WrappingIndent);
    dispose(): void;
    private _ensureValidState();
    private _constructLines(resetHiddenAreas);
    private getHiddenAreas();
    private _reduceRanges(_ranges);
    setHiddenAreas(_ranges: editorCommon.IRange[], emit: (evenType: string, payload: any) => void): boolean;
    inputPositionIsVisible(inputLineNumber: number, inputColumn: number): boolean;
    setTabSize(newTabSize: number, emit: (evenType: string, payload: any) => void): boolean;
    setWrappingIndent(newWrappingIndent: editorCommon.WrappingIndent, emit: (evenType: string, payload: any) => void): boolean;
    setWrappingColumn(newWrappingColumn: number, columnsForFullWidthChar: number, emit: (evenType: string, payload: any) => void): boolean;
    onModelFlushed(versionId: number, emit: (evenType: string, payload: any) => void): void;
    onModelLinesDeleted(versionId: number, fromLineNumber: number, toLineNumber: number, emit: (evenType: string, payload: any) => void): void;
    onModelLinesInserted(versionId: number, fromLineNumber: number, toLineNumber: number, text: string[], emit: (evenType: string, payload: any) => void): void;
    onModelLineChanged(versionId: number, lineNumber: number, newText: string, emit: (evenType: string, payload: any) => void): boolean;
    getOutputLineCount(): number;
    private _toValidOutputLineNumber(outputLineNumber);
    getOutputLineContent(outputLineNumber: number): string;
    getOutputIndentGuide(outputLineNumber: number): number;
    getOutputLineMinColumn(outputLineNumber: number): number;
    getOutputLineMaxColumn(outputLineNumber: number): number;
    getOutputLineTokens(outputLineNumber: number): ViewLineTokens;
    convertOutputPositionToInputPosition(viewLineNumber: number, viewColumn: number): Position;
    convertInputPositionToOutputPosition(_inputLineNumber: number, _inputColumn: number): Position;
}
