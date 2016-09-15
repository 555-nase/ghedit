import { TPromise } from 'vs/base/common/winjs.base';
import { Dimension, Builder } from 'vs/base/browser/builder';
import { EditorOptions, EditorInput } from 'vs/workbench/common/editor';
import { BaseEditor } from 'vs/workbench/browser/parts/editor/baseEditor';
import { Position } from 'vs/platform/editor/common/editor';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IThemeService } from 'vs/workbench/services/themes/common/themeService';
import { IOpenerService } from 'vs/platform/opener/common/opener';
/**
 * An implementation of editor for showing HTML content in an IFrame by leveraging the HTML input.
 */
export declare class HtmlPreviewPart extends BaseEditor {
    static ID: string;
    private _editorService;
    private _themeService;
    private _openerService;
    private _webview;
    private _container;
    private _baseUrl;
    private _model;
    private _modelChangeSubscription;
    private _themeChangeSubscription;
    constructor(telemetryService: ITelemetryService, editorService: IWorkbenchEditorService, themeService: IThemeService, openerService: IOpenerService, contextService: IWorkspaceContextService);
    dispose(): void;
    createEditor(parent: Builder): void;
    private webview;
    changePosition(position: Position): void;
    setEditorVisible(visible: boolean, position?: Position): void;
    private _doSetVisible(visible);
    private _hasValidModel();
    layout(dimension: Dimension): void;
    focus(): void;
    setInput(input: EditorInput, options: EditorOptions): TPromise<void>;
}
