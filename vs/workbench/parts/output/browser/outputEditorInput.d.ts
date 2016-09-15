import { TPromise } from 'vs/base/common/winjs.base';
import { EditorModel } from 'vs/workbench/common/editor';
import { StringEditorInput } from 'vs/workbench/common/editor/stringEditorInput';
import { IOutputService, IOutputChannel } from 'vs/workbench/parts/output/common/output';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IEventService } from 'vs/platform/event/common/event';
import { IPanelService } from 'vs/workbench/services/panel/common/panelService';
/**
 * Output Editor Input
 */
export declare class OutputEditorInput extends StringEditorInput {
    private outputChannel;
    private outputService;
    private panelService;
    private eventService;
    private static OUTPUT_DELAY;
    private static instances;
    private outputSet;
    private bufferedOutput;
    private toDispose;
    private appendOutputScheduler;
    static getInstances(): OutputEditorInput[];
    static getInstance(instantiationService: IInstantiationService, channel: IOutputChannel): OutputEditorInput;
    constructor(outputChannel: IOutputChannel, instantiationService: IInstantiationService, outputService: IOutputService, panelService: IPanelService, eventService: IEventService);
    private appendOutput();
    private onOutputReceived(e);
    private isVisible();
    private scheduleOutputAppend();
    getTypeId(): string;
    resolve(refresh?: boolean): TPromise<EditorModel>;
    matches(otherInput: any): boolean;
    dispose(): void;
}
