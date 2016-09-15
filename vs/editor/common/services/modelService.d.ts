import Event from 'vs/base/common/event';
import URI from 'vs/base/common/uri';
import { TPromise } from 'vs/base/common/winjs.base';
import { IModel, IRawText, ITextModelCreationOptions } from 'vs/editor/common/editorCommon';
import { IMode } from 'vs/editor/common/modes';
export declare var IModelService: {
    (...args: any[]): void;
    type: IModelService;
};
export interface IModelService {
    _serviceBrand: any;
    createModel(value: string | IRawText, modeOrPromise: TPromise<IMode> | IMode, resource: URI): IModel;
    destroyModel(resource: URI): void;
    getModels(): IModel[];
    getCreationOptions(): ITextModelCreationOptions;
    getModel(resource: URI): IModel;
    onModelAdded: Event<IModel>;
    onModelRemoved: Event<IModel>;
    onModelModeChanged: Event<{
        model: IModel;
        oldModeId: string;
    }>;
}
