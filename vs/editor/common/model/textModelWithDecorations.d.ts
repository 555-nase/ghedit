import { TPromise } from 'vs/base/common/winjs.base';
import { Range } from 'vs/editor/common/core/range';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { TextModelWithTrackedRanges } from 'vs/editor/common/model/textModelWithTrackedRanges';
import { IMode } from 'vs/editor/common/modes';
export declare class DeferredEventsBuilder {
    changedMarkers: {
        [markerId: string]: boolean;
    };
    oldDecorationRange: {
        [decorationId: string]: editorCommon.IRange;
    };
    oldDecorationOptions: {
        [decorationId: string]: editorCommon.IModelDecorationOptions;
    };
    newOrChangedDecorations: {
        [decorationId: string]: boolean;
    };
    removedDecorations: {
        [decorationId: string]: boolean;
    };
    constructor();
    addNewDecoration(id: string): void;
    addRemovedDecoration(id: string, ownerId: number, range: editorCommon.IRange, options: editorCommon.IModelDecorationOptions): void;
    addMovedDecoration(id: string, oldRange: editorCommon.IRange): void;
    addUpdatedDecoration(id: string, oldOptions: editorCommon.IModelDecorationOptions): void;
}
export declare class TextModelWithDecorations extends TextModelWithTrackedRanges implements editorCommon.ITextModelWithDecorations {
    private _currentDeferredEvents;
    private _decorationIdGenerator;
    private decorations;
    private rangeIdToDecorationId;
    constructor(allowedEventTypes: string[], rawText: editorCommon.IRawText, modeOrPromise: IMode | TPromise<IMode>);
    dispose(): void;
    _resetValue(e: editorCommon.IModelContentChangedFlushEvent, newValue: editorCommon.IRawText): void;
    changeDecorations(callback: (changeAccessor: editorCommon.IModelDecorationsChangeAccessor) => any, ownerId?: number): any;
    deltaDecorations(oldDecorations: string[], newDecorations: editorCommon.IModelDeltaDecoration[], ownerId?: number): string[];
    removeAllDecorationsWithOwnerId(ownerId: number): void;
    getDecorationOptions(decorationId: string): editorCommon.IModelDecorationOptions;
    getDecorationRange(decorationId: string): Range;
    getLineDecorations(lineNumber: number, ownerId?: number, filterOutValidation?: boolean): editorCommon.IModelDecoration[];
    private _getDecorationsInRange(startLineNumber, startColumn, endLineNumber, endColumn, ownerId, filterOutValidation);
    getLinesDecorations(startLineNumber: number, endLineNumber: number, ownerId?: number, filterOutValidation?: boolean): editorCommon.IModelDecoration[];
    getDecorationsInRange(range: editorCommon.IRange, ownerId?: number, filterOutValidation?: boolean): editorCommon.IModelDecoration[];
    getAllDecorations(ownerId?: number, filterOutValidation?: boolean): editorCommon.IModelDecoration[];
    _withDeferredEvents(callback: (deferredEventsBuilder: DeferredEventsBuilder) => any): any;
    private _handleCollectedEvents(b);
    private _onChangedRanges(eventBuilder, changedRanges);
    private _handleCollectedDecorationsEvents(b);
    private _getDecorationData(decorationId);
    private emitModelDecorationsChangedEvent(e);
    private _normalizeDeltaDecorations(deltaDecorations);
    private _addDecorationImpl(eventBuilder, ownerId, range, options);
    private _addDecorationsImpl(eventBuilder, ownerId, newDecorations);
    private _changeDecorationImpl(eventBuilder, id, newRange);
    private _changeDecorationOptionsImpl(eventBuilder, id, options);
    private _removeDecorationImpl(eventBuilder, id);
    private _removeDecorationsImpl(eventBuilder, ids);
    private _resolveOldDecorations(oldDecorations);
    private _deltaDecorationsImpl(eventBuilder, ownerId, oldDecorationsIds, newDecorations);
}
