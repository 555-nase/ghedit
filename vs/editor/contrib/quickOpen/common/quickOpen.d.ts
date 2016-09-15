import { TPromise } from 'vs/base/common/winjs.base';
import { IModel } from 'vs/editor/common/editorCommon';
import { SymbolInformation } from 'vs/editor/common/modes';
export interface IOutline {
    entries: SymbolInformation[];
}
export declare function getDocumentSymbols(model: IModel): TPromise<IOutline>;
