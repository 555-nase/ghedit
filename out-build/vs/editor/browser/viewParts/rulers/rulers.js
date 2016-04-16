/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/browser/styleMutator', 'vs/editor/browser/view/viewPart', 'vs/css!./rulers'], function (require, exports, styleMutator_1, viewPart_1) {
    'use strict';
    var Rulers = (function (_super) {
        __extends(Rulers, _super);
        function Rulers(context, layoutProvider) {
            _super.call(this, context);
            this._layoutProvider = layoutProvider;
            this.domNode = document.createElement('div');
            this.domNode.className = 'view-rulers';
            this._rulers = this._context.configuration.editor.rulers;
            this._height = this._context.configuration.editor.layoutInfo.contentHeight;
            this._typicalHalfwidthCharacterWidth = this._context.configuration.editor.typicalHalfwidthCharacterWidth;
        }
        Rulers.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        // --- begin event handlers
        Rulers.prototype.onConfigurationChanged = function (e) {
            if (e.rulers || e.layoutInfo || e.typicalHalfwidthCharacterWidth) {
                this._rulers = this._context.configuration.editor.rulers;
                this._height = this._context.configuration.editor.layoutInfo.contentHeight;
                this._typicalHalfwidthCharacterWidth = this._context.configuration.editor.typicalHalfwidthCharacterWidth;
                return true;
            }
            return false;
        };
        Rulers.prototype.onScrollHeightChanged = function (scrollHeight) {
            return true;
        };
        // --- end event handlers
        Rulers.prototype.prepareRender = function (ctx) {
            // Nothing to read
            if (!this.shouldRender()) {
                throw new Error('I did not ask to render!');
            }
        };
        Rulers.prototype.render = function (ctx) {
            var existingRulersLength = this.domNode.children.length;
            var max = Math.max(existingRulersLength, this._rulers.length);
            for (var i = 0; i < max; i++) {
                if (i >= this._rulers.length) {
                    this.domNode.removeChild(this.domNode.lastChild);
                    continue;
                }
                var node = void 0;
                if (i < existingRulersLength) {
                    node = this.domNode.children[i];
                }
                else {
                    node = document.createElement('div');
                    node.className = 'view-ruler';
                    this.domNode.appendChild(node);
                }
                styleMutator_1.StyleMutator.setHeight(node, Math.min(this._layoutProvider.getTotalHeight(), 1000000));
                styleMutator_1.StyleMutator.setLeft(node, this._rulers[i] * this._typicalHalfwidthCharacterWidth);
            }
        };
        return Rulers;
    }(viewPart_1.ViewPart));
    exports.Rulers = Rulers;
});
