import 'vs/css!./codelens';
import { ICommandService } from 'vs/platform/commands/common/commands';
import { IMessageService } from 'vs/platform/message/common/message';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { IModelService } from 'vs/editor/common/services/modelService';
import * as editorBrowser from 'vs/editor/browser/editorBrowser';
export declare class CodeLensContribution implements editorCommon.IEditorContribution {
    private _editor;
    private _modelService;
    private _commandService;
    private _messageService;
    static ID: string;
    private _isEnabled;
    private _globalToDispose;
    private _localToDispose;
    private _lenses;
    private _currentFindCodeLensSymbolsPromise;
    private _modelChangeCounter;
    private _currentFindOccPromise;
    constructor(_editor: editorBrowser.ICodeEditor, _modelService: IModelService, _commandService: ICommandService, _messageService: IMessageService);
    dispose(): void;
    private localDispose();
    getId(): string;
    private onModelChange();
    private _disposeAllLenses(decChangeAccessor, viewZoneChangeAccessor);
    private renderCodeLensSymbols(symbols);
    private _onViewportChanged(modeId);
}
