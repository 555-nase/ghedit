import URI from 'vs/base/common/uri';
import { TPromise } from 'vs/base/common/winjs.base';
import { IChange, ILineChange, IPosition, IRange } from 'vs/editor/common/editorCommon';
import { IInplaceReplaceSupportResult, ISuggestResult } from 'vs/editor/common/modes';
export declare var ID_EDITOR_WORKER_SERVICE: string;
export declare var IEditorWorkerService: {
    (...args: any[]): void;
    type: IEditorWorkerService;
};
export interface IEditorWorkerService {
    _serviceBrand: any;
    computeDiff(original: URI, modified: URI, ignoreTrimWhitespace: boolean): TPromise<ILineChange[]>;
    computeDirtyDiff(original: URI, modified: URI, ignoreTrimWhitespace: boolean): TPromise<IChange[]>;
    textualSuggest(resource: URI, position: IPosition): TPromise<ISuggestResult[]>;
    navigateValueSet(resource: URI, range: IRange, up: boolean): TPromise<IInplaceReplaceSupportResult>;
}
