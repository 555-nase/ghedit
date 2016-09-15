import URI from 'vs/base/common/uri';
import Severity from 'vs/base/common/severity';
import Event from 'vs/base/common/event';
export declare const IMarkerService: {
    (...args: any[]): void;
    type: IMarkerService;
};
export interface IMarkerService {
    _serviceBrand: any;
    getStatistics(): MarkerStatistics;
    changeOne(owner: string, resource: URI, markers: IMarkerData[]): void;
    changeAll(owner: string, data: IResourceMarker[]): void;
    remove(owner: string, resources: URI[]): void;
    read(filter?: {
        owner?: string;
        resource?: URI;
        selector?: RegExp;
        take?: number;
    }): IMarker[];
    onMarkerChanged: Event<URI[]>;
}
export declare enum MarkerType {
    transient = 1,
    permanent = 2,
}
/**
 * A structure defining a problem/warning/etc.
 */
export interface IMarkerData {
    code?: string;
    severity: Severity;
    message: string;
    source?: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}
export interface IResourceMarker {
    resource: URI;
    marker: IMarkerData;
}
export interface IMarker {
    owner: string;
    resource: URI;
    severity: Severity;
    code?: string;
    message: string;
    source?: string;
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}
export interface MarkerStatistics {
    errors: number;
    warnings: number;
    infos: number;
    unknwons: number;
}
