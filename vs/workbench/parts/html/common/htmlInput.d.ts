import URI from 'vs/base/common/uri';
import { ResourceEditorInput } from 'vs/workbench/common/editor/resourceEditorInput';
export declare class HtmlInput extends ResourceEditorInput {
    getResource(): URI;
}
