import 'vs/css!./rulers';
import * as editorCommon from 'vs/editor/common/editorCommon';
import { ViewPart } from 'vs/editor/browser/view/viewPart';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext, IRestrictedRenderingContext } from 'vs/editor/common/view/renderingContext';
import { ILayoutProvider } from 'vs/editor/browser/viewLayout/layoutProvider';
export declare class Rulers extends ViewPart {
    domNode: HTMLElement;
    private _layoutProvider;
    private _rulers;
    private _height;
    private _typicalHalfwidthCharacterWidth;
    constructor(context: ViewContext, layoutProvider: ILayoutProvider);
    dispose(): void;
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): boolean;
    onScrollChanged(e: editorCommon.IScrollEvent): boolean;
    prepareRender(ctx: IRenderingContext): void;
    render(ctx: IRestrictedRenderingContext): void;
}
