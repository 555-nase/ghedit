define(["require","exports"],function(r,e){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function n(r,e){switch(void 0===e&&(e=0),typeof r){case"object":return null===r?t(349,e):Array.isArray(r)?o(r,e):i(r,e);case"string":return c(r,e);case"boolean":return u(r,e);case"number":return t(r,e);case"undefined":return t(r,937);default:return t(r,617)}}function t(r,e){return(e<<5)-e+r|0}function u(r,e){return t(r?433:863,e)}function c(r,e){e=t(149417,e);for(var n=0,u=r.length;n<u;n++)e=t(r.charCodeAt(n),e);return e}function o(r,e){return e=t(104579,e),r.reduce(function(r,e){return n(e,r)},e)}function i(r,e){return e=t(181387,e),Object.keys(r).sort().reduce(function(e,t){return e=c(t,e),n(r[t],e)},e)}e.hash=n});