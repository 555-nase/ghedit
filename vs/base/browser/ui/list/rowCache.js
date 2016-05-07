/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", 'vs/base/browser/dom'], function (require, exports, dom_1) {
    "use strict";
    function getLastScrollTime(element) {
        var value = element.getAttribute('last-scroll-time');
        return value ? parseInt(value, 10) : 0;
    }
    function removeFromParent(element) {
        try {
            element.parentElement.removeChild(element);
        }
        catch (e) {
        }
    }
    var RowCache = (function () {
        function RowCache(renderers) {
            this.renderers = renderers;
            this.cache = Object.create(null);
            this.scrollingRow = null;
        }
        /**
         * Returns a row either by creating a new one or reusing
         * a previously released row which shares the same templateId.
         */
        RowCache.prototype.alloc = function (templateId) {
            var result = this.getTemplateCache(templateId).pop();
            if (!result) {
                var domNode = dom_1.emmet('.monaco-list-row');
                var renderer = this.renderers[templateId];
                var templateData = renderer.renderTemplate(domNode);
                result = { domNode: domNode, templateId: templateId, templateData: templateData };
            }
            return result;
        };
        /**
         * Releases the row for eventual reuse. The row's domNode
         * will eventually be removed from its parent, given that
         * it is not the currently scrolling row (for OS X ballistic
         * scrolling).
         */
        RowCache.prototype.release = function (row) {
            var lastScrollTime = getLastScrollTime(row.domNode);
            if (!lastScrollTime) {
                removeFromParent(row.domNode);
                this.getTemplateCache(row.templateId).push(row);
                return;
            }
            if (this.scrollingRow) {
                var lastKnownScrollTime = getLastScrollTime(this.scrollingRow.domNode);
                if (lastKnownScrollTime > lastScrollTime) {
                    removeFromParent(row.domNode);
                    this.getTemplateCache(row.templateId).push(row);
                    return;
                }
                if (this.scrollingRow.domNode.parentElement) {
                    removeFromParent(this.scrollingRow.domNode);
                    dom_1.removeClass(this.scrollingRow.domNode, 'scrolling');
                    this.getTemplateCache(this.scrollingRow.templateId).push(this.scrollingRow);
                }
            }
            this.scrollingRow = row;
            dom_1.addClass(this.scrollingRow.domNode, 'scrolling');
        };
        RowCache.prototype.getTemplateCache = function (templateId) {
            return this.cache[templateId] || (this.cache[templateId] = []);
        };
        RowCache.prototype.garbageCollect = function () {
            var _this = this;
            if (this.cache) {
                Object.keys(this.cache).forEach(function (templateId) {
                    _this.cache[templateId].forEach(function (cachedRow) {
                        var renderer = _this.renderers[templateId];
                        renderer.disposeTemplate(cachedRow.templateData);
                        cachedRow.domNode = null;
                        cachedRow.templateData = null;
                    });
                    delete _this.cache[templateId];
                });
            }
            if (this.scrollingRow) {
                var renderer = this.renderers[this.scrollingRow.templateId];
                renderer.disposeTemplate(this.scrollingRow.templateData);
                this.scrollingRow = null;
            }
        };
        RowCache.prototype.dispose = function () {
            this.garbageCollect();
            this.cache = null;
            this.renderers = null;
        };
        return RowCache;
    }());
    exports.RowCache = RowCache;
});
//# sourceMappingURL=rowCache.js.map