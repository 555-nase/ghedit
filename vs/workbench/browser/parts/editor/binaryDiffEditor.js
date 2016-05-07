/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/base/common/winjs.base', 'vs/nls', 'vs/base/browser/ui/sash/sash', 'vs/base/browser/builder', 'vs/base/browser/ui/resourceviewer/resourceViewer', 'vs/base/browser/ui/scrollbar/scrollableElementImpl', 'vs/workbench/browser/parts/editor/baseEditor', 'vs/workbench/common/editor/binaryEditorModel', 'vs/workbench/services/editor/common/editorService', 'vs/platform/telemetry/common/telemetry', 'vs/base/browser/ui/scrollbar/domNodeScrollable', 'vs/css!./media/binarydiffeditor'], function (require, exports, winjs_base_1, nls, sash_1, builder_1, resourceViewer_1, scrollableElementImpl_1, baseEditor_1, binaryEditorModel_1, editorService_1, telemetry_1, domNodeScrollable_1) {
    'use strict';
    /**
     * An implementation of editor for diffing binary files like images or videos.
     */
    var BinaryResourceDiffEditor = (function (_super) {
        __extends(BinaryResourceDiffEditor, _super);
        function BinaryResourceDiffEditor(telemetryService, editorService) {
            _super.call(this, BinaryResourceDiffEditor.ID, telemetryService);
            this.editorService = editorService;
        }
        BinaryResourceDiffEditor.prototype.getTitle = function () {
            return this.getInput() ? this.getInput().getName() : nls.localize('binaryDiffEditor', "Binary Diff Viewer");
        };
        BinaryResourceDiffEditor.prototype.createEditor = function (parent) {
            var _this = this;
            // Left Container for Binary
            var leftBinaryContainerElement = document.createElement('div');
            leftBinaryContainerElement.className = 'binary-container';
            this.leftBinaryContainer = builder_1.$(leftBinaryContainerElement);
            this.leftBinaryContainer.tabindex(0); // enable focus support from the editor part (do not remove)
            // Left Custom Scrollbars
            this.leftScrollable = new domNodeScrollable_1.DomNodeScrollable(leftBinaryContainerElement);
            this.leftScrollbar = new scrollableElementImpl_1.ScrollableElement(leftBinaryContainerElement, this.leftScrollable, { horizontal: 'hidden', vertical: 'hidden' });
            parent.getHTMLElement().appendChild(this.leftScrollbar.getDomNode());
            builder_1.$(this.leftScrollbar.getDomNode()).addClass('binarydiff-left');
            // Sash
            this.sash = new sash_1.Sash(parent.getHTMLElement(), this);
            this.sash.addListener('start', function () { return _this.onSashDragStart(); });
            this.sash.addListener('change', function (e) { return _this.onSashDrag(e); });
            this.sash.addListener('end', function () { return _this.onSashDragEnd(); });
            this.sash.addListener('reset', function () { return _this.onSashReset(); });
            // Right Container for Binary
            var rightBinaryContainerElement = document.createElement('div');
            rightBinaryContainerElement.className = 'binary-container';
            this.rightBinaryContainer = builder_1.$(rightBinaryContainerElement);
            this.rightBinaryContainer.tabindex(0); // enable focus support from the editor part (do not remove)
            // Right Custom Scrollbars
            this.rightScrollable = new domNodeScrollable_1.DomNodeScrollable(rightBinaryContainerElement);
            this.rightScrollbar = new scrollableElementImpl_1.ScrollableElement(rightBinaryContainerElement, this.rightScrollable, { horizontal: 'hidden', vertical: 'hidden' });
            parent.getHTMLElement().appendChild(this.rightScrollbar.getDomNode());
            builder_1.$(this.rightScrollbar.getDomNode()).addClass('binarydiff-right');
        };
        BinaryResourceDiffEditor.prototype.setInput = function (input, options) {
            var _this = this;
            var oldInput = this.getInput();
            _super.prototype.setInput.call(this, input, options);
            // Detect options
            var forceOpen = options && options.forceOpen;
            // Same Input
            if (!forceOpen && input.matches(oldInput)) {
                return winjs_base_1.TPromise.as(null);
            }
            // Different Input (Reload)
            return this.editorService.resolveEditorModel(input, true /* Reload */).then(function (resolvedModel) {
                // Assert model instance
                if (!(resolvedModel.originalModel instanceof binaryEditorModel_1.BinaryEditorModel) || !(resolvedModel.modifiedModel instanceof binaryEditorModel_1.BinaryEditorModel)) {
                    return winjs_base_1.TPromise.wrapError(nls.localize('cannotDiffTextToBinary', "Comparing binary files to non binary files is currently not supported"));
                }
                // Assert that the current input is still the one we expect. This prevents a race condition when loading a diff takes long and another input was set meanwhile
                if (!_this.getInput() || _this.getInput() !== input) {
                    return null;
                }
                // Render original
                var original = resolvedModel.originalModel;
                _this.renderInput(original.getName(), original.getResource(), true);
                // Render modified
                var modified = resolvedModel.modifiedModel;
                _this.renderInput(modified.getName(), modified.getResource(), false);
            });
        };
        BinaryResourceDiffEditor.prototype.renderInput = function (name, resource, isOriginal) {
            // Reset Sash to default 50/50 ratio if needed
            if (this.leftContainerWidth && this.dimension && this.leftContainerWidth !== this.dimension.width / 2) {
                this.leftContainerWidth = this.dimension.width / 2;
                this.layoutContainers();
                this.sash.layout();
            }
            // Pass to ResourceViewer
            var container = isOriginal ? this.leftBinaryContainer : this.rightBinaryContainer;
            var scrollable = isOriginal ? this.leftScrollable : this.rightScrollable;
            resourceViewer_1.ResourceViewer.show(name, resource, container, scrollable);
        };
        BinaryResourceDiffEditor.prototype.clearInput = function () {
            // Empty HTML Container
            builder_1.$(this.leftBinaryContainer).empty();
            builder_1.$(this.rightBinaryContainer).empty();
            _super.prototype.clearInput.call(this);
        };
        BinaryResourceDiffEditor.prototype.layout = function (dimension) {
            var oldDimension = this.dimension;
            this.dimension = dimension;
            // Calculate left hand container width based on sash move or fallback to 50% by default
            if (!this.leftContainerWidth || !oldDimension) {
                this.leftContainerWidth = this.dimension.width / 2;
            }
            else {
                var sashRatio = this.leftContainerWidth / oldDimension.width;
                this.leftContainerWidth = this.dimension.width * sashRatio;
            }
            // Sash positioning
            this.sash.layout();
            // Pass on to Binary Containers and Scrollbars
            this.layoutContainers();
        };
        BinaryResourceDiffEditor.prototype.layoutContainers = function () {
            // Size left container
            this.leftBinaryContainer.size(this.leftContainerWidth, this.dimension.height);
            this.leftScrollbar.onElementDimensions();
            this.leftScrollable.onContentsDimensions();
            // Size right container
            this.rightBinaryContainer.size(this.dimension.width - this.leftContainerWidth, this.dimension.height);
            this.rightScrollbar.onElementDimensions();
            this.rightScrollable.onContentsDimensions();
        };
        BinaryResourceDiffEditor.prototype.onSashDragStart = function () {
            this.startLeftContainerWidth = this.leftContainerWidth;
        };
        BinaryResourceDiffEditor.prototype.onSashDrag = function (e) {
            // Update Widths and keep in bounds of MIN_CONTAINER_WIDTH for both sides
            var newLeftContainerWidth = this.startLeftContainerWidth + e.currentX - e.startX;
            this.leftContainerWidth = Math.max(BinaryResourceDiffEditor.MIN_CONTAINER_WIDTH, newLeftContainerWidth);
            if (this.dimension.width - this.leftContainerWidth < BinaryResourceDiffEditor.MIN_CONTAINER_WIDTH) {
                this.leftContainerWidth = this.dimension.width - BinaryResourceDiffEditor.MIN_CONTAINER_WIDTH;
            }
            // Pass on to Binary Containers and Scrollbars
            this.layoutContainers();
        };
        BinaryResourceDiffEditor.prototype.onSashDragEnd = function () {
            this.sash.layout();
        };
        BinaryResourceDiffEditor.prototype.onSashReset = function () {
            this.leftContainerWidth = this.dimension.width / 2;
            this.layoutContainers();
            this.sash.layout();
        };
        BinaryResourceDiffEditor.prototype.getVerticalSashTop = function (sash) {
            return 0;
        };
        BinaryResourceDiffEditor.prototype.getVerticalSashLeft = function (sash) {
            return this.leftContainerWidth;
        };
        BinaryResourceDiffEditor.prototype.getVerticalSashHeight = function (sash) {
            return this.dimension.height;
        };
        BinaryResourceDiffEditor.prototype.focus = function () {
            this.rightBinaryContainer.domFocus();
        };
        BinaryResourceDiffEditor.prototype.dispose = function () {
            // Sash
            this.sash.dispose();
            // Dispose Scrollbar
            this.leftScrollbar.dispose();
            this.leftScrollable.dispose();
            this.rightScrollbar.dispose();
            this.rightScrollable.dispose();
            // Destroy Container
            this.leftBinaryContainer.destroy();
            this.rightBinaryContainer.destroy();
            _super.prototype.dispose.call(this);
        };
        BinaryResourceDiffEditor.ID = 'workbench.editors.binaryResourceDiffEditor';
        BinaryResourceDiffEditor.MIN_CONTAINER_WIDTH = 100;
        BinaryResourceDiffEditor = __decorate([
            __param(0, telemetry_1.ITelemetryService),
            __param(1, editorService_1.IWorkbenchEditorService)
        ], BinaryResourceDiffEditor);
        return BinaryResourceDiffEditor;
    }(baseEditor_1.BaseEditor));
    exports.BinaryResourceDiffEditor = BinaryResourceDiffEditor;
});
//# sourceMappingURL=binaryDiffEditor.js.map