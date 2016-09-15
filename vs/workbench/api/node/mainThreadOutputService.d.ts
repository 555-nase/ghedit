import { TPromise } from 'vs/base/common/winjs.base';
import { IOutputService } from 'vs/workbench/parts/output/common/output';
import { IPartService } from 'vs/workbench/services/part/common/partService';
import { IPanelService } from 'vs/workbench/services/panel/common/panelService';
import { MainThreadOutputServiceShape } from './extHost.protocol';
export declare class MainThreadOutputService extends MainThreadOutputServiceShape {
    private _outputService;
    private _partService;
    private _panelService;
    constructor(outputService: IOutputService, partService: IPartService, panelService: IPanelService);
    $append(channelId: string, label: string, value: string): TPromise<void>;
    $clear(channelId: string, label: string): TPromise<void>;
    $reveal(channelId: string, label: string, preserveFocus: boolean): TPromise<void>;
    private _getChannel(channelId, label);
    $close(channelId: string): TPromise<void>;
}
