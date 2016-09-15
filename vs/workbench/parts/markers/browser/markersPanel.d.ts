import 'vs/css!./media/markers';
import { TPromise } from 'vs/base/common/winjs.base';
import builder = require('vs/base/browser/builder');
import { Action } from 'vs/base/common/actions';
import { IActionItem } from 'vs/base/browser/ui/actionbar/actionbar';
import { IMarkerService } from 'vs/platform/markers/common/markers';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IEventService } from 'vs/platform/event/common/event';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
import { Panel } from 'vs/workbench/browser/panel';
import { IAction } from 'vs/base/common/actions';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { MarkersModel } from 'vs/workbench/parts/markers/common/markersModel';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
export declare class MarkersPanel extends Panel {
    private instantiationService;
    private markerService;
    private editorGroupService;
    private editorService;
    private eventService;
    private configurationService;
    markersModel: MarkersModel;
    private toDispose;
    private delayedRefresh;
    private lastSelectedRelativeTop;
    private currentActiveFile;
    private hasToAutoReveal;
    private tree;
    private autoExpanded;
    private actions;
    private filterAction;
    private collapseAllAction;
    private treeContainer;
    private messageBoxContainer;
    private messageBox;
    constructor(instantiationService: IInstantiationService, markerService: IMarkerService, editorGroupService: IEditorGroupService, editorService: IWorkbenchEditorService, eventService: IEventService, configurationService: IConfigurationService, telemetryService: ITelemetryService);
    create(parent: builder.Builder): TPromise<void>;
    getTitle(): string;
    layout(dimension: builder.Dimension): void;
    focus(): void;
    getActions(): IAction[];
    private refreshPanel(updateTitleArea?);
    updateFilter(filter: string): void;
    private createMessageBox(parent);
    private createTree(parent);
    private createActions();
    private createListeners();
    private onMarkerChanged(changedResources);
    private onEditorsChanged();
    private onConfigurationsUpdated(conf);
    private onSelected();
    private updateResources(resources);
    private render();
    private renderMessage();
    private autoExpand();
    private autoReveal(focus?);
    private revealMarkersForCurrentActiveEditor(focus?);
    private getResourceForCurrentActiveFile();
    private hasSelectedMarkerFor(resource);
    getActionItem(action: Action): IActionItem;
    dispose(): void;
}
