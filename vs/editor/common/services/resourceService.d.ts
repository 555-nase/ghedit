import { EmitterEvent, ListenerCallback } from 'vs/base/common/eventEmitter';
import { IDisposable } from 'vs/base/common/lifecycle';
import URI from 'vs/base/common/uri';
import { IMirrorModel } from 'vs/editor/common/editorCommon';
export declare var ResourceEvents: {
    ADDED: string;
    REMOVED: string;
    CHANGED: string;
};
export interface IResourceAddedEvent {
    url: URI;
    addedElement: IMirrorModel;
}
export interface IResourceRemovedEvent {
    url: URI;
    removedElement: IMirrorModel;
}
export interface IResourceChangedEvent {
    url: URI;
    originalEvents: EmitterEvent[];
}
export declare var IResourceService: {
    (...args: any[]): void;
    type: IResourceService;
};
export interface IResourceService {
    _serviceBrand: any;
    insert(url: URI, element: IMirrorModel): void;
    get(url: URI): IMirrorModel;
    all(): IMirrorModel[];
    contains(url: URI): boolean;
    remove(url: URI): void;
    addListener2_(eventType: 'resource.added', listener: (event: IResourceAddedEvent) => void): IDisposable;
    addListener2_(eventType: 'resource.removed', listener: (event: IResourceRemovedEvent) => void): IDisposable;
    addListener2_(eventType: 'resource.changed', listener: (event: IResourceChangedEvent) => void): IDisposable;
    addListener2_(eventType: string, listener: ListenerCallback): IDisposable;
}
