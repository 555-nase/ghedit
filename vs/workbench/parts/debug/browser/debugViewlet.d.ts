import 'vs/css!./media/debugViewlet';
import builder = require('vs/base/browser/builder');
import { TPromise } from 'vs/base/common/winjs.base';
import actions = require('vs/base/common/actions');
import actionbar = require('vs/base/browser/ui/actionbar/actionbar');
import { Viewlet } from 'vs/workbench/browser/viewlet';
import debug = require('vs/workbench/parts/debug/common/debug');
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IProgressService } from 'vs/platform/progress/common/progress';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IStorageService } from 'vs/platform/storage/common/storage';
import IDebugService = debug.IDebugService;
export declare class DebugViewlet extends Viewlet {
    private progressService;
    private debugService;
    private instantiationService;
    private contextService;
    private toDispose;
    private actions;
    private progressRunner;
    private viewletSettings;
    private $el;
    private splitView;
    private views;
    private lastFocusedView;
    constructor(telemetryService: ITelemetryService, progressService: IProgressService, debugService: IDebugService, instantiationService: IInstantiationService, contextService: IWorkspaceContextService, storageService: IStorageService);
    create(parent: builder.Builder): TPromise<void>;
    setVisible(visible: boolean): TPromise<any>;
    layout(dimension: builder.Dimension): void;
    focus(): void;
    getActions(): actions.IAction[];
    getActionItem(action: actions.IAction): actionbar.IActionItem;
    private onDebugServiceStateChange(newState);
    dispose(): void;
    shutdown(): void;
}
