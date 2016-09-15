import 'vs/css!./progressbar';
import { Builder } from 'vs/base/browser/builder';
/**
 * A progress bar with support for infinite or discrete progress.
 */
export declare class ProgressBar {
    private toUnbind;
    private workedVal;
    private element;
    private animationRunning;
    private bit;
    private totalWork;
    private animationStopToken;
    private currentProgressToken;
    constructor(builder: Builder);
    private create(parent);
    private off();
    /**
     * Indicates to the progress bar that all work is done.
     */
    done(): ProgressBar;
    /**
     * Stops the progressbar from showing any progress instantly without fading out.
     */
    stop(): ProgressBar;
    private doDone(delayed);
    /**
     * Use this mode to indicate progress that has no total number of work units.
     */
    infinite(): ProgressBar;
    private manualInfinite(currentProgressToken);
    /**
     * Tells the progress bar the total number of work. Use in combination with workedVal() to let
     * the progress bar show the actual progress based on the work that is done.
     */
    total(value: number): ProgressBar;
    /**
     * Finds out if this progress bar is configured with total work
     */
    hasTotal(): boolean;
    /**
     * Tells the progress bar that an amount of work has been completed.
     */
    worked(value: number): ProgressBar;
    /**
     * Returns the builder this progress bar is building in.
     */
    getContainer(): Builder;
    dispose(): void;
}
