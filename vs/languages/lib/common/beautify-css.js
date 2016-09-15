/*

  The MIT License (MIT)

  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
        http://jsbeautifier.org/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                   — indentation size,
        indent_char (space)               — character to indent with,
        selector_separator_newline (true) - separate selectors with newline or
                                            not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)          - end with a newline
        newline_between_rules (true)      - add a new line after every css rule

    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true
    });
*/
!function(){function e(n,r){function i(){return L=n.charAt(++m),L||""}function t(e){var r="",t=m;return e&&a(),r=n.charAt(m+1)||"",m=t-1,i(),r}function s(e){for(var r=m;i();)if("\\"===L)i();else{if(e.indexOf(L)!==-1)break;if("\n"===L)break}return n.substring(r,m+1)}function u(e){var n=m,r=s(e);return m=n-1,i(),r}function a(){for(var e="";b.test(t());)i(),e+=L;return e}function p(){var e="";for(L&&b.test(L)&&(e=L);b.test(i());)e+=L;return e}function c(e){var r=m;for(e="/"===t(),i();i();){if(!e&&"*"===L&&"/"===t()){i();break}if(e&&"\n"===L)return n.substring(r,m)}return n.substring(r,m)+L}function f(e){return n.substring(m-e.length,m).toLowerCase()===e}function o(){for(var e=0,r=m+1;r<n.length;r++){var i=n.charAt(r);if("{"===i)return!0;if("("===i)e+=1;else if(")"===i){if(0==e)return!1;e-=1}else if(";"===i||"}"===i)return!1}return!1}function l(){O++,A+=E}function h(){O--,A=A.slice(0,-g)}r=r||{},n=n||"",n=n.replace(/\r\n|[\r\u2028\u2029]/g,"\n");var g=r.indent_size||4,_=r.indent_char||" ",w=void 0===r.selector_separator_newline||r.selector_separator_newline,d=void 0!==r.end_with_newline&&r.end_with_newline,v=void 0===r.newline_between_rules||r.newline_between_rules,S=r.eol?r.eol:"\n";"string"==typeof g&&(g=parseInt(g,10)),r.indent_with_tabs&&(_="\t",g=1),S=S.replace(/\\r/,"\r").replace(/\\n/,"\n");var L,b=/^\s+$/,m=-1,y=0,A=n.match(/^[\t ]*/)[0],E=new Array(g+1).join(_),O=0,C=0,N={};N["{"]=function(e){N.singleSpace(),R.push(e),N.newLine()},N["}"]=function(e){N.newLine(),R.push(e),N.newLine()},N._lastCharWhitespace=function(){return b.test(R[R.length-1])},N.newLine=function(e){R.length&&(e||"\n"===R[R.length-1]||N.trim(),R.push("\n"),A&&R.push(A))},N.singleSpace=function(){R.length&&!N._lastCharWhitespace()&&R.push(" ")},N.preserveSingleSpace=function(){D&&N.singleSpace()},N.trim=function(){for(;N._lastCharWhitespace();)R.pop()};for(var R=[],T=!1,U=!1,k=!1,I="",$="";;){var x=p(),D=""!==x,W=x.indexOf("\n")!==-1;if($=I,I=L,!L)break;if("/"===L&&"*"===t()){var j=0===O;(W||j)&&N.newLine(),R.push(c()),N.newLine(),j&&N.newLine(!0)}else if("/"===L&&"/"===t())W||"{"===$||N.trim(),N.singleSpace(),R.push(c()),N.newLine();else if("@"===L){N.preserveSingleSpace(),R.push(L);var G=u(": ,;{}()[]/='\"");G.match(/[ :]$/)&&(i(),G=s(": ").replace(/\s$/,""),R.push(G),N.singleSpace()),G=G.replace(/\s$/,""),G in e.NESTED_AT_RULE&&(C+=1,G in e.CONDITIONAL_GROUP_RULE&&(k=!0))}else"#"===L&&"{"===t()?(N.preserveSingleSpace(),R.push(s("}"))):"{"===L?"}"===t(!0)?(a(),i(),N.singleSpace(),R.push("{}"),N.newLine(),v&&0===O&&N.newLine(!0)):(l(),N["{"](L),k?(k=!1,T=O>C):T=O>=C):"}"===L?(h(),N["}"](L),T=!1,U=!1,C&&C--,v&&0===O&&N.newLine(!0)):":"===L?(a(),!T&&!k||f("&")||o()?":"===t()?(i(),R.push("::")):R.push(":"):(U=!0,R.push(":"),N.singleSpace())):'"'===L||"'"===L?(N.preserveSingleSpace(),R.push(s(L))):";"===L?(U=!1,R.push(L),N.newLine()):"("===L?f("url")?(R.push(L),a(),i()&&(")"!==L&&'"'!==L&&"'"!==L?R.push(s(")")):m--)):(y++,N.preserveSingleSpace(),R.push(L),a()):")"===L?(R.push(L),y--):","===L?(R.push(L),a(),w&&!U&&y<1?N.newLine():N.singleSpace()):"]"===L?R.push(L):"["===L?(N.preserveSingleSpace(),R.push(L)):"="===L?(a(),L="=",R.push(L)):(N.preserveSingleSpace(),R.push(L))}var P="";return A&&(P+=A),P+=R.join("").replace(/[\r\n\t ]+$/,""),d&&(P+="\n"),"\n"!=S&&(P=P.replace(/[\n]/g,S)),P}e.NESTED_AT_RULE={"@page":!0,"@font-face":!0,"@keyframes":!0,"@media":!0,"@supports":!0,"@document":!0},e.CONDITIONAL_GROUP_RULE={"@media":!0,"@supports":!0,"@document":!0},"function"==typeof define&&define.amd?define([],function(){return{css_beautify:e}}):"undefined"!=typeof exports?exports.css_beautify=e:"undefined"!=typeof window?window.css_beautify=e:"undefined"!=typeof global&&(global.css_beautify=e)}();