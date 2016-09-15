var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)};define(["require","exports","vs/nls","vs/base/common/event","vs/base/common/lifecycle","vs/base/common/objects","vs/base/common/platform","vs/platform/configuration/common/configurationRegistry","vs/platform/platform","vs/editor/common/config/defaultConfig","vs/editor/common/editorCommon","vs/editor/common/viewLayout/editorLayoutProvider","vs/base/common/scrollable"],function(e,t,i,o,n,r,a,s,l,d,u,c,p){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function h(e){return"false"!==e&&Boolean(e)}function g(e,t){return"undefined"==typeof e?t:h(e)}function f(e,t){var i=parseFloat(e);return isNaN(i)&&(i=t),i}function m(e,t,i){void 0===t&&(t=z),void 0===i&&(i=v);var o=parseInt(e,10);return isNaN(o)&&(o=0),o=Math.max(t,o),o=Math.min(i,o),0|o}function b(e){if(!Array.isArray(e))return[];var t=e,i=t.map(function(e){return m(e)});return i.sort(),i}function C(e){return"indent"===e?u.WrappingIndent.Indent:"same"===e?u.WrappingIndent.Same:u.WrappingIndent.None}function y(e){return"line"===e?u.TextEditorCursorStyle.Line:"block"===e?u.TextEditorCursorStyle.Block:"underline"===e?u.TextEditorCursorStyle.Underline:u.TextEditorCursorStyle.Line}function S(e){switch(e){case"blink":return u.TextEditorCursorBlinkingStyle.Blink;case"smooth":return u.TextEditorCursorBlinkingStyle.Smooth;case"phase":return u.TextEditorCursorBlinkingStyle.Phase;case"expand":return u.TextEditorCursorBlinkingStyle.Expand;case"visible":case"solid":return u.TextEditorCursorBlinkingStyle.Solid}return u.TextEditorCursorBlinkingStyle.Blink}function w(e,t){return"undefined"==typeof e?t:m(e)}var v=2147483647,z=-2147483648;t.EditorZoom=new(function(){function e(){this._zoomLevel=0,this._onDidChangeZoomLevel=new o.Emitter,this.onDidChangeZoomLevel=this._onDidChangeZoomLevel.event}return e.prototype.getZoomLevel=function(){return this._zoomLevel},e.prototype.setZoomLevel=function(e){e=Math.min(Math.max(-9,e),9),this._zoomLevel!==e&&(this._zoomLevel=e,this._onDidChangeZoomLevel.fire(this._zoomLevel))},e}()),t.TabFocus=new(function(){function e(){this._tabFocus=!1,this._onDidChangeTabFocus=new o.Emitter,this.onDidChangeTabFocus=this._onDidChangeTabFocus.event}return e.prototype.getTabFocusMode=function(){return this._tabFocus},e.prototype.setTabFocusMode=function(e){this._tabFocus!==e&&(this._tabFocus=e,this._onDidChangeTabFocus.fire(this._tabFocus))},e}());var D=function(){function e(){}return e.getValue=function(){return this._value},e.setValue=function(e){this._value!==e&&(this._value=e,this._onChange.fire(this._value))},e._value=!1,e._onChange=new o.Emitter,e.onChange=e._onChange.event,e}();t.GlobalScreenReaderNVDA=D;var _=function(){function e(e){this._editor=r.clone(d.DefaultConfig.editor),this._mergeOptionsIn(e)}return e.prototype.getEditorOptions=function(){return this._editor},e.prototype._mergeOptionsIn=function(e){this._editor=r.mixin(this._editor,e||{})},e.prototype.updateOptions=function(e){this._mergeOptionsIn(e)},e}();t.ConfigurationWithDefaults=_;var I=function(){function e(){}return e.createInternalEditorOptions=function(e,i,o,n,r,a,s,l){var d,p=m(o.wrappingColumn,-1);d="undefined"!=typeof o.stopRenderingLineAfter?m(o.stopRenderingLineAfter,-1):p>=0?-1:1e4;var g=f(o.mouseWheelScrollSensitivity,1),w=this._sanitizeScrollbarOpts(o.scrollbar,g),v=h(o.glyphMargin),z=o.lineNumbers,D=m(o.lineNumbersMinChars,1),_=m(o.lineDecorationsWidth,0);o.folding&&(_+=16);var I=c.EditorLayoutProvider.compute({outerWidth:e,outerHeight:i,showGlyphMargin:v,lineHeight:n.lineHeight,showLineNumbers:!!z,lineNumbersMinChars:D,lineDecorationsWidth:_,maxDigitWidth:n.maxDigitWidth,maxLineNumber:s,verticalScrollbarWidth:w.verticalScrollbarSize,horizontalScrollbarHeight:w.horizontalScrollbarSize,scrollbarArrowSize:w.arrowSize,verticalScrollbarHasArrows:w.verticalHasArrows});a&&p>0&&(p=0);var E;E=0===p?{isViewportWrapping:!0,wrappingColumn:Math.max(1,Math.floor((I.contentWidth-I.verticalScrollbarWidth)/n.typicalHalfwidthCharacterWidth))}:p>0?{isViewportWrapping:!1,wrappingColumn:p}:{isViewportWrapping:!1,wrappingColumn:-1};var O=new u.EditorWrappingInfo({isViewportWrapping:E.isViewportWrapping,wrappingColumn:E.wrappingColumn,wrappingIndent:C(o.wrappingIndent),wordWrapBreakBeforeCharacters:String(o.wordWrapBreakBeforeCharacters),wordWrapBreakAfterCharacters:String(o.wordWrapBreakAfterCharacters),wordWrapBreakObtrusiveCharacters:String(o.wordWrapBreakObtrusiveCharacters)}),T=h(o.readOnly),L=t.TabFocus.getTabFocusMode();T&&(L=!0);var W=new u.InternalEditorViewOptions({theme:o.theme,canUseTranslate3d:l,experimentalScreenReader:h(o.experimentalScreenReader),rulers:b(o.rulers),ariaLabel:String(o.ariaLabel),lineNumbers:z,selectOnLineNumbers:h(o.selectOnLineNumbers),glyphMargin:v,revealHorizontalRightPadding:m(o.revealHorizontalRightPadding,0),roundedSelection:h(o.roundedSelection),overviewRulerLanes:m(o.overviewRulerLanes,0,3),cursorBlinking:S(o.cursorBlinking),mouseWheelZoom:h(o.mouseWheelZoom),cursorStyle:y(o.cursorStyle),hideCursorInOverviewRuler:h(o.hideCursorInOverviewRuler),scrollBeyondLastLine:h(o.scrollBeyondLastLine),editorClassName:r,stopRenderingLineAfter:d,renderWhitespace:h(o.renderWhitespace),renderControlCharacters:h(o.renderControlCharacters),renderIndentGuides:h(o.renderIndentGuides),scrollbar:w}),k=new u.EditorContribOptions({selectionClipboard:h(o.selectionClipboard),hover:h(o.hover),contextmenu:h(o.contextmenu),quickSuggestions:h(o.quickSuggestions),quickSuggestionsDelay:m(o.quickSuggestionsDelay),parameterHints:h(o.parameterHints),iconsInSuggestions:h(o.iconsInSuggestions),formatOnType:h(o.formatOnType),suggestOnTriggerCharacters:h(o.suggestOnTriggerCharacters),acceptSuggestionOnEnter:h(o.acceptSuggestionOnEnter),snippetSuggestions:o.snippetSuggestions,tabCompletion:o.tabCompletion,wordBasedSuggestions:o.wordBasedSuggestions,selectionHighlight:h(o.selectionHighlight),referenceInfos:h(o.referenceInfos),folding:h(o.folding)});return new u.InternalEditorOptions({lineHeight:n.lineHeight,readOnly:T,wordSeparators:String(o.wordSeparators),autoClosingBrackets:h(o.autoClosingBrackets),useTabStops:h(o.useTabStops),tabFocusMode:L,layoutInfo:I,fontInfo:n,viewInfo:W,wrappingInfo:O,contribInfo:k})},e._sanitizeScrollbarOpts=function(e,t){var i=function(e){switch(e){case"hidden":return p.ScrollbarVisibility.Hidden;case"visible":return p.ScrollbarVisibility.Visible;default:return p.ScrollbarVisibility.Auto}},o=w(e.horizontalScrollbarSize,10),n=w(e.verticalScrollbarSize,14);return new u.InternalEditorScrollbarOptions({vertical:i(e.vertical),horizontal:i(e.horizontal),arrowSize:w(e.arrowSize,11),useShadows:g(e.useShadows,!0),verticalHasArrows:g(e.verticalHasArrows,!1),horizontalHasArrows:g(e.horizontalHasArrows,!1),horizontalScrollbarSize:o,horizontalSliderSize:w(e.horizontalSliderSize,o),verticalScrollbarSize:n,verticalSliderSize:w(e.verticalSliderSize,n),handleMouseWheel:g(e.handleMouseWheel,!0),mouseWheelScrollSensitivity:t})},e}(),E=function(e){function i(i,n){var r=this;void 0===n&&(n=null),e.call(this),this._onDidChange=this._register(new o.Emitter),this.onDidChange=this._onDidChange.event,this._configWithDefaults=new _(i),this._elementSizeObserver=n,this._isDominatedByLongLines=!1,this._maxLineNumber=1,this.editor=this._computeInternalOptions(),this.editorClone=this.editor.clone(),this._register(t.EditorZoom.onDidChangeZoomLevel(function(e){return r._recomputeOptions()})),this._register(t.TabFocus.onDidChangeTabFocus(function(e){return r._recomputeOptions()}))}return __extends(i,e),i.prototype.dispose=function(){e.prototype.dispose.call(this)},i.prototype._recomputeOptions=function(){this._setOptions(this._computeInternalOptions())},i.prototype._setOptions=function(e){if(!this.editor||!this.editor.equals(e)){var t=this.editor.createChangeEvent(e);this.editor=e,this.editorClone=this.editor.clone(),this._onDidChange.fire(t)}},i.prototype.getRawOptions=function(){return this._configWithDefaults.getEditorOptions()},i.prototype._computeInternalOptions=function(){var e=this._configWithDefaults.getEditorOptions(),i=this._getEditorClassName(e.theme,h(e.fontLigatures)),o=String(e.fontFamily)||d.DefaultConfig.editor.fontFamily,n=m(e.fontSize,0,100)||d.DefaultConfig.editor.fontSize,r=m(e.lineHeight,0,150);0===r&&(r=Math.round(d.GOLDEN_LINE_HEIGHT_RATIO*n));var a=1+.1*t.EditorZoom.getZoomLevel();n*=a,r*=a;var s=h(e.disableTranslate3d),l=this._getCanUseTranslate3d();return s&&(l=!1),I.createInternalEditorOptions(this.getOuterWidth(),this.getOuterHeight(),e,this.readConfiguration(new u.BareFontInfo({fontFamily:o,fontSize:n,lineHeight:r})),i,this._isDominatedByLongLines,this._maxLineNumber,l)},i.prototype.updateOptions=function(e){this._configWithDefaults.updateOptions(e),this._recomputeOptions()},i.prototype.setIsDominatedByLongLines=function(e){this._isDominatedByLongLines=e,this._recomputeOptions()},i.prototype.setMaxLineNumber=function(e){this._maxLineNumber=e,this._recomputeOptions()},i}(n.Disposable);t.CommonEditorConfiguration=E;var O=function(){function e(){}return e.apply=function(t,i){if(t&&i&&"function"==typeof i.updateOptions){var o=i.getEditorType();if(o!==u.EditorType.ICodeEditor&&o!==u.EditorType.IDiffEditor)return;var n=t[e.EDITOR_SECTION];if(o===u.EditorType.IDiffEditor){var a=t[e.DIFF_EDITOR_SECTION];a&&(n=n?r.mixin(n,a):a)}n&&(delete n.readOnly,i.updateOptions(n))}},e.EDITOR_SECTION="editor",e.DIFF_EDITOR_SECTION="diffEditor",e}();t.EditorConfiguration=O;var T=l.Registry.as(s.Extensions.Configuration),L={id:"editor",order:5,type:"object",title:i.localize("editorConfigurationTitle","Editor"),properties:{"editor.fontFamily":{type:"string","default":d.DefaultConfig.editor.fontFamily,description:i.localize("fontFamily","Controls the font family.")},"editor.fontSize":{type:"number","default":d.DefaultConfig.editor.fontSize,description:i.localize("fontSize","Controls the font size.")},"editor.lineHeight":{type:"number","default":d.DefaultConfig.editor.lineHeight,description:i.localize("lineHeight","Controls the line height. Use 0 to compute the lineHeight from the fontSize.")},"editor.lineNumbers":{type:"boolean","default":d.DefaultConfig.editor.lineNumbers,description:i.localize("lineNumbers","Controls visibility of line numbers")},"editor.glyphMargin":{type:"boolean","default":d.DefaultConfig.editor.glyphMargin,description:i.localize("glyphMargin","Controls visibility of the glyph margin")},"editor.rulers":{type:"array",items:{type:"number"},"default":d.DefaultConfig.editor.rulers,description:i.localize("rulers","Columns at which to show vertical rulers")},"editor.wordSeparators":{type:"string","default":d.DefaultConfig.editor.wordSeparators,description:i.localize("wordSeparators","Characters that will be used as word separators when doing word related navigations or operations")},"editor.tabSize":{type:"number","default":d.DEFAULT_INDENTATION.tabSize,minimum:1,description:i.localize("tabSize","The number of spaces a tab is equal to."),errorMessage:i.localize("tabSize.errorMessage","Expected 'number'. Note that the value \"auto\" has been replaced by the `editor.detectIndentation` setting.")},"editor.insertSpaces":{type:"boolean","default":d.DEFAULT_INDENTATION.insertSpaces,description:i.localize("insertSpaces","Insert spaces when pressing Tab."),errorMessage:i.localize("insertSpaces.errorMessage","Expected 'boolean'. Note that the value \"auto\" has been replaced by the `editor.detectIndentation` setting.")},"editor.detectIndentation":{type:"boolean","default":d.DEFAULT_INDENTATION.detectIndentation,description:i.localize("detectIndentation","When opening a file, `editor.tabSize` and `editor.insertSpaces` will be detected based on the file contents.")},"editor.roundedSelection":{type:"boolean","default":d.DefaultConfig.editor.roundedSelection,description:i.localize("roundedSelection","Controls if selections have rounded corners")},"editor.scrollBeyondLastLine":{type:"boolean","default":d.DefaultConfig.editor.scrollBeyondLastLine,description:i.localize("scrollBeyondLastLine","Controls if the editor will scroll beyond the last line")},"editor.wrappingColumn":{type:"integer","default":d.DefaultConfig.editor.wrappingColumn,minimum:-1,description:i.localize("wrappingColumn","Controls after how many characters the editor will wrap to the next line. Setting this to 0 turns on viewport width wrapping (word wrapping). Setting this to -1 forces the editor to never wrap.")},"editor.wrappingIndent":{type:"string","enum":["none","same","indent"],"default":d.DefaultConfig.editor.wrappingIndent,description:i.localize("wrappingIndent","Controls the indentation of wrapped lines. Can be one of 'none', 'same' or 'indent'.")},"editor.mouseWheelScrollSensitivity":{type:"number","default":d.DefaultConfig.editor.mouseWheelScrollSensitivity,description:i.localize("mouseWheelScrollSensitivity","A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events")},"editor.quickSuggestions":{type:"boolean","default":d.DefaultConfig.editor.quickSuggestions,description:i.localize("quickSuggestions","Controls if quick suggestions should show up or not while typing")},"editor.quickSuggestionsDelay":{type:"integer","default":d.DefaultConfig.editor.quickSuggestionsDelay,minimum:0,description:i.localize("quickSuggestionsDelay","Controls the delay in ms after which quick suggestions will show up")},"editor.parameterHints":{type:"boolean","default":d.DefaultConfig.editor.parameterHints,description:i.localize("parameterHints","Enables parameter hints")},"editor.autoClosingBrackets":{type:"boolean","default":d.DefaultConfig.editor.autoClosingBrackets,description:i.localize("autoClosingBrackets","Controls if the editor should automatically close brackets after opening them")},"editor.formatOnType":{type:"boolean","default":d.DefaultConfig.editor.formatOnType,description:i.localize("formatOnType","Controls if the editor should automatically format the line after typing")},"editor.suggestOnTriggerCharacters":{type:"boolean","default":d.DefaultConfig.editor.suggestOnTriggerCharacters,description:i.localize("suggestOnTriggerCharacters","Controls if suggestions should automatically show up when typing trigger characters")},"editor.acceptSuggestionOnEnter":{type:"boolean","default":d.DefaultConfig.editor.acceptSuggestionOnEnter,description:i.localize("acceptSuggestionOnEnter","Controls if suggestions should be accepted 'Enter' - in addition to 'Tab'. Helps to avoid ambiguity between inserting new lines or accepting suggestions.")},"editor.snippetSuggestions":{type:"string","enum":["top","bottom","inline","none"],"default":d.DefaultConfig.editor.snippetSuggestions,description:i.localize("snippetSuggestions","Controls whether snippets are shown with other suggestions and how they are sorted.")},"editor.wordBasedSuggestions":{type:"boolean","default":d.DefaultConfig.editor.wordBasedSuggestions,description:i.localize("wordBasedSuggestions","Enable word based suggestions.")},"editor.tabCompletion":{type:"boolean","default":d.DefaultConfig.editor.tabCompletion,description:i.localize("tabCompletion","Insert snippets when their prefix matches. Works best when 'quickSuggestions' aren't enabled.")},"editor.selectionHighlight":{type:"boolean","default":d.DefaultConfig.editor.selectionHighlight,description:i.localize("selectionHighlight","Controls whether the editor should highlight similar matches to the selection")},"editor.overviewRulerLanes":{type:"integer","default":3,description:i.localize("overviewRulerLanes","Controls the number of decorations that can show up at the same position in the overview ruler")},"editor.cursorBlinking":{type:"string","enum":["blink","smooth","phase","expand","solid"],"default":d.DefaultConfig.editor.cursorBlinking,description:i.localize("cursorBlinking","Control the cursor animation style, possible values are 'blink', 'smooth', 'phase', 'expand' and 'solid'")},"editor.mouseWheelZoom":{type:"boolean","default":d.DefaultConfig.editor.mouseWheelZoom,description:i.localize("mouseWheelZoom","Zoom the font of the editor when using mouse wheel and holding Ctrl")},"editor.cursorStyle":{type:"string","enum":["block","line","underline"],"default":d.DefaultConfig.editor.cursorStyle,description:i.localize("cursorStyle","Controls the cursor style, accepted values are 'block', 'line' and 'underline'")},"editor.fontLigatures":{type:"boolean","default":d.DefaultConfig.editor.fontLigatures,description:i.localize("fontLigatures","Enables font ligatures")},"editor.hideCursorInOverviewRuler":{type:"boolean","default":d.DefaultConfig.editor.hideCursorInOverviewRuler,description:i.localize("hideCursorInOverviewRuler","Controls if the cursor should be hidden in the overview ruler.")},"editor.renderWhitespace":{type:"boolean","default":d.DefaultConfig.editor.renderWhitespace,description:i.localize("renderWhitespace","Controls whether the editor should render whitespace characters")},"editor.renderControlCharacters":{type:"boolean","default":d.DefaultConfig.editor.renderControlCharacters,description:i.localize("renderControlCharacters","Controls whether the editor should render control characters")},"editor.renderIndentGuides":{type:"boolean","default":d.DefaultConfig.editor.renderIndentGuides,description:i.localize("renderIndentGuides","Controls whether the editor should render indent guides")},"editor.referenceInfos":{type:"boolean","default":d.DefaultConfig.editor.referenceInfos,description:i.localize("referenceInfos","Controls if the editor shows reference information for the modes that support it")},"editor.folding":{type:"boolean","default":d.DefaultConfig.editor.folding,description:i.localize("folding","Controls whether the editor has code folding enabled")},"editor.useTabStops":{type:"boolean","default":d.DefaultConfig.editor.useTabStops,description:i.localize("useTabStops","Inserting and deleting whitespace follows tab stops")},"editor.trimAutoWhitespace":{type:"boolean","default":d.DEFAULT_TRIM_AUTO_WHITESPACE,description:i.localize("trimAutoWhitespace","Remove trailing auto inserted whitespace")},"editor.stablePeek":{type:"boolean","default":!1,description:i.localize("stablePeek","Keep peek editors open even when double clicking their content or when hitting Escape.")},"diffEditor.renderSideBySide":{type:"boolean","default":!0,description:i.localize("sideBySide","Controls if the diff editor shows the diff side by side or inline")},"diffEditor.ignoreTrimWhitespace":{type:"boolean","default":!0,description:i.localize("ignoreTrimWhitespace","Controls if the diff editor shows changes in leading or trailing whitespace as diffs")}}};a.isLinux&&(L.properties["editor.selectionClipboard"]={type:"boolean","default":d.DefaultConfig.editor.selectionClipboard,description:i.localize("selectionClipboard","Controls if the Linux primary clipboard should be supported.")}),T.registerConfiguration(L)});