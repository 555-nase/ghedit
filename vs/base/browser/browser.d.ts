import { IDisposable } from 'vs/base/common/lifecycle';
export declare function getZoomLevel(): number;
export declare function getPixelRatio(): number;
export declare function setZoomLevel(zoomLevel: number): void;
export declare function onDidChangeZoomLevel(callback: (zoomLevel: number) => void): IDisposable;
export declare const isIE11: boolean;
export declare const isIE10: boolean;
export declare const isIE9: boolean;
export declare const isIE11orEarlier: boolean;
export declare const isIE10orEarlier: boolean;
export declare const isIE10orLater: boolean;
export declare const isOpera: boolean;
export declare const isFirefox: boolean;
export declare const isWebKit: boolean;
export declare const isChrome: boolean;
export declare const isSafari: boolean;
export declare const isIPad: boolean;
export declare const canUseTranslate3d: boolean;
export declare const enableEmptySelectionClipboard: boolean;
/**
 * Returns if the browser supports CSS 3 animations.
 */
export declare function hasCSSAnimationSupport(): any;
export declare function supportsExecCommand(command: string): boolean;
