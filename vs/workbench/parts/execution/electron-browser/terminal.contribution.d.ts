import { TPromise } from 'vs/base/common/winjs.base';
import { Action } from 'vs/base/common/actions';
import uri from 'vs/base/common/uri';
import { IWorkspaceContextService } from 'vs/workbench/services/workspace/common/contextService';
import { ITerminalService } from 'vs/workbench/parts/execution/common/execution';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
export declare class OpenConsoleAction extends Action {
    private terminalService;
    private editorService;
    private contextService;
    static ID: string;
    static Label: string;
    static ScopedLabel: string;
    private resource;
    constructor(id: string, label: string, terminalService: ITerminalService, editorService: IWorkbenchEditorService, contextService: IWorkspaceContextService);
    setResource(resource: uri): void;
    run(event?: any): TPromise<any>;
}
