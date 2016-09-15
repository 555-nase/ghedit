import 'vs/css!./media/statusbarpart';
import { IDisposable } from 'vs/base/common/lifecycle';
import { Builder } from 'vs/base/browser/builder';
import { Part } from 'vs/workbench/browser/part';
import { StatusbarAlignment } from 'vs/workbench/browser/parts/statusbar/statusbar';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IStatusbarService, IStatusbarEntry } from 'vs/platform/statusbar/common/statusbar';
export declare class StatusbarPart extends Part implements IStatusbarService {
    private instantiationService;
    _serviceBrand: any;
    private static PRIORITY_PROP;
    private static ALIGNMENT_PROP;
    private toDispose;
    private statusItemsContainer;
    private statusMsgDispose;
    constructor(id: string, instantiationService: IInstantiationService);
    addEntry(entry: IStatusbarEntry, alignment: StatusbarAlignment, priority?: number): IDisposable;
    private getEntries(alignment);
    createContentArea(parent: Builder): Builder;
    private doCreateStatusItem(alignment, priority?);
    setStatusMessage(message: string, autoDisposeAfter?: number, delayBy?: number): IDisposable;
    dispose(): void;
}
