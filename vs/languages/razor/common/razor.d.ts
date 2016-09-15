import modes = require('vs/editor/common/modes');
import htmlMode = require('vs/languages/html/common/html');
import { ModeWorkerManager } from 'vs/editor/common/modes/abstractMode';
import { RAZORWorker } from 'vs/languages/razor/common/razorWorker';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IModeService } from 'vs/editor/common/services/modeService';
import { LanguageConfiguration } from 'vs/editor/common/modes/languageConfigurationRegistry';
import { ILeavingNestedModeData } from 'vs/editor/common/modes/supports/tokenizationSupport';
import { ICompatWorkerService } from 'vs/editor/common/services/compatWorkerService';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
export declare class RAZORMode extends htmlMode.HTMLMode<RAZORWorker> {
    static LANG_CONFIG: LanguageConfiguration;
    constructor(descriptor: modes.IModeDescriptor, instantiationService: IInstantiationService, modeService: IModeService, compatWorkerService: ICompatWorkerService, workspaceContextService: IWorkspaceContextService);
    protected _registerSupports(): void;
    protected _createModeWorkerManager(descriptor: modes.IModeDescriptor, instantiationService: IInstantiationService): ModeWorkerManager<RAZORWorker>;
    getInitialState(): modes.IState;
    getLeavingNestedModeData(line: string, state: modes.IState): ILeavingNestedModeData;
}
