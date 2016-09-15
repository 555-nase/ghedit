export interface IBadge {
    getDescription(): string;
}
export declare class BaseBadge implements IBadge {
    descriptorFn: (args: any) => string;
    constructor(descriptorFn: (args: any) => string);
    getDescription(): string;
}
export declare class NumberBadge extends BaseBadge {
    number: number;
    constructor(number: number, descriptorFn: (args: any) => string);
    getDescription(): string;
}
export declare class TextBadge extends BaseBadge {
    text: string;
    constructor(text: string, descriptorFn: (args: any) => string);
}
export declare class IconBadge extends BaseBadge {
    constructor(descriptorFn: (args: any) => string);
}
export declare class ProgressBadge extends BaseBadge {
}
export declare const IActivityService: {
    (...args: any[]): void;
    type: IActivityService;
};
export interface IActivityService {
    _serviceBrand: any;
    /**
     * Show activity in the activitybar for the given viewlet.
     */
    showActivity(viewletId: string, badge: IBadge, clazz?: string): void;
    /**
     * Clears activity shown in the activitybar for the given viewlet.
     */
    clearActivity(viewletId: string): void;
}
