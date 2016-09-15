import { IDisposable } from 'vs/base/common/lifecycle';
import { Range } from 'vs/editor/common/core/range';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { IDecorationsViewportData } from 'vs/editor/common/viewModel/viewModel';
export interface IModelRangeToViewRangeConverter {
    convertModelRangeToViewRange(modelRange: editorCommon.IRange, isWholeLine: boolean): Range;
}
export declare class ViewModelDecorations implements IDisposable {
    private editorId;
    private configuration;
    private converter;
    private decorations;
    private _cachedModelDecorationsResolver;
    private _cachedModelDecorationsResolverStartLineNumber;
    private _cachedModelDecorationsResolverEndLineNumber;
    constructor(editorId: number, configuration: editorCommon.IConfiguration, converter: IModelRangeToViewRangeConverter);
    private _clearCachedModelDecorationsResolver();
    dispose(): void;
    static compareDecorations(a: editorCommon.IModelDecoration, b: editorCommon.IModelDecoration): number;
    reset(model: editorCommon.IModel): void;
    onModelDecorationsChanged(e: editorCommon.IModelDecorationsChangedEvent, emit: (eventType: string, payload: any) => void): void;
    onLineMappingChanged(emit: (eventType: string, payload: any) => void): void;
    getAllDecorations(): editorCommon.IModelDecoration[];
    getDecorationsViewportData(startLineNumber: number, endLineNumber: number): IDecorationsViewportData;
    private _getDecorationsViewportData(startLineNumber, endLineNumber);
}
