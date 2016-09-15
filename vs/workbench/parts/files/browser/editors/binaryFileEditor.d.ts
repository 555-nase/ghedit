import { BaseBinaryResourceEditor } from 'vs/workbench/browser/parts/editor/binaryEditor';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
/**
 * An implementation of editor for binary files like images or videos leveraging the FileEditorInput.
 */
export declare class BinaryFileEditor extends BaseBinaryResourceEditor {
    static ID: string;
    constructor(telemetryService: ITelemetryService, editorService: IWorkbenchEditorService);
    getTitle(): string;
}
