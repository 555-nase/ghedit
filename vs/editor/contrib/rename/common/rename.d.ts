import { TPromise } from 'vs/base/common/winjs.base';
import { IReadOnlyModel } from 'vs/editor/common/editorCommon';
import { WorkspaceEdit } from 'vs/editor/common/modes';
import { Position } from 'vs/editor/common/core/position';
export declare function rename(model: IReadOnlyModel, position: Position, newName: string): TPromise<WorkspaceEdit>;
