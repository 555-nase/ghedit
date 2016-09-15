import { CodeEditorStateFlag, ICodeEditorState, ICommonCodeEditor } from 'vs/editor/common/editorCommon';
export declare class EditorState implements ICodeEditorState {
    private flags;
    private position;
    private selection;
    private modelVersionId;
    private scrollLeft;
    private scrollTop;
    constructor(editor: ICommonCodeEditor, flags: CodeEditorStateFlag[]);
    private _equals(other);
    validate(editor: ICommonCodeEditor): boolean;
}
