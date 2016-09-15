define(["require","exports","vs/base/common/platform"],function(t,e,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function a(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}function h(t){return encodeURIComponent(t).replace(/[!'()*]/g,a)}function n(t){return t}var i=function(){function t(){this._scheme=t._empty,this._authority=t._empty,this._path=t._empty,this._query=t._empty,this._fragment=t._empty,this._formatted=null,this._fsPath=null}return Object.defineProperty(t.prototype,"scheme",{get:function(){return this._scheme},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"authority",{get:function(){return this._authority},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"path",{get:function(){return this._path},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"query",{get:function(){return this._query},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fragment",{get:function(){return this._fragment},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fsPath",{get:function(){if(!this._fsPath){var e;e=this._authority&&"file"===this.scheme?"//"+this._authority+this._path:t._driveLetterPath.test(this._path)?this._path[1].toLowerCase()+this._path.substr(2):this._path,r.isWindows&&(e=e.replace(/\//g,"\\")),this._fsPath=e}return this._fsPath},enumerable:!0,configurable:!0}),t.prototype["with"]=function(e){if(!e)return this;var r=e.scheme,a=e.authority,h=e.path,n=e.query,i=e.fragment;if(void 0===r?r=this.scheme:null===r&&(r=""),void 0===a?a=this.authority:null===a&&(a=""),void 0===h?h=this.path:null===h&&(h=""),void 0===n?n=this.query:null===n&&(n=""),void 0===i?i=this.fragment:null===i&&(i=""),r===this.scheme&&a===this.authority&&h===this.path&&n===this.query&&i===this.fragment)return this;var s=new t;return s._scheme=r,s._authority=a,s._path=h,s._query=n,s._fragment=i,t._validate(s),s},t.parse=function(e){var r=new t,a=t._parseComponents(e);return r._scheme=a.scheme,r._authority=decodeURIComponent(a.authority),r._path=decodeURIComponent(a.path),r._query=decodeURIComponent(a.query),r._fragment=decodeURIComponent(a.fragment),t._validate(r),r},t.file=function(e){var r=new t;if(r._scheme="file",e=e.replace(/\\/g,t._slash),e[0]===t._slash&&e[0]===e[1]){var a=e.indexOf(t._slash,2);a===-1?r._authority=e.substring(2):(r._authority=e.substring(2,a),r._path=e.substring(a))}else r._path=e;return r._path[0]!==t._slash&&(r._path=t._slash+r._path),t._validate(r),r},t._parseComponents=function(e){var r={scheme:t._empty,authority:t._empty,path:t._empty,query:t._empty,fragment:t._empty},a=t._regexp.exec(e);return a&&(r.scheme=a[2]||r.scheme,r.authority=a[4]||r.authority,r.path=a[5]||r.path,r.query=a[7]||r.query,r.fragment=a[9]||r.fragment),r},t.from=function(e){return(new t)["with"](e)},t._validate=function(e){if(e.scheme&&!t._schemePattern.test(e.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(e.path)if(e.authority){if(!t._singleSlashStart.test(e.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(t._doubleSlashStart.test(e.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')},t.prototype.toString=function(e){return void 0===e&&(e=!1),e?t._asFormatted(this,!0):(this._formatted||(this._formatted=t._asFormatted(this,!1)),this._formatted)},t._asFormatted=function(e,r){var i=r?n:h,s=[],o=e.scheme,u=e.authority,p=e.path,_=e.query,f=e.fragment;if(o&&s.push(o,":"),(u||"file"===o)&&s.push("//"),u){u=u.toLowerCase();var c=u.indexOf(":");c===-1?s.push(i(u)):s.push(i(u.substr(0,c)),u.substr(c))}if(p){var m=t._upperCaseDrive.exec(p);m&&(p=m[1]?"/"+m[2].toLowerCase()+p.substr(3):m[2].toLowerCase()+p.substr(2));for(var y=0;;){var c=p.indexOf(t._slash,y);if(c===-1){s.push(i(p.substring(y)).replace(/[#?]/,a));break}s.push(i(p.substring(y,c)).replace(/[#?]/,a),t._slash),y=c+1}}return _&&s.push("?",i(_)),f&&s.push("#",i(f)),s.join(t._empty)},t.prototype.toJSON=function(){return{scheme:this.scheme,authority:this.authority,path:this.path,fsPath:this.fsPath,query:this.query,fragment:this.fragment,external:this.toString(),$mid:1}},t.revive=function(e){var r=new t;return r._scheme=e.scheme,r._authority=e.authority,r._path=e.path,r._query=e.query,r._fragment=e.fragment,r._fsPath=e.fsPath,r._formatted=e.external,t._validate(r),r},t._empty="",t._slash="/",t._regexp=/^(([^:\/?#]+?):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,t._driveLetterPath=/^\/[a-zA-z]:/,t._upperCaseDrive=/^(\/)?([A-Z]:)/,t._schemePattern=/^\w[\w\d+.-]*$/,t._singleSlashStart=/^\//,t._doubleSlashStart=/^\/\//,t}();Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=i});