import { Builder, Box } from 'vs/base/browser/builder';
import { Part } from 'vs/workbench/browser/part';
import { QuickOpenController } from 'vs/workbench/browser/parts/quickopen/quickOpenController';
import { Sash, IVerticalSashLayoutProvider, IHorizontalSashLayoutProvider } from 'vs/base/browser/ui/sash/sash';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IPartService } from 'vs/workbench/services/part/common/partService';
import { IWorkspaceContextService } from 'vs/workbench/services/workspace/common/contextService';
import { IViewletService } from 'vs/workbench/services/viewlet/common/viewletService';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { IContextViewService } from 'vs/platform/contextview/browser/contextView';
import { IEventService } from 'vs/platform/event/common/event';
import { IThemeService } from 'vs/workbench/services/themes/common/themeService';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
export declare class LayoutOptions {
    margin: Box;
    constructor();
    setMargin(margin: Box): LayoutOptions;
}
/**
 * The workbench layout is responsible to lay out all parts that make the Workbench.
 */
export declare class WorkbenchLayout implements IVerticalSashLayoutProvider, IHorizontalSashLayoutProvider {
    private storageService;
    private contextViewService;
    private editorService;
    private editorGroupService;
    private contextService;
    private partService;
    private viewletService;
    private static sashXWidthSettingsKey;
    private static sashYHeightSettingsKey;
    private parent;
    private workbenchContainer;
    private activitybar;
    private editor;
    private sidebar;
    private panel;
    private statusbar;
    private quickopen;
    private options;
    private toUnbind;
    private computedStyles;
    private workbenchSize;
    private sashX;
    private sashY;
    private startSidebarWidth;
    private sidebarWidth;
    private sidebarHeight;
    private startPanelHeight;
    private panelHeight;
    private panelWidth;
    constructor(parent: Builder, workbenchContainer: Builder, parts: {
        activitybar: Part;
        editor: Part;
        sidebar: Part;
        panel: Part;
        statusbar: Part;
    }, quickopen: QuickOpenController, options: LayoutOptions, storageService: IStorageService, eventService: IEventService, contextViewService: IContextViewService, editorService: IWorkbenchEditorService, editorGroupService: IEditorGroupService, contextService: IWorkspaceContextService, partService: IPartService, viewletService: IViewletService, themeService: IThemeService);
    private registerSashListeners();
    private onEditorsChanged();
    private relayout();
    private computeStyle();
    layout(forceStyleReCompute?: boolean): void;
    private getWorkbenchArea();
    getVerticalSashTop(sash: Sash): number;
    getVerticalSashLeft(sash: Sash): number;
    getVerticalSashHeight(sash: Sash): number;
    getHorizontalSashTop(sash: Sash): number;
    getHorizontalSashLeft(sash: Sash): number;
    getHorizontalSashWidth(sash: Sash): number;
    dispose(): void;
}
