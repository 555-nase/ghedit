import { IConfigurationChangedEvent, OverviewRulerPosition, OverviewRulerZone, IScrollEvent } from 'vs/editor/common/editorCommon';
import { ViewEventHandler } from 'vs/editor/common/viewModel/viewEventHandler';
import { IOverviewRuler } from 'vs/editor/browser/editorBrowser';
import { ViewContext } from 'vs/editor/common/view/viewContext';
export declare class OverviewRuler extends ViewEventHandler implements IOverviewRuler {
    private _context;
    private _overviewRuler;
    constructor(context: ViewContext, cssClassName: string, scrollHeight: number, minimumHeight: number, maximumHeight: number, getVerticalOffsetForLine: (lineNumber: number) => number);
    destroy(): void;
    dispose(): void;
    onConfigurationChanged(e: IConfigurationChangedEvent): boolean;
    onZonesChanged(): boolean;
    onModelFlushed(): boolean;
    onScrollChanged(e: IScrollEvent): boolean;
    getDomNode(): HTMLElement;
    setLayout(position: OverviewRulerPosition): void;
    setZones(zones: OverviewRulerZone[]): void;
}
