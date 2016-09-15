import { IDisposable } from 'vs/base/common/lifecycle';
import { TPromise } from 'vs/base/common/winjs.base';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IModeSupportChangedEvent } from 'vs/editor/common/editorCommon';
import * as modes from 'vs/editor/common/modes';
import { IEditorWorkerService } from 'vs/editor/common/services/editorWorkerService';
import { ICompatWorkerService, ICompatMode } from 'vs/editor/common/services/compatWorkerService';
export declare function createWordRegExp(allowInWords?: string): RegExp;
export declare class ModeWorkerManager<W> {
    private _descriptor;
    private _workerDescriptor;
    private _superWorkerModuleId;
    private _instantiationService;
    private _workerPiecePromise;
    constructor(descriptor: modes.IModeDescriptor, workerModuleId: string, workerClassName: string, superWorkerModuleId: string, instantiationService: IInstantiationService);
    worker<T>(runner: (worker: W) => TPromise<T>): TPromise<T>;
    private _getOrCreateWorker();
    private static _loadModule(moduleName);
}
export declare abstract class AbstractMode implements modes.IMode {
    private _modeId;
    private _eventEmitter;
    private _simplifiedMode;
    constructor(modeId: string);
    getId(): string;
    toSimplifiedMode(): modes.IMode;
    addSupportChangedListener(callback: (e: IModeSupportChangedEvent) => void): IDisposable;
    setTokenizationSupport<T>(callback: (mode: modes.IMode) => T): IDisposable;
}
export declare abstract class CompatMode extends AbstractMode implements ICompatMode {
    compatWorkerService: ICompatWorkerService;
    constructor(modeId: string, compatWorkerService: ICompatWorkerService);
}
export declare var isDigit: (character: string, base: number) => boolean;
export declare class FrankensteinMode extends AbstractMode {
    constructor(descriptor: modes.IModeDescriptor, configurationService: IConfigurationService, editorWorkerService: IEditorWorkerService);
}
