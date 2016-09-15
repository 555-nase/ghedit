import Event from 'vs/base/common/event';
import URI from 'vs/base/common/uri';
import { TPromise } from 'vs/base/common/winjs.base';
import { IMarkerService } from 'vs/platform/markers/common/markers';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { IMode } from 'vs/editor/common/modes';
import { IModelService } from 'vs/editor/common/services/modelService';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IMessageService } from 'vs/platform/message/common/message';
export interface IRawModelData {
    url: URI;
    versionId: number;
    value: editorCommon.IRawText;
    modeId: string;
}
export declare class ModelServiceImpl implements IModelService {
    _serviceBrand: any;
    private _markerService;
    private _markerServiceSubscription;
    private _messageService;
    private _configurationService;
    private _configurationServiceSubscription;
    private _onModelAdded;
    private _onModelRemoved;
    private _onModelModeChanged;
    private _modelCreationOptions;
    private _hasShownMigrationMessage;
    /**
     * All the models known in the system.
     */
    private _models;
    constructor(markerService: IMarkerService, configurationService: IConfigurationService, messageService: IMessageService);
    getCreationOptions(): editorCommon.ITextModelCreationOptions;
    private _setModelOptions(newOpts);
    dispose(): void;
    private _handleMarkerChange(changedResources);
    private _cleanUp(model);
    private _createModelData(value, modeOrPromise, resource);
    createModel(value: string | editorCommon.IRawText, modeOrPromise: TPromise<IMode> | IMode, resource: URI): editorCommon.IModel;
    destroyModel(resource: URI): void;
    getModels(): editorCommon.IModel[];
    getModel(resource: URI): editorCommon.IModel;
    onModelAdded: Event<editorCommon.IModel>;
    onModelRemoved: Event<editorCommon.IModel>;
    onModelModeChanged: Event<{
        model: editorCommon.IModel;
        oldModeId: string;
    }>;
    private _onModelDisposing(model);
    private _onModelEvents(modelData, events);
}
