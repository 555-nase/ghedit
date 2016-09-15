import 'vs/css!./media/editorpicker';
import { TPromise } from 'vs/base/common/winjs.base';
import URI from 'vs/base/common/uri';
import { IAutoFocus, Mode, IEntryRunContext, IQuickNavigateConfiguration } from 'vs/base/parts/quickopen/common/quickOpen';
import { QuickOpenModel, QuickOpenEntryGroup } from 'vs/base/parts/quickopen/browser/quickOpenModel';
import { QuickOpenHandler } from 'vs/workbench/browser/quickopen';
import { Position } from 'vs/platform/editor/common/editor';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { EditorInput, IEditorGroup } from 'vs/workbench/common/editor';
export declare class EditorPickerEntry extends QuickOpenEntryGroup {
    private editor;
    private _group;
    private editorService;
    private editorGroupService;
    private stacks;
    constructor(editor: EditorInput, _group: IEditorGroup, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService);
    getIcon(): string;
    getLabel(): string;
    group: IEditorGroup;
    getResource(): URI;
    getAriaLabel(): string;
    getDescription(): string;
    getExtraClass(): string;
    run(mode: Mode, context: IEntryRunContext): boolean;
    private runOpen(context);
}
export declare abstract class BaseEditorPicker extends QuickOpenHandler {
    protected instantiationService: IInstantiationService;
    private contextService;
    protected editorService: IWorkbenchEditorService;
    protected editorGroupService: IEditorGroupService;
    private scorerCache;
    constructor(instantiationService: IInstantiationService, contextService: IWorkspaceContextService, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService);
    getResults(searchValue: string): TPromise<QuickOpenModel>;
    onClose(canceled: boolean): void;
    protected abstract getEditorEntries(): EditorPickerEntry[];
}
export declare abstract class EditorGroupPicker extends BaseEditorPicker {
    protected getEditorEntries(): EditorPickerEntry[];
    protected abstract getPosition(): Position;
    getEmptyLabel(searchString: string): string;
    getAutoFocus(searchValue: string, quickNavigateConfiguration: IQuickNavigateConfiguration): IAutoFocus;
}
export declare class LeftEditorGroupPicker extends EditorGroupPicker {
    protected getPosition(): Position;
}
export declare class CenterEditorGroupPicker extends EditorGroupPicker {
    protected getPosition(): Position;
}
export declare class RightEditorGroupPicker extends EditorGroupPicker {
    protected getPosition(): Position;
}
export declare class AllEditorsPicker extends BaseEditorPicker {
    protected getEditorEntries(): EditorPickerEntry[];
    getEmptyLabel(searchString: string): string;
    getAutoFocus(searchValue: string): IAutoFocus;
}
