import 'vs/css!./media/gotoSymbolHandler';
import { TPromise } from 'vs/base/common/winjs.base';
import { IAutoFocus } from 'vs/base/parts/quickopen/common/quickOpen';
import { QuickOpenModel } from 'vs/base/parts/quickopen/browser/quickOpenModel';
import { QuickOpenHandler, QuickOpenAction } from 'vs/workbench/browser/quickopen';
import { IEditor, IRange } from 'vs/editor/common/editorCommon';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IQuickOpenService } from 'vs/workbench/services/quickopen/common/quickOpenService';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { Position } from 'vs/platform/editor/common/editor';
export declare const GOTO_SYMBOL_PREFIX: string;
export declare const SCOPE_PREFIX: string;
export declare class GotoSymbolAction extends QuickOpenAction {
    static ID: string;
    static LABEL: string;
    constructor(actionId: string, actionLabel: string, quickOpenService: IQuickOpenService);
}
export declare class GotoSymbolHandler extends QuickOpenHandler {
    private editorService;
    private contextService;
    private outlineToModelCache;
    private lineHighlightDecorationId;
    private lastKnownEditorViewState;
    private activeOutlineRequest;
    constructor(editorService: IWorkbenchEditorService, contextService: IWorkspaceContextService);
    getResults(searchValue: string): TPromise<QuickOpenModel>;
    getEmptyLabel(searchString: string): string;
    getAriaLabel(): string;
    canRun(): boolean | string;
    getAutoFocus(searchValue: string): IAutoFocus;
    private toQuickOpenEntries(flattened);
    private getActiveOutline();
    private doGetActiveOutline();
    decorateOutline(fullRange: IRange, startRange: IRange, editor: IEditor, position: Position): void;
    clearDecorations(): void;
    onClose(canceled: boolean): void;
}
