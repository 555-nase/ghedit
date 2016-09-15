import { TPromise } from 'vs/base/common/winjs.base';
export declare namespace Schemas {
    /**
     * A schema that is used for models that exist in memory
     * only and that have no correspondence on a server or such.
     */
    var inMemory: string;
    /**
     * A schema that is used for setting files
     */
    var vscode: string;
    /**
     * A schema that is used for internal private files
     */
    var internal: string;
    var http: string;
    var https: string;
    var file: string;
}
export interface IXHROptions {
    type?: string;
    url?: string;
    user?: string;
    password?: string;
    responseType?: string;
    headers?: any;
    customRequestInitializer?: (req: any) => void;
    data?: any;
}
export declare function xhr(options: IXHROptions): TPromise<XMLHttpRequest>;
