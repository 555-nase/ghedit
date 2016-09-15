/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","fs","crypto","vs/base/common/winjs.base","vs/base/common/async"],function(e,r,n,o,s,t){"use strict";function c(e,r){var c=new s.TPromise(function(r,s){var c=n.createReadStream(e),a=o.createHash("sha1"),i=a;c.pipe(i);var u=t.once(function(e,n){c.removeAllListeners(),i.removeAllListeners(),e?s(e):r(n)});c.once("error",u),c.once("end",u),i.once("error",u),i.once("data",function(e){return u(null,e.toString("hex"))})});return c.then(function(e){return e!==r?s.TPromise.wrapError(new Error("Hash mismatch")):s.TPromise.as(null)})}r.checksum=c});