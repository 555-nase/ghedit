import { TPromise } from 'vs/base/common/winjs.base';
import { EditorModel, EditorInput } from 'vs/workbench/common/editor';
import { ResourceEditorModel } from 'vs/workbench/common/editor/resourceEditorModel';
import { IModel } from 'vs/editor/common/editorCommon';
import URI from 'vs/base/common/uri';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IModelService } from 'vs/editor/common/services/modelService';
import { IDisposable } from 'vs/base/common/lifecycle';
/**
 *
 */
export interface IResourceEditorContentProvider {
    provideTextContent(resource: URI): TPromise<IModel>;
}
/**
 * A read-only text editor input whos contents are made of the provided resource that points to an existing
 * code editor model.
 */
export declare class ResourceEditorInput extends EditorInput {
    protected modelService: IModelService;
    protected instantiationService: IInstantiationService;
    private static loadingModels;
    private static registry;
    static registerResourceContentProvider(scheme: string, provider: IResourceEditorContentProvider): IDisposable;
    private static getOrCreateModel(modelService, resource);
    static ID: string;
    protected cachedModel: ResourceEditorModel;
    protected resource: URI;
    private name;
    private description;
    constructor(name: string, description: string, resource: URI, modelService: IModelService, instantiationService: IInstantiationService);
    getTypeId(): string;
    getName(): string;
    getDescription(): string;
    resolve(refresh?: boolean): TPromise<EditorModel>;
    matches(otherInput: any): boolean;
    dispose(): void;
}
