import { TPromise } from 'vs/base/common/winjs.base';
import { IReadOnlyModel } from 'vs/editor/common/editorCommon';
import { Location } from 'vs/editor/common/modes';
import { Position } from 'vs/editor/common/core/position';
export declare function provideReferences(model: IReadOnlyModel, position: Position): TPromise<Location[]>;
