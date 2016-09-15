import { TPromise } from 'vs/base/common/winjs.base';
import { Position } from 'vs/editor/common/core/position';
import { IModelContentChangedFlushEvent, IRawText, IReadOnlyLineMarker, ITextModelWithMarkers } from 'vs/editor/common/editorCommon';
import { ILineMarker, ModelLine } from 'vs/editor/common/model/modelLine';
import { TextModelWithTokens } from 'vs/editor/common/model/textModelWithTokens';
import { IMode } from 'vs/editor/common/modes';
export interface IMarkerIdToMarkerMap {
    [key: string]: ILineMarker;
}
export interface INewMarker {
    lineNumber: number;
    column: number;
    stickToPreviousCharacter: boolean;
}
export declare class LineMarker implements ILineMarker {
    id: string;
    column: number;
    stickToPreviousCharacter: boolean;
    oldLineNumber: number;
    oldColumn: number;
    line: ModelLine;
    constructor(id: string, column: number, stickToPreviousCharacter: boolean);
    toString(): string;
}
export declare class TextModelWithMarkers extends TextModelWithTokens implements ITextModelWithMarkers {
    private _markerIdGenerator;
    protected _markerIdToMarker: IMarkerIdToMarkerMap;
    constructor(allowedEventTypes: string[], rawText: IRawText, modeOrPromise: IMode | TPromise<IMode>);
    dispose(): void;
    _resetValue(e: IModelContentChangedFlushEvent, newValue: IRawText): void;
    _addMarker(lineNumber: number, column: number, stickToPreviousCharacter: boolean): string;
    protected _addMarkers(newMarkers: INewMarker[]): string[];
    _changeMarker(id: string, lineNumber: number, column: number): void;
    _changeMarkerStickiness(id: string, newStickToPreviousCharacter: boolean): void;
    _getMarker(id: string): Position;
    _getMarkersCount(): number;
    _getLineMarkers(lineNumber: number): IReadOnlyLineMarker[];
    _removeMarker(id: string): void;
    protected _removeMarkers(ids: string[]): void;
    _getMarkersInMap(markersMap: {
        [markerId: string]: boolean;
    }): ILineMarker[];
}
