import modes = require('vs/editor/common/modes');
import htmlMode = require('vs/languages/html/common/html');
import htmlWorker = require('vs/languages/html/common/htmlWorker');
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IModeService } from 'vs/editor/common/services/modeService';
import { LanguageConfiguration } from 'vs/editor/common/modes/languageConfigurationRegistry';
import { ILeavingNestedModeData } from 'vs/editor/common/modes/supports/tokenizationSupport';
import { ICompatWorkerService } from 'vs/editor/common/services/compatWorkerService';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
export declare enum States {
    HTML = 0,
    Expression = 1,
    UnescapedExpression = 2,
}
export declare class HandlebarsState extends htmlMode.State {
    handlebarsKind: States;
    constructor(mode: modes.IMode, kind: htmlMode.States, handlebarsKind: States, lastTagName: string, lastAttributeName: string, embeddedContentType: string, attributeValueQuote: string, attributeValueLength: number);
    makeClone(): HandlebarsState;
    equals(other: modes.IState): boolean;
    tokenize(stream: modes.IStream): modes.ITokenizationResult;
}
export declare class HandlebarsMode extends htmlMode.HTMLMode<htmlWorker.HTMLWorker> {
    static LANG_CONFIG: LanguageConfiguration;
    constructor(descriptor: modes.IModeDescriptor, instantiationService: IInstantiationService, modeService: IModeService, compatWorkerService: ICompatWorkerService, workspaceContextService: IWorkspaceContextService);
    protected _registerSupports(): void;
    getInitialState(): modes.IState;
    getLeavingNestedModeData(line: string, state: modes.IState): ILeavingNestedModeData;
}
