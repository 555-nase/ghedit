import URI from 'vs/base/common/uri';
import { TPromise } from 'vs/base/common/winjs.base';
import { IPosition, IRange } from 'vs/editor/common/editorCommon';
import { IModelService } from 'vs/editor/common/services/modelService';
/**
 * Interface used to compute a hierachry of logical ranges.
 */
export interface ILogicalSelectionEntry {
    type: string;
    range: IRange;
}
export declare class TokenSelectionSupport {
    private _modelService;
    constructor(modelService: IModelService);
    getRangesToPosition(resource: URI, position: IPosition): TPromise<ILogicalSelectionEntry[]>;
    getRangesToPositionSync(resource: URI, position: IPosition): ILogicalSelectionEntry[];
    private _doGetRangesToPosition(model, position);
}
