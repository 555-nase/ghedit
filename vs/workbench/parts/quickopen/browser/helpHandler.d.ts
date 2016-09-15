import { TPromise } from 'vs/base/common/winjs.base';
import { IAutoFocus } from 'vs/base/parts/quickopen/common/quickOpen';
import { QuickOpenModel } from 'vs/base/parts/quickopen/browser/quickOpenModel';
import { QuickOpenHandler } from 'vs/workbench/browser/quickopen';
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
export declare const HELP_PREFIX: string;
export declare class HelpHandler extends QuickOpenHandler {
    private quickOpenService;
    constructor(quickOpenService: IQuickOpenService);
    getResults(searchValue: string): TPromise<QuickOpenModel>;
    getAutoFocus(searchValue: string): IAutoFocus;
}
