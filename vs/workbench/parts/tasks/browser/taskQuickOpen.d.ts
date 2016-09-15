import { TPromise } from 'vs/base/common/winjs.base';
import Quickopen = require('vs/workbench/browser/quickopen');
import QuickOpen = require('vs/base/parts/quickopen/common/quickOpen');
import Model = require('vs/base/parts/quickopen/browser/quickOpenModel');
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
import { ITaskService } from 'vs/workbench/parts/tasks/common/taskService';
export declare class QuickOpenHandler extends Quickopen.QuickOpenHandler {
    private quickOpenService;
    private taskService;
    constructor(quickOpenService: IQuickOpenService, taskService: ITaskService);
    getAriaLabel(): string;
    getResults(input: string): TPromise<Model.QuickOpenModel>;
    getClass(): string;
    canRun(): boolean;
    getAutoFocus(input: string): QuickOpen.IAutoFocus;
    onClose(canceled: boolean): void;
    getGroupLabel(): string;
    getEmptyLabel(searchString: string): string;
}
