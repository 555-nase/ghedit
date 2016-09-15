import URI from 'vs/base/common/uri';
import { TPromise } from 'vs/base/common/winjs.base';
import { IDisposable } from 'vs/base/common/lifecycle';
import { IRequestHandler } from 'vs/base/common/worker/simpleWorker';
import { Range } from 'vs/editor/common/core/range';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { MirrorModel2 } from 'vs/editor/common/model/mirrorModel2';
import { IInplaceReplaceSupportResult, ILink, ISuggestResult } from 'vs/editor/common/modes';
import { IRawModelData } from 'vs/editor/common/services/editorSimpleWorkerCommon';
export interface IMirrorModel {
    uri: URI;
    version: number;
    getValue(): string;
}
export interface IWorkerContext {
    /**
     * Get all available mirror models in this worker.
     */
    getMirrorModels(): IMirrorModel[];
}
/**
 * @internal
 */
export interface ICommonModel {
    uri: URI;
    version: number;
    getValue(): string;
    getLinesContent(): string[];
    getLineCount(): number;
    getLineContent(lineNumber: number): string;
    getWordUntilPosition(position: editorCommon.IPosition, wordDefinition: RegExp): editorCommon.IWordAtPosition;
    getAllUniqueWords(wordDefinition: RegExp, skipWordOnce?: string): string[];
    getValueInRange(range: editorCommon.IRange): string;
    getWordAtPosition(position: editorCommon.IPosition, wordDefinition: RegExp): Range;
}
/**
 * @internal
 */
export declare class MirrorModel extends MirrorModel2 implements ICommonModel {
    uri: URI;
    version: number;
    getValue(): string;
    getLinesContent(): string[];
    getLineCount(): number;
    getLineContent(lineNumber: number): string;
    getWordAtPosition(position: editorCommon.IPosition, wordDefinition: RegExp): Range;
    getWordUntilPosition(position: editorCommon.IPosition, wordDefinition: RegExp): editorCommon.IWordAtPosition;
    private _getAllWords(wordDefinition);
    getAllUniqueWords(wordDefinition: RegExp, skipWordOnce?: string): string[];
    private _wordenize(content, wordDefinition);
    getValueInRange(range: editorCommon.IRange): string;
}
/**
 * @internal
 */
export declare abstract class BaseEditorSimpleWorker {
    private _foreignModule;
    constructor();
    protected abstract _getModel(uri: string): ICommonModel;
    protected abstract _getModels(): ICommonModel[];
    computeDiff(originalUrl: string, modifiedUrl: string, ignoreTrimWhitespace: boolean): TPromise<editorCommon.ILineChange[]>;
    computeDirtyDiff(originalUrl: string, modifiedUrl: string, ignoreTrimWhitespace: boolean): TPromise<editorCommon.IChange[]>;
    computeLinks(modelUrl: string): TPromise<ILink[]>;
    textualSuggest(modelUrl: string, position: editorCommon.IPosition, wordDef: string, wordDefFlags: string): TPromise<ISuggestResult[]>;
    private _suggestFiltered(model, position, wordDefRegExp);
    private _suggestUnfiltered(model, position, wordDefRegExp);
    navigateValueSet(modelUrl: string, range: editorCommon.IRange, up: boolean, wordDef: string, wordDefFlags: string): TPromise<IInplaceReplaceSupportResult>;
    loadForeignModule(moduleId: string, createData: any): TPromise<string[]>;
    fmr(method: string, args: any[]): TPromise<any>;
}
/**
 * @internal
 */
export declare class EditorSimpleWorkerImpl extends BaseEditorSimpleWorker implements IRequestHandler, IDisposable {
    _requestHandlerTrait: any;
    private _models;
    constructor();
    dispose(): void;
    protected _getModel(uri: string): ICommonModel;
    protected _getModels(): ICommonModel[];
    acceptNewModel(data: IRawModelData): void;
    acceptModelChanged(strURL: string, events: editorCommon.IModelContentChangedEvent2[]): void;
    acceptRemovedModel(strURL: string): void;
}
/**
 * Called on the worker side
 * @internal
 */
export declare function create(): IRequestHandler;
