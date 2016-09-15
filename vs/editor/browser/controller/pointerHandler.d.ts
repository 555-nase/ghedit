import { IDisposable } from 'vs/base/common/lifecycle';
import { IScrollEvent } from 'vs/editor/common/editorCommon';
import { IPointerHandlerHelper } from 'vs/editor/browser/controller/mouseHandler';
import { IViewController } from 'vs/editor/browser/editorBrowser';
import { ViewContext } from 'vs/editor/common/view/viewContext';
export declare class PointerHandler implements IDisposable {
    private handler;
    constructor(context: ViewContext, viewController: IViewController, viewHelper: IPointerHandlerHelper);
    onScrollChanged(e: IScrollEvent): void;
    dispose(): void;
}
