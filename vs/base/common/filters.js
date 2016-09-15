define(["require","exports","vs/base/common/strings","vs/base/common/map"],function(n,t,r,e){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function u(){for(var n=[],t=0;t<arguments.length;t++)n[t-0]=arguments[t];return function(t,r){for(var e=0,u=n.length;e<u;e++){var l=n[e](t,r);if(l)return l}return null}}function l(){for(var n=[],t=0;t<arguments.length;t++)n[t-0]=arguments[t];return function(t,r){for(var e=[],u=0,l=n.length;u<l;u++){var o=n[u](t,r);if(!o)return null;e=e.concat(o)}return e}}function o(n,t,r){if(!r||0===r.length||r.length<t.length)return null;n&&(t=t.toLowerCase(),r=r.toLowerCase());for(var e=0;e<t.length;e++)if(t[e]!==r[e])return null;return t.length>0?[{start:0,end:t.length}]:[]}function i(n,t){var r=t.toLowerCase().indexOf(n.toLowerCase());return r===-1?null:[{start:r,end:r+n.length}]}function f(n,t){return a(n.toLowerCase(),t.toLowerCase(),0,0)}function a(n,t,r,e){if(r===n.length)return[];if(e===t.length)return null;if(n[r]===t[e]){var u=null;if(u=a(n,t,r+1,e+1))return C({start:e,end:e+1},u)}return a(n,t,r,e+1)}function g(n){return 97<=n&&n<=122}function h(n){return 65<=n&&n<=90}function c(n){return 48<=n&&n<=57}function s(n){return[32,9,10,13].indexOf(n)>-1}function v(n){return g(n)||h(n)||c(n)}function C(n,t){return 0===t.length?t=[n]:n.end===t[0].start?t[0].start=n.start:t.unshift(n),t}function d(n,t){for(var r=t;r<n.length;r++){var e=n.charCodeAt(r);if(h(e)||c(e)||r>0&&!v(n.charCodeAt(r-1)))return r}return n.length}function m(n,t,r,e){if(r===n.length)return[];if(e===t.length)return null;if(n[r]!==t[e].toLowerCase())return null;var u=null,l=e+1;for(u=m(n,t,r+1,e+1);!u&&(l=d(t,l))<t.length;)u=m(n,t,r+1,l),l++;return null===u?null:C({start:e,end:e+1},u)}function w(n){if(n.length>60)return!1;for(var t=0,r=0,e=0,u=0,l=0,o=0;o<n.length;o++)l=n.charCodeAt(o),h(l)&&t++,g(l)&&r++,v(l)&&e++,c(l)&&u++;var i=t/n.length,f=r/n.length,a=e/n.length,s=u/n.length;return f>.2&&i<.8&&a>.6&&s<.2}function x(n){for(var t=0,r=0,e=0,u=0,l=0;l<n.length;l++)e=n.charCodeAt(l),h(e)&&t++,g(e)&&r++,s(e)&&u++;return 0!==t&&0!==r||0!==u?t<=5:n.length<=30}function L(n,t){if(!t||0===t.length)return null;if(!x(n))return null;if(!w(t))return null;for(var r=null,e=0;e<t.length&&null===(r=m(n.toLowerCase(),t,0,e));)e=d(t,e+1);return r}function S(n,t){if(!t||0===t.length)return null;for(var r=null,e=0;e<t.length&&null===(r=p(n.toLowerCase(),t,0,e));)e=b(t,e+1);return r}function p(n,t,r,e){if(r===n.length)return[];if(e===t.length)return null;if(n[r]!==t[e].toLowerCase())return null;var u=null,l=e+1;for(u=p(n,t,r+1,e+1);!u&&(l=b(t,l))<t.length;)u=p(n,t,r+1,l),l++;return null===u?null:C({start:e,end:e+1},u)}function b(n,t){for(var r=t;r<n.length;r++){var e=n.charCodeAt(r);if(s(e)||r>0&&s(n.charCodeAt(r-1)))return r}return n.length}function z(n,e,u){if(void 0===u&&(u=!1),"string"!=typeof n||"string"!=typeof e)return null;var l=y.get(n);l||(l=new RegExp(r.convertSimple2RegExpPattern(n),"i"),y.set(n,l));var o=l.exec(e);return o?[{start:o.index,end:o.index+o[0].length}]:u?A(n,e):t.fuzzyContiguousFilter(n,e)}t.or=u,t.and=l,t.matchesStrictPrefix=function(n,t){return o(!1,n,t)},t.matchesPrefix=function(n,t){return o(!0,n,t)},t.matchesContiguousSubString=i,t.matchesSubString=f,t.matchesCamelCase=L,t.matchesWords=S,function(n){n[n.Contiguous=0]="Contiguous",n[n.Separate=1]="Separate"}(t.SubstringMatching||(t.SubstringMatching={}));t.SubstringMatching;t.fuzzyContiguousFilter=u(t.matchesPrefix,L,i);var A=u(t.matchesPrefix,L,f),y=new e.LinkedMap(1e4);t.matchesFuzzy=z});