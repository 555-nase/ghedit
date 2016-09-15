import Event from 'vs/base/common/event';
import { ICommonCodeEditor, IDecorationRenderOptions, IModelDecorationOptions } from 'vs/editor/common/editorCommon';
import { ICodeEditorService } from 'vs/editor/common/services/codeEditorService';
export declare abstract class AbstractCodeEditorService implements ICodeEditorService {
    _serviceBrand: any;
    private _onCodeEditorAdd;
    private _onCodeEditorRemove;
    private _codeEditors;
    constructor();
    addCodeEditor(editor: ICommonCodeEditor): void;
    onCodeEditorAdd: Event<ICommonCodeEditor>;
    removeCodeEditor(editor: ICommonCodeEditor): void;
    onCodeEditorRemove: Event<ICommonCodeEditor>;
    getCodeEditor(editorId: string): ICommonCodeEditor;
    listCodeEditors(): ICommonCodeEditor[];
    getFocusedCodeEditor(): ICommonCodeEditor;
    abstract registerDecorationType(key: string, options: IDecorationRenderOptions, parentTypeKey?: string): void;
    abstract removeDecorationType(key: string): void;
    abstract resolveDecorationOptions(decorationTypeKey: string, writable: boolean): IModelDecorationOptions;
}
