var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'vs/base/browser/dom'], function (require, exports, dom) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var FastDomNode = (function () {
        function FastDomNode(domNode) {
            this._domNode = domNode;
            this._maxWidth = -1;
            this._width = -1;
            this._height = -1;
            this._top = -1;
            this._left = -1;
            this._bottom = -1;
            this._right = -1;
            this._fontSize = -1;
            this._lineHeight = -1;
            this._className = '';
            this._display = '';
            this._position = '';
            this._visibility = '';
            this._transform = '';
            this._lineNumber = '';
        }
        Object.defineProperty(FastDomNode.prototype, "domNode", {
            get: function () {
                return this._domNode;
            },
            enumerable: true,
            configurable: true
        });
        FastDomNode.prototype.setMaxWidth = function (maxWidth) {
            if (this._maxWidth === maxWidth) {
                return;
            }
            this._maxWidth = maxWidth;
            this._domNode.style.maxWidth = this._maxWidth + 'px';
        };
        FastDomNode.prototype.setWidth = function (width) {
            if (this._width === width) {
                return;
            }
            this._width = width;
            this._domNode.style.width = this._width + 'px';
        };
        FastDomNode.prototype.setHeight = function (height) {
            if (this._height === height) {
                return;
            }
            this._height = height;
            this._domNode.style.height = this._height + 'px';
        };
        FastDomNode.prototype.setTop = function (top) {
            if (this._top === top) {
                return;
            }
            this._top = top;
            this._domNode.style.top = this._top + 'px';
        };
        FastDomNode.prototype.setLeft = function (left) {
            if (this._left === left) {
                return;
            }
            this._left = left;
            this._domNode.style.left = this._left + 'px';
        };
        FastDomNode.prototype.setBottom = function (bottom) {
            if (this._bottom === bottom) {
                return;
            }
            this._bottom = bottom;
            this._domNode.style.bottom = this._bottom + 'px';
        };
        FastDomNode.prototype.setRight = function (right) {
            if (this._right === right) {
                return;
            }
            this._right = right;
            this._domNode.style.right = this._right + 'px';
        };
        FastDomNode.prototype.setFontSize = function (fontSize) {
            if (this._fontSize === fontSize) {
                return;
            }
            this._fontSize = fontSize;
            this._domNode.style.fontSize = this._fontSize + 'px';
        };
        FastDomNode.prototype.setLineHeight = function (lineHeight) {
            if (this._lineHeight === lineHeight) {
                return;
            }
            this._lineHeight = lineHeight;
            this._domNode.style.lineHeight = this._lineHeight + 'px';
        };
        FastDomNode.prototype.setClassName = function (className) {
            if (this._className === className) {
                return;
            }
            this._className = className;
            this._domNode.className = this._className;
        };
        FastDomNode.prototype.toggleClassName = function (className, shouldHaveIt) {
            dom.toggleClass(this._domNode, className, shouldHaveIt);
            this._className = this._domNode.className;
        };
        FastDomNode.prototype.setDisplay = function (display) {
            if (this._display === display) {
                return;
            }
            this._display = display;
            this._domNode.style.display = this._display;
        };
        FastDomNode.prototype.setPosition = function (position) {
            if (this._position === position) {
                return;
            }
            this._position = position;
            this._domNode.style.position = this._position;
        };
        FastDomNode.prototype.setVisibility = function (visibility) {
            if (this._visibility === visibility) {
                return;
            }
            this._visibility = visibility;
            this._domNode.style.visibility = this._visibility;
        };
        FastDomNode.prototype.setTransform = function (transform) {
            if (this._transform === transform) {
                return;
            }
            this._transform = transform;
            this._setTransform(this._domNode, this._transform);
        };
        FastDomNode.prototype.setLineNumber = function (lineNumber) {
            if (this._lineNumber === lineNumber) {
                return;
            }
            this._lineNumber = lineNumber;
            this._domNode.setAttribute('lineNumber', this._lineNumber);
        };
        return FastDomNode;
    }());
    exports.FastDomNode = FastDomNode;
    var WebKitFastDomNode = (function (_super) {
        __extends(WebKitFastDomNode, _super);
        function WebKitFastDomNode() {
            _super.apply(this, arguments);
        }
        WebKitFastDomNode.prototype._setTransform = function (domNode, transform) {
            domNode.style.webkitTransform = transform;
        };
        return WebKitFastDomNode;
    }(FastDomNode));
    var StandardFastDomNode = (function (_super) {
        __extends(StandardFastDomNode, _super);
        function StandardFastDomNode() {
            _super.apply(this, arguments);
        }
        StandardFastDomNode.prototype._setTransform = function (domNode, transform) {
            domNode.style.transform = transform;
        };
        return StandardFastDomNode;
    }(FastDomNode));
    var useWebKitFastDomNode = false;
    (function () {
        var testDomNode = document.createElement('div');
        if (typeof testDomNode.style.webkitTransform !== 'undefined') {
            useWebKitFastDomNode = true;
        }
    })();
    function createFastDomNode(domNode) {
        if (useWebKitFastDomNode) {
            return new WebKitFastDomNode(domNode);
        }
        else {
            return new StandardFastDomNode(domNode);
        }
    }
    exports.createFastDomNode = createFastDomNode;
    exports.StyleMutator = {
        setMaxWidth: function (domNode, maxWidth) {
            var desiredValue = maxWidth + 'px';
            if (domNode.style.maxWidth !== desiredValue) {
                domNode.style.maxWidth = desiredValue;
            }
        },
        setWidth: function (domNode, width) {
            var desiredValue = width + 'px';
            if (domNode.style.width !== desiredValue) {
                domNode.style.width = desiredValue;
            }
        },
        setHeight: function (domNode, height) {
            var desiredValue = height + 'px';
            if (domNode.style.height !== desiredValue) {
                domNode.style.height = desiredValue;
            }
        },
        setTop: function (domNode, top) {
            var desiredValue = top + 'px';
            if (domNode.style.top !== desiredValue) {
                domNode.style.top = desiredValue;
                return true;
            }
            return false;
        },
        setLeft: function (domNode, left) {
            var desiredValue = left + 'px';
            if (domNode.style.left !== desiredValue) {
                domNode.style.left = desiredValue;
                return true;
            }
            return false;
        },
        setBottom: function (domNode, bottom) {
            var desiredValue = bottom + 'px';
            if (domNode.style.bottom !== desiredValue) {
                domNode.style.bottom = desiredValue;
            }
        },
        setRight: function (domNode, right) {
            var desiredValue = right + 'px';
            if (domNode.style.right !== desiredValue) {
                domNode.style.right = desiredValue;
            }
        },
        setFontSize: function (domNode, fontSize) {
            var desiredValue = fontSize + 'px';
            if (domNode.style.fontSize !== desiredValue) {
                domNode.style.fontSize = desiredValue;
            }
        },
        setLineHeight: function (domNode, lineHeight) {
            var desiredValue = lineHeight + 'px';
            if (domNode.style.lineHeight !== desiredValue) {
                domNode.style.lineHeight = desiredValue;
            }
        },
        setTransform: null,
        setDisplay: function (domNode, desiredValue) {
            if (domNode.style.display !== desiredValue) {
                domNode.style.display = desiredValue;
            }
        },
        setVisibility: function (domNode, desiredValue) {
            if (domNode.style.visibility !== desiredValue) {
                domNode.style.visibility = desiredValue;
            }
        },
    };
    // Define setTransform
    function setWebkitTransform(domNode, desiredValue) {
        if (domNode.getAttribute('data-transform') !== desiredValue) {
            domNode.setAttribute('data-transform', desiredValue);
            domNode.style.webkitTransform = desiredValue;
            return true;
        }
        return false;
    }
    function setTransform(domNode, desiredValue) {
        if (domNode.getAttribute('data-transform') !== desiredValue) {
            domNode.setAttribute('data-transform', desiredValue);
            domNode.style.transform = desiredValue;
            return true;
        }
        return false;
    }
    (function () {
        var testDomNode = document.createElement('div');
        if (typeof testDomNode.style.webkitTransform !== 'undefined') {
            exports.StyleMutator.setTransform = setWebkitTransform;
        }
        else {
            exports.StyleMutator.setTransform = setTransform;
        }
    })();
});
//# sourceMappingURL=styleMutator.js.map