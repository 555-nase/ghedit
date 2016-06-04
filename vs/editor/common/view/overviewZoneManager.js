define(["require", "exports", 'vs/editor/common/editorCommon'], function (require, exports, editorCommon_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var OverviewZoneManager = (function () {
        function OverviewZoneManager(getVerticalOffsetForLine) {
            this._getVerticalOffsetForLine = getVerticalOffsetForLine;
            this._zones = [];
            this._colorZonesInvalid = false;
            this._lineHeight = 0;
            this._domWidth = 0;
            this._domHeight = 0;
            this._outerHeight = 0;
            this._maximumHeight = 0;
            this._minimumHeight = 0;
            this._useDarkColor = false;
            this._pixelRatio = 1;
            this._lastAssignedId = 0;
            this._color2Id = Object.create(null);
            this._id2Color = [];
        }
        OverviewZoneManager.prototype.getId2Color = function () {
            return this._id2Color;
        };
        OverviewZoneManager.prototype.setZones = function (newZones) {
            newZones.sort(function (a, b) { return a.compareTo(b); });
            var oldZones = this._zones;
            var oldIndex = 0;
            var oldLength = this._zones.length;
            var newIndex = 0;
            var newLength = newZones.length;
            var result = [];
            while (newIndex < newLength) {
                var newZone = newZones[newIndex];
                if (oldIndex >= oldLength) {
                    result.push(newZone);
                    newIndex++;
                }
                else {
                    var oldZone = oldZones[oldIndex];
                    var cmp = oldZone.compareTo(newZone);
                    if (cmp < 0) {
                        oldIndex++;
                    }
                    else if (cmp > 0) {
                        result.push(newZone);
                        newIndex++;
                    }
                    else {
                        // cmp === 0
                        result.push(oldZone);
                        oldIndex++;
                        newIndex++;
                    }
                }
            }
            this._zones = result;
        };
        OverviewZoneManager.prototype.setLineHeight = function (lineHeight) {
            if (this._lineHeight === lineHeight) {
                return false;
            }
            this._lineHeight = lineHeight;
            this._colorZonesInvalid = true;
            return true;
        };
        OverviewZoneManager.prototype.setPixelRatio = function (pixelRatio) {
            this._pixelRatio = pixelRatio;
            this._colorZonesInvalid = true;
        };
        OverviewZoneManager.prototype.getDOMWidth = function () {
            return this._domWidth;
        };
        OverviewZoneManager.prototype.getCanvasWidth = function () {
            return this._domWidth * this._pixelRatio;
        };
        OverviewZoneManager.prototype.setDOMWidth = function (width) {
            if (this._domWidth === width) {
                return false;
            }
            this._domWidth = width;
            this._colorZonesInvalid = true;
            return true;
        };
        OverviewZoneManager.prototype.getDOMHeight = function () {
            return this._domHeight;
        };
        OverviewZoneManager.prototype.getCanvasHeight = function () {
            return this._domHeight * this._pixelRatio;
        };
        OverviewZoneManager.prototype.setDOMHeight = function (height) {
            if (this._domHeight === height) {
                return false;
            }
            this._domHeight = height;
            this._colorZonesInvalid = true;
            return true;
        };
        OverviewZoneManager.prototype.getOuterHeight = function () {
            return this._outerHeight;
        };
        OverviewZoneManager.prototype.setOuterHeight = function (outerHeight) {
            if (this._outerHeight === outerHeight) {
                return false;
            }
            this._outerHeight = outerHeight;
            this._colorZonesInvalid = true;
            return true;
        };
        OverviewZoneManager.prototype.setMaximumHeight = function (maximumHeight) {
            if (this._maximumHeight === maximumHeight) {
                return false;
            }
            this._maximumHeight = maximumHeight;
            this._colorZonesInvalid = true;
            return true;
        };
        OverviewZoneManager.prototype.setMinimumHeight = function (minimumHeight) {
            if (this._minimumHeight === minimumHeight) {
                return false;
            }
            this._minimumHeight = minimumHeight;
            this._colorZonesInvalid = true;
            return true;
        };
        OverviewZoneManager.prototype.setUseDarkColor = function (useDarkColor) {
            if (this._useDarkColor === useDarkColor) {
                return false;
            }
            this._useDarkColor = useDarkColor;
            this._colorZonesInvalid = true;
            return true;
        };
        OverviewZoneManager.prototype.resolveColorZones = function () {
            var colorZonesInvalid = this._colorZonesInvalid;
            var lineHeight = Math.floor(this._lineHeight); // @perf
            var totalHeight = Math.floor(this.getCanvasHeight()); // @perf
            var maximumHeight = Math.floor(this._maximumHeight * this._pixelRatio); // @perf
            var minimumHeight = Math.floor(this._minimumHeight * this._pixelRatio); // @perf
            var useDarkColor = this._useDarkColor; // @perf
            var outerHeight = Math.floor(this._outerHeight); // @perf
            var heightRatio = totalHeight / outerHeight;
            var allColorZones = [];
            for (var i = 0, len = this._zones.length; i < len; i++) {
                var zone = this._zones[i];
                if (!colorZonesInvalid) {
                    var colorZones_1 = zone.getColorZones();
                    if (colorZones_1) {
                        for (var j = 0, lenJ = colorZones_1.length; j < lenJ; j++) {
                            allColorZones.push(colorZones_1[j]);
                        }
                        continue;
                    }
                }
                var colorZones = [];
                if (zone.forceHeight) {
                    var forcedHeight = Math.floor(zone.forceHeight * this._pixelRatio);
                    var y1 = Math.floor(this._getVerticalOffsetForLine(zone.startLineNumber));
                    y1 = Math.floor(y1 * heightRatio);
                    var y2 = y1 + forcedHeight;
                    colorZones.push(this.createZone(totalHeight, y1, y2, forcedHeight, forcedHeight, zone.getColor(useDarkColor), zone.position));
                }
                else {
                    var y1 = Math.floor(this._getVerticalOffsetForLine(zone.startLineNumber));
                    var y2 = Math.floor(this._getVerticalOffsetForLine(zone.endLineNumber)) + lineHeight;
                    y1 = Math.floor(y1 * heightRatio);
                    y2 = Math.floor(y2 * heightRatio);
                    // Figure out if we can render this in one continuous zone
                    var zoneLineNumbers = zone.endLineNumber - zone.startLineNumber + 1;
                    var zoneMaximumHeight = zoneLineNumbers * maximumHeight;
                    if (y2 - y1 > zoneMaximumHeight) {
                        // We need to draw one zone per line
                        for (var lineNumber = zone.startLineNumber; lineNumber <= zone.endLineNumber; lineNumber++) {
                            y1 = Math.floor(this._getVerticalOffsetForLine(lineNumber));
                            y2 = y1 + lineHeight;
                            y1 = Math.floor(y1 * heightRatio);
                            y2 = Math.floor(y2 * heightRatio);
                            colorZones.push(this.createZone(totalHeight, y1, y2, minimumHeight, maximumHeight, zone.getColor(useDarkColor), zone.position));
                        }
                    }
                    else {
                        colorZones.push(this.createZone(totalHeight, y1, y2, minimumHeight, zoneMaximumHeight, zone.getColor(useDarkColor), zone.position));
                    }
                }
                zone.setColorZones(colorZones);
                for (var j = 0, lenJ = colorZones.length; j < lenJ; j++) {
                    allColorZones.push(colorZones[j]);
                }
            }
            this._colorZonesInvalid = false;
            var sortFunc = function (a, b) {
                if (a.colorId === b.colorId) {
                    if (a.from === b.from) {
                        return a.to - b.to;
                    }
                    return a.from - b.from;
                }
                return a.colorId - b.colorId;
            };
            allColorZones.sort(sortFunc);
            return allColorZones;
        };
        OverviewZoneManager.prototype.createZone = function (totalHeight, y1, y2, minimumHeight, maximumHeight, color, position) {
            totalHeight = Math.floor(totalHeight); // @perf
            y1 = Math.floor(y1); // @perf
            y2 = Math.floor(y2); // @perf
            minimumHeight = Math.floor(minimumHeight); // @perf
            maximumHeight = Math.floor(maximumHeight); // @perf
            var ycenter = Math.floor((y1 + y2) / 2);
            var halfHeight = (y2 - ycenter);
            if (halfHeight > maximumHeight / 2) {
                halfHeight = maximumHeight / 2;
            }
            if (halfHeight < minimumHeight / 2) {
                halfHeight = minimumHeight / 2;
            }
            if (ycenter - halfHeight < 0) {
                ycenter = halfHeight;
            }
            if (ycenter + halfHeight > totalHeight) {
                ycenter = totalHeight - halfHeight;
            }
            var colorId = this._color2Id[color];
            if (!colorId) {
                colorId = (++this._lastAssignedId);
                this._color2Id[color] = colorId;
                this._id2Color[colorId] = color;
            }
            return new editorCommon_1.ColorZone(ycenter - halfHeight, ycenter + halfHeight, colorId, position);
        };
        return OverviewZoneManager;
    }());
    exports.OverviewZoneManager = OverviewZoneManager;
});
//# sourceMappingURL=overviewZoneManager.js.map