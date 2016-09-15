import { IStatusbarService, StatusbarAlignment as MainThreadStatusBarAlignment } from 'vs/platform/statusbar/common/statusbar';
import { MainThreadStatusBarShape } from './extHost.protocol';
export declare class MainThreadStatusBar extends MainThreadStatusBarShape {
    private statusbarService;
    private mapIdToDisposable;
    constructor(statusbarService: IStatusbarService);
    $setEntry(id: number, text: string, tooltip: string, command: string, color: string, alignment: MainThreadStatusBarAlignment, priority: number): void;
    $dispose(id: number): void;
}
