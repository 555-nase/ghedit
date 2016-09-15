import { EmitterEvent } from 'vs/base/common/eventEmitter';
import * as editorCommon from 'vs/editor/common/editorCommon';
export declare class ViewEventHandler {
    private _shouldRender;
    constructor();
    shouldRender(): boolean;
    protected setShouldRender(): void;
    onDidRender(): void;
    onLineMappingChanged(): boolean;
    onModelFlushed(): boolean;
    onModelDecorationsChanged(e: editorCommon.IViewDecorationsChangedEvent): boolean;
    onModelLinesDeleted(e: editorCommon.IViewLinesDeletedEvent): boolean;
    onModelLineChanged(e: editorCommon.IViewLineChangedEvent): boolean;
    onModelLinesInserted(e: editorCommon.IViewLinesInsertedEvent): boolean;
    onModelTokensChanged(e: editorCommon.IViewTokensChangedEvent): boolean;
    onCursorPositionChanged(e: editorCommon.IViewCursorPositionChangedEvent): boolean;
    onCursorSelectionChanged(e: editorCommon.IViewCursorSelectionChangedEvent): boolean;
    onCursorRevealRange(e: editorCommon.IViewRevealRangeEvent): boolean;
    onCursorScrollRequest(e: editorCommon.IViewScrollRequestEvent): boolean;
    onConfigurationChanged(e: editorCommon.IConfigurationChangedEvent): boolean;
    onLayoutChanged(layoutInfo: editorCommon.EditorLayoutInfo): boolean;
    onScrollChanged(e: editorCommon.IScrollEvent): boolean;
    onZonesChanged(): boolean;
    onViewFocusChanged(isFocused: boolean): boolean;
    handleEvents(events: EmitterEvent[]): void;
}
