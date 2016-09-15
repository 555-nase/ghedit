import { TPromise } from 'vs/base/common/winjs.base';
import URI from 'vs/base/common/uri';
import { IReplaceService } from 'vs/workbench/parts/search/common/replace';
import { EditorInput } from 'vs/workbench/common/editor';
import { IModelService } from 'vs/editor/common/services/modelService';
import { IEventService } from 'vs/platform/event/common/event';
import { Match, FileMatch, FileMatchOrMatch } from 'vs/workbench/parts/search/common/searchModel';
import { IProgressRunner } from 'vs/platform/progress/common/progress';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
export declare class ReplaceService implements IReplaceService {
    private telemetryService;
    private eventService;
    private editorService;
    private modelService;
    _serviceBrand: any;
    private cache;
    constructor(telemetryService: ITelemetryService, eventService: IEventService, editorService: any, modelService: IModelService);
    replace(match: Match): TPromise<any>;
    replace(files: FileMatch[], progress?: IProgressRunner): TPromise<any>;
    replace(match: FileMatchOrMatch, progress?: IProgressRunner, resource?: URI): TPromise<any>;
    getInput(element: FileMatch): TPromise<EditorInput>;
    refreshInput(element: FileMatch, reload?: boolean): void;
    disposeAllInputs(): void;
    openReplacePreviewEditor(element: FileMatchOrMatch, preserveFocus?: boolean, sideBySide?: boolean, pinned?: boolean): TPromise<any>;
    isReplacePreviewEditorOpened(element: FileMatchOrMatch): boolean;
    private createEdit(match, text, resource?);
}
