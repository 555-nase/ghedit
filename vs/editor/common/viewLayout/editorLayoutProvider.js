define(["require","exports","vs/editor/common/editorCommon"],function(t,i,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var e=function(){function t(){}return t.compute=function(t){var i=0|t.outerWidth,e=0|t.outerHeight,o=Boolean(t.showGlyphMargin),n=0|t.lineHeight,a=Boolean(t.showLineNumbers),h=0|t.lineNumbersMinChars,l=0|t.lineDecorationsWidth,u=Number(t.maxDigitWidth),c=0|t.maxLineNumber,d=0|t.verticalScrollbarWidth,g=Boolean(t.verticalScrollbarHasArrows),s=0|t.scrollbarArrowSize,m=0|t.horizontalScrollbarHeight,v=0;if(a){var f=Math.max(this.digitCount(c),h);v=Math.round(f*u)}var b=0;o&&(b=n);var w=i-b-v-l,H=0,W=H+b,L=W+v,M=L+l,p=g?s:0;return new r.EditorLayoutInfo({width:i,height:e,glyphMarginLeft:H,glyphMarginWidth:b,glyphMarginHeight:e,lineNumbersLeft:W,lineNumbersWidth:v,lineNumbersHeight:e,decorationsLeft:L,decorationsWidth:l,decorationsHeight:e,contentLeft:M,contentWidth:w,contentHeight:e,verticalScrollbarWidth:d,horizontalScrollbarHeight:m,overviewRuler:new r.OverviewRulerPosition({top:p,width:d,height:e-2*p,right:0})})},t.digitCount=function(t){for(var i=0;t;)t=Math.floor(t/10),i++;return i?i:1},t}();i.EditorLayoutProvider=e});