import 'vs/css!./overlayWidgets';
import { EditorLayoutInfo } from 'vs/editor/common/editorCommon';
import { IOverlayWidget, OverlayWidgetPositionPreference } from 'vs/editor/browser/editorBrowser';
import { ViewPart } from 'vs/editor/browser/view/viewPart';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext, IRestrictedRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare class ViewOverlayWidgets extends ViewPart {
    private _widgets;
    domNode: HTMLElement;
    private _verticalScrollbarWidth;
    private _horizontalScrollbarHeight;
    private _editorHeight;
    private _editorWidth;
    constructor(context: ViewContext);
    dispose(): void;
    onLayoutChanged(layoutInfo: EditorLayoutInfo): boolean;
    addWidget(widget: IOverlayWidget): void;
    setWidgetPosition(widget: IOverlayWidget, preference: OverlayWidgetPositionPreference): boolean;
    removeWidget(widget: IOverlayWidget): void;
    private _renderWidget(widgetData);
    prepareRender(ctx: IRenderingContext): void;
    render(ctx: IRestrictedRenderingContext): void;
}
