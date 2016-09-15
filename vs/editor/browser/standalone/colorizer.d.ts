import { TPromise } from 'vs/base/common/winjs.base';
import { IModel } from 'vs/editor/common/editorCommon';
import { IModeService } from 'vs/editor/common/services/modeService';
import { ViewLineToken } from 'vs/editor/common/core/viewLineToken';
export interface IColorizerOptions {
    tabSize?: number;
}
export interface IColorizerElementOptions extends IColorizerOptions {
    theme?: string;
    mimeType?: string;
}
export declare class Colorizer {
    static colorizeElement(modeService: IModeService, domNode: HTMLElement, options: IColorizerElementOptions): TPromise<void>;
    static colorize(modeService: IModeService, text: string, mimeType: string, options: IColorizerOptions): TPromise<string>;
    static colorizeLine(line: string, tokens: ViewLineToken[], tabSize?: number): string;
    static colorizeModelLine(model: IModel, lineNumber: number, tabSize?: number): string;
}
