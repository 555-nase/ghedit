import { TPromise } from 'vs/base/common/winjs.base';
import { Range } from 'vs/editor/common/core/range';
import { IReadOnlyModel } from 'vs/editor/common/editorCommon';
import { CodeAction, CodeActionProvider } from 'vs/editor/common/modes';
export interface IQuickFix2 extends CodeAction {
    support: CodeActionProvider;
    id: string;
}
export declare function getCodeActions(model: IReadOnlyModel, range: Range): TPromise<IQuickFix2[]>;
