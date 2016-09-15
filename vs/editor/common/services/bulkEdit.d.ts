import URI from 'vs/base/common/uri';
import { TPromise } from 'vs/base/common/winjs.base';
import { IEditorService } from 'vs/platform/editor/common/editor';
import { IEventService } from 'vs/platform/event/common/event';
import { IRange, ISelection } from 'vs/editor/common/editorCommon';
import { ICommonCodeEditor } from 'vs/editor/common/editorCommon';
import { IProgressRunner } from 'vs/platform/progress/common/progress';
export interface IResourceEdit {
    resource: URI;
    range?: IRange;
    newText: string;
}
export interface BulkEdit {
    progress(progress: IProgressRunner): any;
    add(edit: IResourceEdit[]): void;
    finish(): TPromise<ISelection>;
}
export declare function bulkEdit(eventService: IEventService, editorService: IEditorService, editor: ICommonCodeEditor, edits: IResourceEdit[], progress?: IProgressRunner): TPromise<any>;
export declare function createBulkEdit(eventService: IEventService, editorService: IEditorService, editor: ICommonCodeEditor): BulkEdit;
