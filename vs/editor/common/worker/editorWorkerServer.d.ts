import 'vs/editor/common/languages.common';
import { WorkerServer } from 'vs/base/common/worker/workerServer';
import { ILanguageExtensionPoint } from 'vs/editor/common/services/modeService';
import { ILegacyLanguageDefinition } from 'vs/editor/common/modes/modesRegistry';
export interface IInitData {
    modesRegistryData?: {
        compatModes: ILegacyLanguageDefinition[];
        languages: ILanguageExtensionPoint[];
    };
}
export interface ICallback {
    (something: any): void;
}
export declare class EditorWorkerServer {
    private compatWorkerService;
    constructor();
    initialize(mainThread: WorkerServer, complete: ICallback, error: ICallback, progress: ICallback, initData: IInitData): void;
    request(mainThread: WorkerServer, complete: ICallback, error: ICallback, progress: ICallback, data: any): void;
}
export declare var value: EditorWorkerServer;
