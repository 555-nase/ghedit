define(["require","exports"],function(r,a){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function e(r,a,e,t){var o;for(o=0;o<a&&o<t;o++){var f=r.charCodeAt(o),i=e.charCodeAt(o);if(f!==i)break}for(var v=0,c=0,h=o;h<a;h++){var f=r.charCodeAt(h);f===n?v++:c++}for(var u=0,s=0,h=o;h<t;h++){var i=e.charCodeAt(h);i===n?u++:s++}if(v>0&&c>0)return 0;if(u>0&&s>0)return 0;var d=Math.abs(c-s),A=Math.abs(v-u);return 0===d?A:A%d===0?A/d:0}function t(r,a,t){for(var f=0,i=0,v="",c=0,h=[2,4,6,8],u=8,s=[0,0,0,0,0,0,0,0,0],d=0,A=r.length;d<A;d++){for(var C=r[d],b=!1,g=0,l=0,k=0,p=0,M=C.length;p<M;p++){var S=C.charCodeAt(p);if(S===o)k++;else{if(S!==n){b=!0,g=p;break}l++}}if(b){k>0?f++:l>1&&i++;var q=e(v,c,C,g);q<=u&&s[q]++,v=C,c=g}}var x=e(v,c,"",0);x<=u&&s[x]++;var z=t;f!==i&&(z=f<i);var E=a,I=z?0:.1*r.length;return h.forEach(function(r){var a=s[r];a>I&&(I=a,E=r)}),{insertSpaces:z,tabSize:E}}var n=" ".charCodeAt(0),o="\t".charCodeAt(0);a.guessIndentation=t});