import { TPromise } from 'vs/base/common/winjs.base';
import { IEditorService } from 'vs/platform/editor/common/editor';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IMessageService } from 'vs/platform/message/common/message';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { IStorageService } from 'vs/platform/storage/common/storage';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { ICodeEditor } from 'vs/editor/browser/editorBrowser';
import { IPeekViewService } from 'vs/editor/contrib/zoneWidget/browser/peekViewWidget';
import { ReferencesModel, OneReference } from './referencesModel';
import { Range } from 'vs/editor/common/core/range';
export declare const ctxReferenceSearchVisible: string;
export interface RequestOptions {
    getMetaTitle(model: ReferencesModel): string;
    onGoto?: (reference: OneReference) => TPromise<any>;
}
export declare class ReferencesController implements editorCommon.IEditorContribution {
    private _editorService;
    private _telemetryService;
    private _messageService;
    private _instantiationService;
    private _contextService;
    private _storageService;
    private _configurationService;
    private _peekViewService;
    static ID: string;
    private _editor;
    private _widget;
    private _model;
    private _requestIdPool;
    private _disposables;
    private _ignoreModelChangeEvent;
    private _referenceSearchVisible;
    static getController(editor: editorCommon.ICommonCodeEditor): ReferencesController;
    constructor(editor: ICodeEditor, keybindingService: IKeybindingService, _editorService: IEditorService, _telemetryService: ITelemetryService, _messageService: IMessageService, _instantiationService: IInstantiationService, _contextService: IWorkspaceContextService, _storageService: IStorageService, _configurationService: IConfigurationService, _peekViewService: IPeekViewService);
    getId(): string;
    dispose(): void;
    toggleWidget(range: Range, modelPromise: TPromise<ReferencesModel>, options: RequestOptions): void;
    closeWidget(): void;
    private _gotoReference(ref);
    private _openReference(ref, sideBySide);
}
