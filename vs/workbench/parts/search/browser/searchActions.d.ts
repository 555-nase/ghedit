import { TPromise } from 'vs/base/common/winjs.base';
import URI from 'vs/base/common/uri';
import { Action } from 'vs/base/common/actions';
import { ToggleViewletAction } from 'vs/workbench/browser/viewlet';
import { IViewletService } from 'vs/workbench/services/viewlet/common/viewletService';
import { ITree } from 'vs/base/parts/tree/browser/tree';
import { SearchViewlet } from 'vs/workbench/parts/search/browser/searchViewlet';
import { Match, FileMatch, FileMatchOrMatch } from 'vs/workbench/parts/search/common/searchModel';
import { IReplaceService } from 'vs/workbench/parts/search/common/replace';
import { CollapseAllAction as TreeCollapseAction } from 'vs/base/parts/tree/browser/treeDefaults';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { Keybinding } from 'vs/base/common/keyCodes';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
export declare function isSearchViewletFocussed(viewletService: IViewletService): boolean;
export declare function appendKeyBindingLabel(label: string, keyBinding: Keybinding, keyBindingService: IKeybindingService): string;
export declare function appendKeyBindingLabel(label: string, keyBinding: number, keyBindingService: IKeybindingService): string;
export declare class OpenSearchViewletAction extends ToggleViewletAction {
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, viewletService: IViewletService, editorService: IWorkbenchEditorService);
}
export declare class ReplaceInFilesAction extends Action {
    private viewletService;
    static ID: string;
    static LABEL: string;
    constructor(id: string, label: string, viewletService: IViewletService);
    run(): TPromise<any>;
}
export declare class FindInFolderAction extends Action {
    private viewletService;
    private resource;
    constructor(resource: URI, viewletService: IViewletService);
    run(event?: any): TPromise<any>;
}
export declare class RefreshAction extends Action {
    private viewlet;
    constructor(viewlet: SearchViewlet);
    run(): TPromise<void>;
}
export declare class CollapseAllAction extends TreeCollapseAction {
    constructor(viewlet: SearchViewlet);
}
export declare class ClearSearchResultsAction extends Action {
    private viewlet;
    constructor(viewlet: SearchViewlet);
    run(): TPromise<void>;
}
export declare abstract class AbstractSearchAndReplaceAction extends Action {
    protected getNextFocusElement(viewer: ITree, element: FileMatchOrMatch): FileMatchOrMatch;
}
export declare class RemoveAction extends AbstractSearchAndReplaceAction {
    private viewer;
    private element;
    constructor(viewer: ITree, element: FileMatchOrMatch);
    run(): TPromise<any>;
}
export declare class ReplaceAllAction extends AbstractSearchAndReplaceAction {
    private viewer;
    private fileMatch;
    private viewlet;
    private replaceService;
    private telemetryService;
    static KEY_BINDING: number;
    constructor(viewer: ITree, fileMatch: FileMatch, viewlet: SearchViewlet, replaceService: IReplaceService, keyBindingService: IKeybindingService, telemetryService: ITelemetryService);
    run(): TPromise<any>;
}
export declare class ReplaceAction extends AbstractSearchAndReplaceAction {
    private viewer;
    private element;
    private viewlet;
    private replaceService;
    private editorService;
    private telemetryService;
    static KEY_BINDING: number;
    constructor(viewer: ITree, element: Match, viewlet: SearchViewlet, replaceService: IReplaceService, keyBindingService: IKeybindingService, editorService: IWorkbenchEditorService, telemetryService: ITelemetryService);
    run(): TPromise<any>;
    private isFileActive(fileMatch);
}
export declare class ConfigureGlobalExclusionsAction extends Action {
    private instantiationService;
    constructor(instantiationService: IInstantiationService);
    run(): TPromise<void>;
}
