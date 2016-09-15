import { TPromise } from 'vs/base/common/winjs.base';
import { EditorInput } from 'vs/workbench/common/editor';
import { IExtension } from './extensions';
export declare class ExtensionsInput extends EditorInput {
    private _extension;
    static ID: string;
    extension: IExtension;
    constructor(_extension: IExtension);
    getTypeId(): string;
    getName(): string;
    matches(other: any): boolean;
    resolve(refresh?: boolean): TPromise<any>;
    supportsSplitEditor(): boolean;
}
