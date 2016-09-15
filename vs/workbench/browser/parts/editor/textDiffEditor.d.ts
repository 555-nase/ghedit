import 'vs/css!./media/textdiffeditor';
import { TPromise } from 'vs/base/common/winjs.base';
import { Builder } from 'vs/base/browser/builder';
import { IAction } from 'vs/base/common/actions';
import { Position } from 'vs/platform/editor/common/editor';
import { IDiffEditor } from 'vs/editor/browser/editorBrowser';
import { IEditorOptions } from 'vs/editor/common/editorCommon';
import { BaseTextEditor } from 'vs/workbench/browser/parts/editor/textEditor';
import { EditorInput, EditorOptions } from 'vs/workbench/common/editor';
import { DiffNavigator } from 'vs/editor/contrib/diffNavigator/common/diffNavigator';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IWorkspaceContextService } from 'vs/workbench/services/workspace/common/contextService';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IEventService } from 'vs/platform/event/common/event';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IMessageService } from 'vs/platform/message/common/message';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IModeService } from 'vs/editor/common/services/modeService';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IThemeService } from 'vs/workbench/services/themes/common/themeService';
/**
 * The text editor that leverages the diff text editor for the editing experience.
 */
export declare class TextDiffEditor extends BaseTextEditor {
    static ID: string;
    private diffNavigator;
    private nextDiffAction;
    private previousDiffAction;
    private textDiffEditorVisible;
    constructor(telemetryService: ITelemetryService, instantiationService: IInstantiationService, contextService: IWorkspaceContextService, storageService: IStorageService, messageService: IMessageService, configurationService: IConfigurationService, eventService: IEventService, editorService: IWorkbenchEditorService, modeService: IModeService, keybindingService: IKeybindingService, themeService: IThemeService);
    getTitle(): string;
    createEditorControl(parent: Builder): IDiffEditor;
    setInput(input: EditorInput, options: EditorOptions): TPromise<void>;
    private openAsBinary(input, options);
    protected getCodeEditorOptions(): IEditorOptions;
    private isFileBinaryError(error);
    private isFileBinaryError(error);
    clearInput(): void;
    setEditorVisible(visible: boolean, position: Position): void;
    getDiffNavigator(): DiffNavigator;
    getActions(): IAction[];
    getSecondaryActions(): IAction[];
    getControl(): IDiffEditor;
    dispose(): void;
}
