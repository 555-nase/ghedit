import { Range } from 'vs/editor/common/core/range';
import { Selection } from 'vs/editor/common/core/selection';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { Position } from 'vs/editor/common/core/position';
export interface IConverter {
    validateViewPosition(viewLineNumber: number, viewColumn: number, modelPosition: Position): Position;
    validateViewSelection(viewSelection: Selection, modelSelection: Selection): Selection;
    convertModelSelectionToViewSelection(modelSelection: Selection): Selection;
    convertModelRangeToViewRange(modelRange: editorCommon.IRange): Range;
}
export declare class ViewModelCursors {
    private configuration;
    private converter;
    private lastCursorPositionChangedEvent;
    private lastCursorSelectionChangedEvent;
    constructor(configuration: editorCommon.IConfiguration, converter: IConverter);
    getSelections(): Selection[];
    onCursorPositionChanged(e: editorCommon.ICursorPositionChangedEvent, emit: (eventType: string, payload: any) => void): void;
    onCursorSelectionChanged(e: editorCommon.ICursorSelectionChangedEvent, emit: (eventType: string, payload: any) => void): void;
    onCursorRevealRange(e: editorCommon.ICursorRevealRangeEvent, emit: (eventType: string, payload: any) => void): void;
    onCursorScrollRequest(e: editorCommon.ICursorScrollRequestEvent, emit: (eventType: string, payload: any) => void): void;
    onLineMappingChanged(emit: (eventType: string, payload: any) => void): void;
}
