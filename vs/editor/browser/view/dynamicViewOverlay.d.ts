import { ViewEventHandler } from 'vs/editor/common/viewModel/viewEventHandler';
import { IRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare abstract class DynamicViewOverlay extends ViewEventHandler {
    abstract dispose(): void;
    abstract prepareRender(ctx: IRenderingContext): void;
    abstract render(startLineNumber: number, lineNumber: number): string;
}
