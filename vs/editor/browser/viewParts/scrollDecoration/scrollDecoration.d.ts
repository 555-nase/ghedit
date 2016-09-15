import 'vs/css!./scrollDecoration';
import { IConfigurationChangedEvent, EditorLayoutInfo, IScrollEvent } from 'vs/editor/common/editorCommon';
import { ViewPart } from 'vs/editor/browser/view/viewPart';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext, IRestrictedRenderingContext } from 'vs/editor/common/view/renderingContext';
export declare class ScrollDecorationViewPart extends ViewPart {
    private _domNode;
    private _scrollTop;
    private _width;
    private _shouldShow;
    private _useShadows;
    constructor(context: ViewContext);
    private _updateShouldShow();
    getDomNode(): HTMLElement;
    onConfigurationChanged(e: IConfigurationChangedEvent): boolean;
    onLayoutChanged(layoutInfo: EditorLayoutInfo): boolean;
    onScrollChanged(e: IScrollEvent): boolean;
    prepareRender(ctx: IRenderingContext): void;
    render(ctx: IRestrictedRenderingContext): void;
}
