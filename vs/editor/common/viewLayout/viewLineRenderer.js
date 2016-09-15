define(["require","exports"],function(e,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function t(e){var r=e.lineContent,t=r.length,n=e.tabSize,a=e.spaceWidth,s=e.parts,o=e.renderWhitespace,c=e.renderControlCharacters,h=e.stopRenderingLineAfter===-1?t:e.stopRenderingLineAfter-1;if(0===t)return new p([],0,"<span><span>&nbsp;</span></span>");if(0===s.length)throw new Error("Cannot render non empty line without line parts!");return i(r,t,n,a,s.slice(0),o,c,h)}function n(e){return e.indexOf("whitespace")>=0}function a(e){return e<32}function s(e){return String.fromCharCode(C+e)}function i(e,r,t,i,o,C,A,k){r=+r,t=+t,k=+k;var w=0,g="",y=[],x=0,L=0;g+="<span>";for(var R=0,m=o.length;R<m;R++){var I=o[R],W=C&&n(I.type),O=r;if(R+1<m){var S=o[R+1];O=Math.min(r,S.startIndex)}if(x=0,W){for(var z=0,P="";w<O;w++){y[w]=x;var q=e.charCodeAt(w);if(q===h){var E=t-(w+L)%t;for(L+=E-1,x+=E-1,E>0&&(P+="&rarr;",z++,E--);E>0;)P+="&nbsp;",z++,E--}else P+="&middot;",z++;if(x++,w>=k)return g+='<span class="token '+I.type+'" style="width:'+i*z+'px">',g+=P,g+="&hellip;</span></span>",y[w]=x,new p(y,R,g)}g+='<span class="token '+I.type+'" style="width:'+i*z+'px">',g+=P,g+="</span>"}else{for(g+='<span class="token ',g+=I.type,g+='">';w<O;w++){y[w]=x;var q=e.charCodeAt(w);switch(q){case h:var E=t-(w+L)%t;for(L+=E-1,x+=E-1;E>0;)g+="&nbsp;",E--;break;case c:g+="&nbsp;";break;case d:g+="&lt;";break;case f:g+="&gt;";break;case u:g+="&amp;";break;case 0:g+="&#00;";break;case v:case b:g+="�";break;case l:g+="&#8203";break;default:var M=e.charCodeAt(w);g+=A&&a(M)?s(M):e.charAt(w)}if(x++,w>=k)return g+="&hellip;</span></span>",y[w]=x,new p(y,R,g)}g+="</span>"}}return g+="</span>",y.push(x),new p(y,o.length-1,g)}var o=function(){function e(e,r,t,n,a,s,i){this.lineContent=e,this.tabSize=r,this.spaceWidth=t,this.stopRenderingLineAfter=n,this.renderWhitespace=a,this.renderControlCharacters=s,this.parts=i}return e}();r.RenderLineInput=o;var p=function(){function e(e,r,t){this.charOffsetInPart=e,this.lastRenderedPartIndex=r,this.output=t}return e}();r.RenderLineOutput=p;var c=" ".charCodeAt(0),h="\t".charCodeAt(0),d="<".charCodeAt(0),f=">".charCodeAt(0),u="&".charCodeAt(0),l="\r".charCodeAt(0),C=9216,b="\u2028".charCodeAt(0),v=65279;r.renderLine=t});