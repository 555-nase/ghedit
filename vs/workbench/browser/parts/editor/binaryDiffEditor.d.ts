import 'vs/css!./media/binarydiffeditor';
import { TPromise } from 'vs/base/common/winjs.base';
import { Sash, IVerticalSashLayoutProvider } from 'vs/base/browser/ui/sash/sash';
import { Dimension, Builder } from 'vs/base/browser/builder';
import { BaseEditor } from 'vs/workbench/browser/parts/editor/baseEditor';
import { EditorInput, EditorOptions } from 'vs/workbench/common/editor';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
/**
 * An implementation of editor for diffing binary files like images or videos.
 */
export declare class BinaryResourceDiffEditor extends BaseEditor implements IVerticalSashLayoutProvider {
    private editorService;
    static ID: string;
    private static MIN_CONTAINER_WIDTH;
    private leftBinaryContainer;
    private leftScrollbar;
    private rightBinaryContainer;
    private rightScrollbar;
    private sash;
    private dimension;
    private leftContainerWidth;
    private startLeftContainerWidth;
    constructor(telemetryService: ITelemetryService, editorService: IWorkbenchEditorService);
    getTitle(): string;
    createEditor(parent: Builder): void;
    setInput(input: EditorInput, options: EditorOptions): TPromise<void>;
    private renderInput(name, resource, size, isOriginal);
    clearInput(): void;
    layout(dimension: Dimension): void;
    private layoutContainers();
    private onSashDragStart();
    private onSashDrag(e);
    private onSashDragEnd();
    private onSashReset();
    getVerticalSashTop(sash: Sash): number;
    getVerticalSashLeft(sash: Sash): number;
    getVerticalSashHeight(sash: Sash): number;
    focus(): void;
    dispose(): void;
}
