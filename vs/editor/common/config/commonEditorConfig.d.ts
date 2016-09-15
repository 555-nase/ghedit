import Event from 'vs/base/common/event';
import { Disposable } from 'vs/base/common/lifecycle';
import * as editorCommon from 'vs/editor/common/editorCommon';
export interface IEditorZoom {
    onDidChangeZoomLevel: Event<number>;
    getZoomLevel(): number;
    setZoomLevel(zoomLevel: number): void;
}
export declare const EditorZoom: IEditorZoom;
/**
 * Control what pressing Tab does.
 * If it is false, pressing Tab or Shift-Tab will be handled by the editor.
 * If it is true, pressing Tab or Shift-Tab will move the browser focus.
 * Defaults to false.
 */
export interface ITabFocus {
    onDidChangeTabFocus: Event<boolean>;
    getTabFocusMode(): boolean;
    setTabFocusMode(tabFocusMode: boolean): void;
}
export declare const TabFocus: ITabFocus;
/**
 * Experimental screen reader support toggle
 */
export declare class GlobalScreenReaderNVDA {
    private static _value;
    private static _onChange;
    static onChange: Event<boolean>;
    static getValue(): boolean;
    static setValue(value: boolean): void;
}
export declare class ConfigurationWithDefaults {
    private _editor;
    constructor(options: editorCommon.IEditorOptions);
    getEditorOptions(): editorCommon.IEditorOptions;
    private _mergeOptionsIn(newOptions);
    updateOptions(newOptions: editorCommon.IEditorOptions): void;
}
export interface IElementSizeObserver {
    startObserving(): void;
    observe(dimension?: editorCommon.IDimension): void;
    dispose(): void;
    getWidth(): number;
    getHeight(): number;
}
export declare abstract class CommonEditorConfiguration extends Disposable implements editorCommon.IConfiguration {
    editor: editorCommon.InternalEditorOptions;
    editorClone: editorCommon.InternalEditorOptions;
    protected _configWithDefaults: ConfigurationWithDefaults;
    protected _elementSizeObserver: IElementSizeObserver;
    private _isDominatedByLongLines;
    private _maxLineNumber;
    private _onDidChange;
    onDidChange: Event<editorCommon.IConfigurationChangedEvent>;
    constructor(options: editorCommon.IEditorOptions, elementSizeObserver?: IElementSizeObserver);
    dispose(): void;
    protected _recomputeOptions(): void;
    private _setOptions(newOptions);
    getRawOptions(): editorCommon.IEditorOptions;
    private _computeInternalOptions();
    updateOptions(newOptions: editorCommon.IEditorOptions): void;
    setIsDominatedByLongLines(isDominatedByLongLines: boolean): void;
    setMaxLineNumber(maxLineNumber: number): void;
    protected abstract _getEditorClassName(theme: string, fontLigatures: boolean): string;
    protected abstract getOuterWidth(): number;
    protected abstract getOuterHeight(): number;
    protected abstract _getCanUseTranslate3d(): boolean;
    protected abstract readConfiguration(styling: editorCommon.BareFontInfo): editorCommon.FontInfo;
}
/**
 * Helper to update Monaco Editor Settings from configurations service.
 */
export declare class EditorConfiguration {
    static EDITOR_SECTION: string;
    static DIFF_EDITOR_SECTION: string;
    /**
     * Ask the provided configuration service to apply its configuration to the provided editor.
     */
    static apply(config: any, editor: editorCommon.IEditor): void;
}
