export declare const CONFIG_DEFAULT_NAME: string;
export interface IConfigFile {
    contents: any;
    parseError?: any;
}
export declare function newConfigFile(value: string): IConfigFile;
export declare function merge(base: any, add: any, overwrite: boolean): void;
export declare function consolidate(configMap: {
    [key: string]: IConfigFile;
}): {
    contents: any;
    parseErrors: string[];
};
export declare function getDefaultValues(): any;
export declare function getDefaultValuesContent(indent: string): string;
