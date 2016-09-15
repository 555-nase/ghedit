import { TPromise } from 'vs/base/common/winjs.base';
import { IHTMLContentElement, MarkedString } from 'vs/base/common/htmlContent';
import { IMouseEvent } from 'vs/base/browser/mouseEvent';
export declare type RenderableContent = string | IHTMLContentElement | IHTMLContentElement[];
export interface RenderOptions {
    actionCallback?: (content: string, event?: IMouseEvent) => void;
    codeBlockRenderer?: (modeId: string, value: string) => string | TPromise<string>;
}
export declare function renderMarkedString(markedStrings: MarkedString[], options?: RenderOptions): Node;
/**
 * Create html nodes for the given content element.
 *
 * @param content a html element description
 * @param actionCallback a callback function for any action links in the string. Argument is the zero-based index of the clicked action.
 */
export declare function renderHtml(content: RenderableContent, options?: RenderOptions): Node;
