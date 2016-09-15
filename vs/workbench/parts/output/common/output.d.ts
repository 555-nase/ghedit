import { TPromise } from 'vs/base/common/winjs.base';
import Event from 'vs/base/common/event';
import { IEditor } from 'vs/platform/editor/common/editor';
/**
 * Mime type used by the output editor.
 */
export declare const OUTPUT_MIME: string;
/**
 * Id used by the output editor.
 */
export declare const OUTPUT_MODE_ID: string;
/**
 * Output editor input id.
 */
export declare const OUTPUT_EDITOR_INPUT_ID: string;
/**
 * Output panel id
 */
export declare const OUTPUT_PANEL_ID: string;
export declare const Extensions: {
    OutputChannels: string;
};
export declare const OUTPUT_SERVICE_ID: string;
export declare const MAX_OUTPUT_LENGTH: number;
/**
 * The output event informs when new output got received.
 */
export interface IOutputEvent {
    output: string;
    channelId?: string;
}
export declare const IOutputService: {
    (...args: any[]): void;
    type: IOutputService;
};
/**
 * The output service to manage output from the various processes running.
 */
export interface IOutputService {
    _serviceBrand: any;
    /**
     * Given the channel id returns the output channel instance.
     * Channel should be first registered via OutputChannelRegistry.
     */
    getChannel(id: string): IOutputChannel;
    /**
     * Returns the currently active channel.
     * Only one channel can be active at a given moment.
     */
    getActiveChannel(): IOutputChannel;
    /**
     * Allows to register on Output events.
     */
    onOutput: Event<IOutputEvent>;
    /**
     * Allows to register on a new Output channel getting filled with output.
     */
    onOutputChannel: Event<string>;
    /**
     * Allows to register on active output channel change.
     */
    onActiveOutputChannel: Event<string>;
}
export interface IOutputChannel {
    /**
     * Identifier of the output channel.
     */
    id: string;
    /**
     * Label of the output channel to be displayed to the user.
     */
    label: string;
    /**
     * Returns the received output content.
     */
    output: string;
    /**
     * Appends output to the channel.
     */
    append(output: string): void;
    /**
     * Opens the output for this channel.
     */
    show(preserveFocus?: boolean): TPromise<IEditor>;
    /**
     * Clears all received output for this channel.
     */
    clear(): void;
}
export interface IOutputChannelRegistry {
    /**
     * Make an output channel known to the output world.
     */
    registerChannel(id: string, name: string): void;
    /**
     * Returns the list of channels known to the output world.
     */
    getChannels(): {
        id: string;
        label: string;
    }[];
}
