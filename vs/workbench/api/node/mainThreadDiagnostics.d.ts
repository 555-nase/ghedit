import { IMarkerService, IMarkerData } from 'vs/platform/markers/common/markers';
import URI from 'vs/base/common/uri';
import { TPromise } from 'vs/base/common/winjs.base';
import { MainThreadDiagnosticsShape } from './extHost.protocol';
export declare class MainThreadDiagnostics extends MainThreadDiagnosticsShape {
    private _markerService;
    constructor(markerService: IMarkerService);
    $changeMany(owner: string, entries: [URI, IMarkerData[]][]): TPromise<any>;
    $clear(owner: string): TPromise<any>;
}
