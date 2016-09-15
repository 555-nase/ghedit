import { OverviewRulerPosition, OverviewRulerZone } from 'vs/editor/common/editorCommon';
export declare class OverviewRulerImpl {
    static hasCanvas: boolean;
    private _canvasLeftOffset;
    private _domNode;
    private _lanesCount;
    private _zoneManager;
    private _canUseTranslate3d;
    private _zoomListener;
    constructor(canvasLeftOffset: number, cssClassName: string, scrollHeight: number, lineHeight: number, canUseTranslate3d: boolean, minimumHeight: number, maximumHeight: number, getVerticalOffsetForLine: (lineNumber: number) => number);
    dispose(): void;
    setLayout(position: OverviewRulerPosition, render: boolean): void;
    getLanesCount(): number;
    setLanesCount(newLanesCount: number, render: boolean): void;
    setUseDarkColor(useDarkColor: boolean, render: boolean): void;
    getDomNode(): HTMLCanvasElement;
    getPixelWidth(): number;
    getPixelHeight(): number;
    setScrollHeight(scrollHeight: number, render: boolean): void;
    setLineHeight(lineHeight: number, render: boolean): void;
    setCanUseTranslate3d(canUseTranslate3d: boolean, render: boolean): void;
    setZones(zones: OverviewRulerZone[], render: boolean): void;
    render(forceRender: boolean): boolean;
    private _renderOneLane(ctx, colorZones, id2Color, w);
    private _renderTwoLanes(ctx, colorZones, id2Color, w);
    private _renderThreeLanes(ctx, colorZones, id2Color, w);
    private _renderVerticalPatch(ctx, colorZones, id2Color, laneMask, xpos, width);
}
