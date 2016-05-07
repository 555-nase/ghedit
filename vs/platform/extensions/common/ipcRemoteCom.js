define(["require", "exports", 'vs/base/common/winjs.base', 'vs/base/common/marshalling', 'vs/base/common/errors'], function (require, exports, winjs, marshalling, errors) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var pendingRPCReplies = {};
    var MessageFactory = (function () {
        function MessageFactory() {
        }
        MessageFactory.cancel = function (req) {
            return "{\"cancel\":\"" + req + "\"}";
        };
        MessageFactory.request = function (req, rpcId, method, args) {
            return "{\"req\":\"" + req + "\",\"rpcId\":\"" + rpcId + "\",\"method\":\"" + method + "\",\"args\":" + marshalling.stringify(args) + "}";
        };
        MessageFactory.replyOK = function (req, res) {
            if (typeof res === 'undefined') {
                return "{\"seq\":\"" + req + "\"}";
            }
            return "{\"seq\":\"" + req + "\",\"res\":" + marshalling.stringify(res) + "}";
        };
        MessageFactory.replyErr = function (req, err) {
            if (typeof err === 'undefined') {
                return "{\"seq\":\"" + req + "\",\"err\":null}";
            }
            return "{\"seq\":\"" + req + "\",\"err\":" + marshalling.stringify(errors.transformErrorForSerialization(err)) + "}";
        };
        return MessageFactory;
    }());
    var LazyPromise = (function () {
        function LazyPromise(onCancel) {
            this._onCancel = onCancel;
            this._actual = null;
            this._actualOk = null;
            this._actualErr = null;
            this._hasValue = false;
            this._value = null;
            this._hasErr = false;
            this._err = null;
            this._isCanceled = false;
        }
        LazyPromise.prototype._ensureActual = function () {
            var _this = this;
            if (!this._actual) {
                this._actual = new winjs.TPromise(function (c, e) {
                    _this._actualOk = c;
                    _this._actualErr = e;
                }, this._onCancel);
                if (this._hasValue) {
                    this._actualOk(this._value);
                }
                if (this._hasErr) {
                    this._actualErr(this._err);
                }
            }
            return this._actual;
        };
        LazyPromise.prototype.resolveOk = function (value) {
            if (this._isCanceled || this._hasErr) {
                return;
            }
            this._hasValue = true;
            this._value = value;
            if (this._actual) {
                this._actualOk(value);
            }
        };
        LazyPromise.prototype.resolveErr = function (err) {
            if (this._isCanceled || this._hasValue) {
                return;
            }
            this._hasErr = true;
            this._err = err;
            if (this._actual) {
                this._actualErr(err);
            }
        };
        LazyPromise.prototype.then = function (success, error) {
            if (this._isCanceled) {
                return;
            }
            return this._ensureActual().then(success, error);
        };
        LazyPromise.prototype.done = function (success, error) {
            if (this._isCanceled) {
                return;
            }
            this._ensureActual().done(success, error);
        };
        LazyPromise.prototype.cancel = function () {
            if (this._hasValue || this._hasErr) {
                return;
            }
            this._isCanceled = true;
            if (this._actual) {
                this._actual.cancel();
            }
            else {
                this._onCancel();
            }
        };
        return LazyPromise;
    }());
    function createRPC(serializeAndSend) {
        var lastMessageId = 0;
        return function rpc(rpcId, method, args) {
            var req = String(++lastMessageId);
            var result = new LazyPromise(function () {
                serializeAndSend(MessageFactory.cancel(req));
            });
            pendingRPCReplies[req] = result;
            serializeAndSend(MessageFactory.request(req, rpcId, method, args));
            return result;
        };
    }
    function create(send) {
        var rpc = createRPC(sendDelayed);
        var bigHandler = null;
        var invokedHandlers = Object.create(null);
        var messagesToSend = [];
        var messagesToReceive = [];
        var receiveOneMessage = function () {
            var rawmsg = messagesToReceive.shift();
            if (messagesToReceive.length > 0) {
                process.nextTick(receiveOneMessage);
            }
            var msg = marshalling.parse(rawmsg);
            if (msg.seq) {
                if (!pendingRPCReplies.hasOwnProperty(msg.seq)) {
                    console.warn('Got reply to unknown seq');
                    return;
                }
                var reply = pendingRPCReplies[msg.seq];
                delete pendingRPCReplies[msg.seq];
                if (msg.err) {
                    var err = msg.err;
                    if (msg.err.$isError) {
                        err = new Error();
                        err.name = msg.err.name;
                        err.message = msg.err.message;
                        err.stack = msg.err.stack;
                    }
                    reply.resolveErr(err);
                    return;
                }
                reply.resolveOk(msg.res);
                return;
            }
            if (msg.cancel) {
                if (invokedHandlers[msg.cancel]) {
                    invokedHandlers[msg.cancel].cancel();
                }
                return;
            }
            if (msg.err) {
                console.error(msg.err);
                return;
            }
            var rpcId = msg.rpcId;
            if (!bigHandler) {
                throw new Error('got message before big handler attached!');
            }
            var req = msg.req;
            invokedHandlers[req] = invokeHandler(rpcId, msg.method, msg.args);
            invokedHandlers[req].then(function (r) {
                delete invokedHandlers[req];
                sendDelayed(MessageFactory.replyOK(req, r));
            }, function (err) {
                delete invokedHandlers[req];
                sendDelayed(MessageFactory.replyErr(req, err));
            });
        };
        var r = {
            callOnRemote: rpc,
            setManyHandler: function (_bigHandler) {
                bigHandler = _bigHandler;
            },
            handle: function (rawmsg) {
                // console.log('RECEIVED ' + rawmsg.length + ' MESSAGES.');
                if (messagesToReceive.length === 0) {
                    process.nextTick(receiveOneMessage);
                }
                messagesToReceive = messagesToReceive.concat(rawmsg);
            }
        };
        function sendAccumulated() {
            var tmp = messagesToSend;
            messagesToSend = [];
            // console.log('SENDING ' + tmp.length + ' MESSAGES.');
            send(tmp);
        }
        function sendDelayed(value) {
            if (messagesToSend.length === 0) {
                process.nextTick(sendAccumulated);
            }
            messagesToSend.push(value);
        }
        function invokeHandler(rpcId, method, args) {
            try {
                return winjs.TPromise.as(bigHandler.handle(rpcId, method, args));
            }
            catch (err) {
                return winjs.TPromise.wrapError(err);
            }
        }
        return r;
    }
    exports.create = create;
});
//# sourceMappingURL=ipcRemoteCom.js.map