import { ViewEventHandler } from 'vs/editor/common/viewModel/viewEventHandler';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext, IRestrictedRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare abstract class ViewPart extends ViewEventHandler {
    _context: ViewContext;
    constructor(context: ViewContext);
    dispose(): void;
    abstract prepareRender(ctx: IRenderingContext): void;
    abstract render(ctx: IRestrictedRenderingContext): void;
}
