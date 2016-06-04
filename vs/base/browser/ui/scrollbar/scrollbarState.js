define(["require", "exports"], function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    /**
     * The minimal size of the slider (such that it can still be clickable) -- it is artificially enlarged.
     */
    var MINIMUM_SLIDER_SIZE = 20;
    var ScrollbarState = (function () {
        function ScrollbarState(arrowSize, scrollbarSize, oppositeScrollbarSize) {
            this._scrollbarSize = Math.round(scrollbarSize);
            this._oppositeScrollbarSize = Math.round(oppositeScrollbarSize);
            this._arrowSize = Math.round(arrowSize);
            this._visibleSize = 0;
            this._scrollSize = 0;
            this._scrollPosition = 0;
            this._computedAvailableSize = 0;
            this._computedRepresentableSize = 0;
            this._computedRatio = 0.1;
            this._computedIsNeeded = false;
            this._computedSliderSize = 0;
            this._computedSliderPosition = 0;
            this._refreshComputedValues();
        }
        ScrollbarState.prototype.setVisibleSize = function (visibleSize) {
            var iVisibleSize = Math.round(visibleSize);
            if (this._visibleSize !== iVisibleSize) {
                this._visibleSize = iVisibleSize;
                this._refreshComputedValues();
                return true;
            }
            return false;
        };
        ScrollbarState.prototype.setScrollSize = function (scrollSize) {
            var iScrollSize = Math.round(scrollSize);
            if (this._scrollSize !== iScrollSize) {
                this._scrollSize = iScrollSize;
                this._refreshComputedValues();
                return true;
            }
            return false;
        };
        ScrollbarState.prototype.setScrollPosition = function (scrollPosition) {
            var iScrollPosition = Math.round(scrollPosition);
            if (this._scrollPosition !== iScrollPosition) {
                this._scrollPosition = iScrollPosition;
                this._refreshComputedValues();
                return true;
            }
            return false;
        };
        ScrollbarState.prototype._refreshComputedValues = function () {
            var oppositeScrollbarSize = this._oppositeScrollbarSize;
            var arrowSize = this._arrowSize;
            var visibleSize = this._visibleSize;
            var scrollSize = this._scrollSize;
            var scrollPosition = this._scrollPosition;
            var computedAvailableSize = Math.max(0, visibleSize - oppositeScrollbarSize);
            var computedRepresentableSize = Math.max(0, computedAvailableSize - 2 * arrowSize);
            var computedRatio = scrollSize > 0 ? (computedRepresentableSize / scrollSize) : 0;
            var computedIsNeeded = (scrollSize > visibleSize);
            var computedSliderSize;
            var computedSliderPosition;
            if (!computedIsNeeded) {
                computedSliderSize = computedRepresentableSize;
                computedSliderPosition = 0;
            }
            else {
                computedSliderSize = Math.floor(visibleSize * computedRatio);
                computedSliderPosition = Math.floor(scrollPosition * computedRatio);
                if (computedSliderSize < MINIMUM_SLIDER_SIZE) {
                    // We must artificially increase the size of the slider, since the slider would be too small otherwise
                    // The effort is to keep the slider centered around the original position, but we must take into
                    // account the cases when the slider is too close to the top or too close to the bottom
                    var sliderArtificialOffset = (MINIMUM_SLIDER_SIZE - computedSliderSize) / 2;
                    computedSliderSize = MINIMUM_SLIDER_SIZE;
                    computedSliderPosition -= sliderArtificialOffset;
                    if (computedSliderPosition + computedSliderSize > computedRepresentableSize) {
                        // Slider is too close to the bottom, so we glue it to the bottom
                        computedSliderPosition = computedRepresentableSize - computedSliderSize;
                    }
                    if (computedSliderPosition < 0) {
                        // Slider is too close to the top, so we glue it to the top
                        computedSliderPosition = 0;
                    }
                }
            }
            this._computedAvailableSize = Math.round(computedAvailableSize);
            this._computedRepresentableSize = Math.round(computedRepresentableSize);
            this._computedRatio = computedRatio;
            this._computedIsNeeded = computedIsNeeded;
            this._computedSliderSize = Math.round(computedSliderSize);
            this._computedSliderPosition = Math.round(computedSliderPosition);
        };
        ScrollbarState.prototype.getArrowSize = function () {
            return this._arrowSize;
        };
        ScrollbarState.prototype.getRectangleLargeSize = function () {
            return this._computedAvailableSize;
        };
        ScrollbarState.prototype.getRectangleSmallSize = function () {
            return this._scrollbarSize;
        };
        ScrollbarState.prototype.isNeeded = function () {
            return this._computedIsNeeded;
        };
        ScrollbarState.prototype.getSliderSize = function () {
            return this._computedSliderSize;
        };
        ScrollbarState.prototype.getSliderPosition = function () {
            return this._computedSliderPosition;
        };
        ScrollbarState.prototype.convertSliderPositionToScrollPosition = function (desiredSliderPosition) {
            return desiredSliderPosition / this._computedRatio;
        };
        ScrollbarState.prototype.validateScrollPosition = function (desiredScrollPosition) {
            desiredScrollPosition = Math.round(desiredScrollPosition);
            desiredScrollPosition = Math.max(desiredScrollPosition, 0);
            desiredScrollPosition = Math.min(desiredScrollPosition, this._scrollSize - this._visibleSize);
            return desiredScrollPosition;
        };
        return ScrollbarState;
    }());
    exports.ScrollbarState = ScrollbarState;
});
//# sourceMappingURL=scrollbarState.js.map