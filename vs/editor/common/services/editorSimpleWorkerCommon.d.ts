import * as editorCommon from 'vs/editor/common/editorCommon';
export interface IRawModelData {
    url: string;
    versionId: number;
    value: editorCommon.IRawText;
}
