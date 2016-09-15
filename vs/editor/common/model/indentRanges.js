/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports"],function(e,n){"use strict";function t(e,n){void 0===n&&(n=1);var t=[],r=[];r.push({indent:-1,line:e.getLineCount()+1});for(var u=e.getLineCount();u>0;u--){var d=e.getIndentLevel(u);if(d!==-1){var o=r[r.length-1];if(o.indent>d){do r.pop(),o=r[r.length-1];while(o.indent>d);var s=o.line-1;s-u>=n&&t.push(new i(u,s,d))}o.indent===d?o.line=u:r.push({indent:d,line:u})}}return t.reverse()}var i=function(){function e(e,n,t){this.startLineNumber=e,this.endLineNumber=n,this.indent=t}return e.deepCloneArr=function(n){for(var t=[],i=0,r=n.length;i<r;i++){var u=n[i];t[i]=new e(u.startLineNumber,u.endLineNumber,u.indent)}return t},e}();n.IndentRange=i,n.computeRanges=t});