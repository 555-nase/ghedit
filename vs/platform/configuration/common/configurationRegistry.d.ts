import Event from 'vs/base/common/event';
import { IJSONSchema } from 'vs/base/common/jsonSchema';
export declare const Extensions: {
    Configuration: string;
};
export interface IConfigurationRegistry {
    /**
     * Register a configuration to the registry.
     */
    registerConfiguration(configuration: IConfigurationNode): void;
    /**
     * Event that fires whenver a configuratio has been
     * registered.
     */
    onDidRegisterConfiguration: Event<IConfigurationRegistry>;
    /**
     * Returns all configurations contributed to this registry.
     */
    getConfigurations(): IConfigurationNode[];
}
export interface IConfigurationNode {
    id?: string;
    order?: number;
    type?: string | string[];
    title?: string;
    description?: string;
    default?: any;
    properties?: {
        [path: string]: IJSONSchema;
    };
    allOf?: IJSONSchema[];
    definitions?: {
        [path: string]: IJSONSchema;
    };
}
