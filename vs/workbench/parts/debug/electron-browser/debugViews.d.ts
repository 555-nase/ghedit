import actions = require('vs/base/common/actions');
import viewlet = require('vs/workbench/browser/viewlet');
import debug = require('vs/workbench/parts/debug/common/debug');
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IMessageService } from 'vs/platform/message/common/message';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import IDebugService = debug.IDebugService;
export declare class VariablesView extends viewlet.CollapsibleViewletView {
    private settings;
    private telemetryService;
    private debugService;
    private instantiationService;
    private static MEMENTO;
    constructor(actionRunner: actions.IActionRunner, settings: any, messageService: IMessageService, contextMenuService: IContextMenuService, telemetryService: ITelemetryService, debugService: IDebugService, keybindingService: IKeybindingService, instantiationService: IInstantiationService);
    renderHeader(container: HTMLElement): void;
    renderBody(container: HTMLElement): void;
    private onFocusStackFrame(stackFrame);
    shutdown(): void;
}
export declare class WatchExpressionsView extends viewlet.CollapsibleViewletView {
    private settings;
    private debugService;
    private instantiationService;
    private static MEMENTO;
    constructor(actionRunner: actions.IActionRunner, settings: any, messageService: IMessageService, contextMenuService: IContextMenuService, debugService: IDebugService, keybindingService: IKeybindingService, instantiationService: IInstantiationService);
    renderHeader(container: HTMLElement): void;
    renderBody(container: HTMLElement): void;
    private onWatchExpressionsUpdated(expression);
    shutdown(): void;
}
export declare class CallStackView extends viewlet.CollapsibleViewletView {
    private settings;
    private telemetryService;
    private debugService;
    private instantiationService;
    private static MEMENTO;
    private pauseMessage;
    private pauseMessageLabel;
    constructor(actionRunner: actions.IActionRunner, settings: any, messageService: IMessageService, contextMenuService: IContextMenuService, telemetryService: ITelemetryService, debugService: IDebugService, keybindingService: IKeybindingService, instantiationService: IInstantiationService);
    renderHeader(container: HTMLElement): void;
    renderBody(container: HTMLElement): void;
    shutdown(): void;
}
export declare class BreakpointsView extends viewlet.AdaptiveCollapsibleViewletView {
    private settings;
    private debugService;
    private instantiationService;
    private static MAX_VISIBLE_FILES;
    private static MEMENTO;
    constructor(actionRunner: actions.IActionRunner, settings: any, messageService: IMessageService, contextMenuService: IContextMenuService, debugService: IDebugService, keybindingService: IKeybindingService, instantiationService: IInstantiationService);
    renderHeader(container: HTMLElement): void;
    renderBody(container: HTMLElement): void;
    getActions(): actions.IAction[];
    private onBreakpointsChange();
    private static getExpandedBodySize(length);
    shutdown(): void;
}
