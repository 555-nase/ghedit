/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports"], function (require, exports) {
    'use strict';
    function htmlContentElementCodeEqual(a, b) {
        if (!a && !b) {
            return true;
        }
        if (!a || !b) {
            return false;
        }
        return (a.language === b.language
            && a.value === b.value);
    }
    function htmlContentElementEqual(a, b) {
        return (a.formattedText === b.formattedText
            && a.text === b.text
            && a.className === b.className
            && a.style === b.style
            && a.customStyle === b.customStyle
            && a.tagName === b.tagName
            && a.isText === b.isText
            && a.role === b.role
            && a.markdown === b.markdown
            && htmlContentElementCodeEqual(a.code, b.code)
            && htmlContentElementArrEquals(a.children, b.children));
    }
    function htmlContentElementArrEquals(a, b) {
        if (!a && !b) {
            return true;
        }
        if (!a || !b) {
            return false;
        }
        var aLen = a.length, bLen = b.length;
        if (aLen !== bLen) {
            return false;
        }
        for (var i = 0; i < aLen; i++) {
            if (!htmlContentElementEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    exports.htmlContentElementArrEquals = htmlContentElementArrEquals;
});
