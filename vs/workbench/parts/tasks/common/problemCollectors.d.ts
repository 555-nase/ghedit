import URI from 'vs/base/common/uri';
import { EventEmitter } from 'vs/base/common/eventEmitter';
import { IDisposable } from 'vs/base/common/lifecycle';
import { IModelService } from 'vs/editor/common/services/modelService';
import { ProblemMatcher, ProblemMatch } from 'vs/platform/markers/common/problemMatcher';
import { IMarkerService } from 'vs/platform/markers/common/markers';
export declare namespace ProblemCollectorEvents {
    let WatchingBeginDetected: string;
    let WatchingEndDetected: string;
}
export interface IProblemMatcher {
    processLine(line: string): void;
}
export declare class AbstractProblemCollector extends EventEmitter implements IDisposable {
    private modelService;
    private matchers;
    private activeMatcher;
    private _numberOfMatches;
    private buffer;
    private bufferLength;
    private openModels;
    private modelListeners;
    constructor(problemMatchers: ProblemMatcher[], modelService: IModelService);
    dispose(): void;
    numberOfMatches: number;
    protected tryFindMarker(line: string): ProblemMatch;
    protected isOpen(resource: URI): boolean;
    protected shouldApplyMatch(result: ProblemMatch): boolean;
    private tryMatchers();
    private clearBuffer();
}
export declare enum ProblemHandlingStrategy {
    Clean = 0,
}
export declare class StartStopProblemCollector extends AbstractProblemCollector implements IProblemMatcher {
    private owners;
    private markerService;
    private strategy;
    private currentResourcesWithMarkers;
    private reportedResourcesWithMarkers;
    private currentResource;
    private currentResourceAsString;
    private markers;
    constructor(problemMatchers: ProblemMatcher[], markerService: IMarkerService, modelService: IModelService, strategy?: ProblemHandlingStrategy);
    processLine(line: string): void;
    done(): void;
}
export declare class WatchingProblemCollector extends AbstractProblemCollector implements IProblemMatcher {
    private problemMatchers;
    private watchingBeginsPatterns;
    private watchingEndsPatterns;
    private markerService;
    private currentResource;
    private currentResourceAsString;
    private markers;
    private ignoreOpenResourcesByOwner;
    private resourcesToClean;
    constructor(problemMatchers: ProblemMatcher[], markerService: IMarkerService, modelService: IModelService);
    aboutToStart(): void;
    processLine(line: string): void;
    forceDelivery(): void;
    private tryBegin(line);
    private tryFinish(line);
    private recordResourcesToClean(owner);
    private recordResourceToClean(owner, resource);
    private removeResourceToClean(owner, resource);
    private cleanMarkers(owner, remove?);
    private deliverMarkersForCurrentResource(resetCurrentResource?);
    private getResourceSetToClean(owner);
    private resetCurrentResource();
}
