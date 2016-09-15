import * as editorCommon from 'vs/editor/common/editorCommon';
import { IViewZone } from 'vs/editor/browser/editorBrowser';
import { ViewPart } from 'vs/editor/browser/view/viewPart';
import { ViewContext } from 'vs/editor/common/view/viewContext';
import { IRenderingContext, IRestrictedRenderingContext } from 'vs/editor/common/view/renderingContext';
import { IWhitespaceManager } from 'vs/editor/browser/viewLayout/layoutProvider';
export interface IMyViewZone {
    whitespaceId: number;
    delegate: IViewZone;
    isVisible: boolean;
}
export interface IMyRenderData {
    data: editorCommon.IViewWhitespaceViewportData[];
}
export declare class ViewZones extends ViewPart {
    private _whitespaceManager;
    private _zones;
    private _lineHeight;
    private _contentWidth;
    domNode: HTMLElement;
    constructor(context: ViewContext, whitespaceManager: IWhitespaceManager);
    dispose(): void;
    private _recomputeWhitespacesProps();
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): boolean;
    onLineMappingChanged(): boolean;
    onLayoutChanged(layoutInfo: editorCommon.EditorLayoutInfo): boolean;
    onScrollChanged(e: editorCommon.IScrollEvent): boolean;
    onZonesChanged(): boolean;
    onModelLinesDeleted(e: editorCommon.IModelContentChangedLinesDeletedEvent): boolean;
    onModelLinesInserted(e: editorCommon.IViewLinesInsertedEvent): boolean;
    private _getZoneOrdinal(zone);
    private _computeWhitespaceProps(zone);
    addZone(zone: IViewZone): number;
    removeZone(id: number): boolean;
    layoutZone(id: number): boolean;
    shouldSuppressMouseDownOnViewZone(id: number): boolean;
    private _heightInPixels(zone);
    private _safeCallOnComputedHeight(zone, height);
    private _safeCallOnDomNodeTop(zone, top);
    prepareRender(ctx: IRenderingContext): void;
    render(ctx: IRestrictedRenderingContext): void;
}
