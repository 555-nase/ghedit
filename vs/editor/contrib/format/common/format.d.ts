import { TPromise } from 'vs/base/common/winjs.base';
import { Range } from 'vs/editor/common/core/range';
import { IReadOnlyModel, ISingleEditOperation } from 'vs/editor/common/editorCommon';
import { FormattingOptions } from 'vs/editor/common/modes';
import { Position } from 'vs/editor/common/core/position';
export declare function getDocumentRangeFormattingEdits(model: IReadOnlyModel, range: Range, options: FormattingOptions): TPromise<ISingleEditOperation[]>;
export declare function getDocumentFormattingEdits(model: IReadOnlyModel, options: FormattingOptions): TPromise<ISingleEditOperation[]>;
export declare function getOnTypeFormattingEdits(model: IReadOnlyModel, position: Position, ch: string, options: FormattingOptions): TPromise<ISingleEditOperation[]>;
