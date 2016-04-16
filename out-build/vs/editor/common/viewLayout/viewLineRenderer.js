define(["require", "exports"], function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var RenderLineInput = (function () {
        function RenderLineInput(lineContent, tabSize, spaceWidth, stopRenderingLineAfter, renderWhitespace, parts) {
            this.lineContent = lineContent;
            this.tabSize = tabSize;
            this.spaceWidth = spaceWidth;
            this.stopRenderingLineAfter = stopRenderingLineAfter;
            this.renderWhitespace = renderWhitespace;
            this.parts = parts;
        }
        return RenderLineInput;
    }());
    exports.RenderLineInput = RenderLineInput;
    var RenderLineOutput = (function () {
        function RenderLineOutput(charOffsetInPart, lastRenderedPartIndex, output) {
            this.charOffsetInPart = charOffsetInPart;
            this.lastRenderedPartIndex = lastRenderedPartIndex;
            this.output = output;
        }
        return RenderLineOutput;
    }());
    exports.RenderLineOutput = RenderLineOutput;
    var _space = ' '.charCodeAt(0);
    var _tab = '\t'.charCodeAt(0);
    var _lowerThan = '<'.charCodeAt(0);
    var _greaterThan = '>'.charCodeAt(0);
    var _ampersand = '&'.charCodeAt(0);
    var _carriageReturn = '\r'.charCodeAt(0);
    var _lineSeparator = '\u2028'.charCodeAt(0); //http://www.fileformat.info/info/unicode/char/2028/index.htm
    var _bom = 65279;
    function renderLine(input) {
        var lineText = input.lineContent;
        var lineTextLength = lineText.length;
        var tabSize = input.tabSize;
        var spaceWidth = input.spaceWidth;
        var actualLineParts = input.parts;
        var renderWhitespace = input.renderWhitespace;
        var charBreakIndex = (input.stopRenderingLineAfter === -1 ? lineTextLength : input.stopRenderingLineAfter - 1);
        if (lineTextLength === 0) {
            return new RenderLineOutput([], 0, 
            // This is basically for IE's hit test to work
            '<span><span>&nbsp;</span></span>');
        }
        if (actualLineParts.length === 0) {
            throw new Error('Cannot render non empty line without line parts!');
        }
        return renderLineActual(lineText, lineTextLength, tabSize, spaceWidth, actualLineParts.slice(0), renderWhitespace, charBreakIndex);
    }
    exports.renderLine = renderLine;
    function isWhitespace(type) {
        return (type.indexOf('whitespace') >= 0);
    }
    function isIndentGuide(type) {
        return (type.indexOf('indent-guide') >= 0);
    }
    function renderLineActual(lineText, lineTextLength, tabSize, spaceWidth, actualLineParts, renderWhitespace, charBreakIndex) {
        lineTextLength = +lineTextLength;
        tabSize = +tabSize;
        charBreakIndex = +charBreakIndex;
        var charIndex = 0;
        var out = '';
        var charOffsetInPartArr = [];
        var charOffsetInPart = 0;
        var tabsCharDelta = 0;
        out += '<span>';
        for (var partIndex = 0, partIndexLen = actualLineParts.length; partIndex < partIndexLen; partIndex++) {
            var part = actualLineParts[partIndex];
            var parsRendersWhitespace = (renderWhitespace && isWhitespace(part.type));
            var partIsFixedWidth = parsRendersWhitespace || isIndentGuide(part.type);
            var toCharIndex = lineTextLength;
            if (partIndex + 1 < partIndexLen) {
                var nextPart = actualLineParts[partIndex + 1];
                toCharIndex = Math.min(lineTextLength, nextPart.startIndex);
            }
            charOffsetInPart = 0;
            if (partIsFixedWidth) {
                var partContentCnt = 0;
                var partContent = '';
                for (; charIndex < toCharIndex; charIndex++) {
                    charOffsetInPartArr[charIndex] = charOffsetInPart;
                    var charCode = lineText.charCodeAt(charIndex);
                    if (charCode === _tab) {
                        var insertSpacesCount = tabSize - (charIndex + tabsCharDelta) % tabSize;
                        tabsCharDelta += insertSpacesCount - 1;
                        charOffsetInPart += insertSpacesCount - 1;
                        if (insertSpacesCount > 0) {
                            partContent += parsRendersWhitespace ? '&rarr;' : '&nbsp;';
                            partContentCnt++;
                            insertSpacesCount--;
                        }
                        while (insertSpacesCount > 0) {
                            partContent += '&nbsp;';
                            partContentCnt++;
                            insertSpacesCount--;
                        }
                    }
                    else {
                        // must be _space
                        partContent += parsRendersWhitespace ? '&middot;' : '&nbsp;';
                        partContentCnt++;
                    }
                    charOffsetInPart++;
                    if (charIndex >= charBreakIndex) {
                        out += '<span class="token ' + part.type + '" style="width:' + (spaceWidth * partContentCnt) + 'px">';
                        out += partContent;
                        out += '&hellip;</span></span>';
                        charOffsetInPartArr[charIndex] = charOffsetInPart;
                        return new RenderLineOutput(charOffsetInPartArr, partIndex, out);
                    }
                }
                out += '<span class="token ' + part.type + '" style="width:' + (spaceWidth * partContentCnt) + 'px">';
                out += partContent;
                out += '</span>';
            }
            else {
                out += '<span class="token ';
                out += part.type;
                out += '">';
                for (; charIndex < toCharIndex; charIndex++) {
                    charOffsetInPartArr[charIndex] = charOffsetInPart;
                    var charCode = lineText.charCodeAt(charIndex);
                    switch (charCode) {
                        case _tab:
                            var insertSpacesCount = tabSize - (charIndex + tabsCharDelta) % tabSize;
                            tabsCharDelta += insertSpacesCount - 1;
                            charOffsetInPart += insertSpacesCount - 1;
                            while (insertSpacesCount > 0) {
                                out += '&nbsp;';
                                insertSpacesCount--;
                            }
                            break;
                        case _space:
                            out += '&nbsp;';
                            break;
                        case _lowerThan:
                            out += '&lt;';
                            break;
                        case _greaterThan:
                            out += '&gt;';
                            break;
                        case _ampersand:
                            out += '&amp;';
                            break;
                        case 0:
                            out += '&#00;';
                            break;
                        case _bom:
                        case _lineSeparator:
                            out += '\ufffd';
                            break;
                        case _carriageReturn:
                            // zero width space, because carriage return would introduce a line break
                            out += '&#8203';
                            break;
                        default:
                            out += lineText.charAt(charIndex);
                    }
                    charOffsetInPart++;
                    if (charIndex >= charBreakIndex) {
                        out += '&hellip;</span></span>';
                        charOffsetInPartArr[charIndex] = charOffsetInPart;
                        return new RenderLineOutput(charOffsetInPartArr, partIndex, out);
                    }
                }
                out += '</span>';
            }
        }
        out += '</span>';
        // When getting client rects for the last character, we will position the
        // text range at the end of the span, insteaf of at the beginning of next span
        charOffsetInPartArr.push(charOffsetInPart);
        return new RenderLineOutput(charOffsetInPartArr, actualLineParts.length - 1, out);
    }
});
