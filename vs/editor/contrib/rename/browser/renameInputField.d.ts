import 'vs/css!./renameInputField';
import { IDisposable } from 'vs/base/common/lifecycle';
import { TPromise } from 'vs/base/common/winjs.base';
import { IRange } from 'vs/editor/common/editorCommon';
import { ICodeEditor, IContentWidget, IContentWidgetPosition } from 'vs/editor/browser/editorBrowser';
export default class RenameInputField implements IContentWidget, IDisposable {
    private _editor;
    private _position;
    private _domNode;
    private _inputField;
    private _visible;
    private _disposables;
    allowEditorOverflow: boolean;
    constructor(editor: ICodeEditor);
    dispose(): void;
    getId(): string;
    getDomNode(): HTMLElement;
    private updateFont();
    getPosition(): IContentWidgetPosition;
    private _currentAcceptInput;
    private _currentCancelInput;
    acceptInput(): void;
    cancelInput(): void;
    getInput(where: IRange, value: string, selectionStart: number, selectionEnd: number): TPromise<string>;
    private _show();
    private _hide();
}
