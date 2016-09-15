import { ICodeEditor } from 'vs/editor/browser/editorBrowser';
import { IModelDecorationOptions, IEditorContribution } from 'vs/editor/common/editorCommon';
import { IGitService } from 'vs/workbench/parts/git/common/git';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { Disposable } from 'vs/base/common/lifecycle';
export declare class MergeDecorator extends Disposable implements IEditorContribution {
    private editor;
    private gitService;
    private contextService;
    static ID: string;
    static DECORATION_OPTIONS: IModelDecorationOptions;
    private mergeDecorator;
    constructor(editor: ICodeEditor, gitService: IGitService, contextService: IWorkspaceContextService);
    getId(): string;
    private onModelChanged();
    dispose(): void;
}
