import { TPromise } from 'vs/base/common/winjs.base';
import { ServiceIdentifier } from 'vs/platform/instantiation/common/instantiation';
export declare enum Parts {
    ACTIVITYBAR_PART = 0,
    SIDEBAR_PART = 1,
    PANEL_PART = 2,
    EDITOR_PART = 3,
    STATUSBAR_PART = 4,
}
export declare enum Position {
    LEFT = 0,
    RIGHT = 1,
}
export declare const IPartService: {
    (...args: any[]): void;
    type: IPartService;
};
export interface IPartService {
    _serviceBrand: ServiceIdentifier<any>;
    /**
     * Asks the part service to layout all parts.
     */
    layout(): void;
    /**
     * Asks the part service to if all parts have been created.
     */
    isCreated(): boolean;
    /**
     * Promise is complete when all parts have been created.
     */
    joinCreation(): TPromise<boolean>;
    /**
     * Returns whether the given part has the keyboard focus or not.
     */
    hasFocus(part: Parts): boolean;
    /**
     * Returns iff the part is visible.
     */
    isVisible(part: Parts): boolean;
    /**
     * Checks if the statusbar is currently hidden or not
     */
    isStatusBarHidden(): boolean;
    /**
     * Set statusbar hidden or not
     */
    setStatusBarHidden(hidden: boolean): void;
    /**
     * Checks if the sidebar is currently hidden or not
     */
    isSideBarHidden(): boolean;
    /**
     * Set sidebar hidden or not
     */
    setSideBarHidden(hidden: boolean): void;
    /**
     * Checks if the panel part is currently hidden or not
     */
    isPanelHidden(): boolean;
    /**
     * Set panel part hidden or not
     */
    setPanelHidden(hidden: boolean): void;
    /**
     * Gets the current side bar position. Note that the sidebar can be hidden too.
     */
    getSideBarPosition(): Position;
    /**
     * Sets the side bar position. If the side bar is hidden, the side bar will
     * also be made visible.
     */
    setSideBarPosition(position: Position): void;
    /**
     * Adds a class to the workbench part.
     */
    addClass(clazz: string): void;
    /**
     * Removes a class from the workbench part.
     */
    removeClass(clazz: string): void;
}
