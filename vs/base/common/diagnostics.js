define(["require","exports","vs/base/common/platform"],function(n,r,o){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function t(n,r){for(;n.length>r;)n.shift()}function a(n,r){var a=!0;if(a)return function(){};var i=e[n]||!1;e[n]=i;var c=s[n]||[];c.push(r),s[n]=c;var u=function(){for(var a=[],i=0;i<arguments.length;i++)a[i-0]=arguments[i];var s;if(e[n]===!0){var c=[arguments];s=f.indexOf(r),s!==-1&&(c.unshift.apply(c,f[s+1]||[]),f[s+1]=[]);var u=function(){var n=c.shift();r.apply(r,n),c.length>0&&o.setTimeout(u,500)};u()}else{s=f.indexOf(r),s=s!==-1?s:f.length;var v=s+1,l=f[v]||[];l.push(arguments),t(l,50),f[s]=r,f[v]=l}};return u}var i=o.globals;i.Monaco||(i.Monaco={}),i.Monaco.Diagnostics={};var e=i.Monaco.Diagnostics,s={},f=[];r.register=a});