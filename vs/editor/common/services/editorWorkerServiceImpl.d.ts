import { Disposable } from 'vs/base/common/lifecycle';
import URI from 'vs/base/common/uri';
import { TPromise } from 'vs/base/common/winjs.base';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { IInplaceReplaceSupportResult, ILink, ISuggestResult } from 'vs/editor/common/modes';
import { IEditorWorkerService } from 'vs/editor/common/services/editorWorkerService';
import { IModelService } from 'vs/editor/common/services/modelService';
import { EditorSimpleWorkerImpl } from 'vs/editor/common/services/editorSimpleWorker';
export declare class EditorWorkerServiceImpl implements IEditorWorkerService {
    _serviceBrand: any;
    private _workerManager;
    private _registration;
    constructor(modelService: IModelService);
    dispose(): void;
    computeDiff(original: URI, modified: URI, ignoreTrimWhitespace: boolean): TPromise<editorCommon.ILineChange[]>;
    computeDirtyDiff(original: URI, modified: URI, ignoreTrimWhitespace: boolean): TPromise<editorCommon.IChange[]>;
    textualSuggest(resource: URI, position: editorCommon.IPosition): TPromise<ISuggestResult[]>;
    navigateValueSet(resource: URI, range: editorCommon.IRange, up: boolean): TPromise<IInplaceReplaceSupportResult>;
}
export declare class EditorWorkerClient extends Disposable {
    private _modelService;
    private _worker;
    private _workerFactory;
    private _modelManager;
    constructor(modelService: IModelService);
    private _getOrCreateWorker();
    protected _getProxy(): TPromise<EditorSimpleWorkerImpl>;
    private _getOrCreateModelManager(proxy);
    protected _withSyncedResources(resources: URI[]): TPromise<EditorSimpleWorkerImpl>;
    computeDiff(original: URI, modified: URI, ignoreTrimWhitespace: boolean): TPromise<editorCommon.ILineChange[]>;
    computeDirtyDiff(original: URI, modified: URI, ignoreTrimWhitespace: boolean): TPromise<editorCommon.IChange[]>;
    computeLinks(resource: URI): TPromise<ILink[]>;
    textualSuggest(resource: URI, position: editorCommon.IPosition): TPromise<ISuggestResult[]>;
    navigateValueSet(resource: URI, range: editorCommon.IRange, up: boolean): TPromise<IInplaceReplaceSupportResult>;
}
