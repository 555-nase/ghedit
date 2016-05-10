/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", 'vs/base/parts/ipc/node/ipc.net', 'vs/workbench/parts/git/common/gitIpc', 'fs'], function (require, exports, ipc_net_1, gitIpc_1, fs) {
    'use strict';
    function fatal(err) {
        console.error(err);
        process.exit(1);
    }
    function main(argv) {
        if (argv.length !== 5) {
            return fatal('Wrong number of arguments');
        }
        if (!process.env['VSCODE_IPC_HOOK']) {
            return fatal('Missing ipc hook');
        }
        if (!process.env['VSCODE_GIT_REQUEST_ID']) {
            return fatal('Missing git id');
        }
        if (!process.env['VSCODE_GIT_ASKPASS_PIPE']) {
            return fatal('Missing pipe');
        }
        var id = process.env['VSCODE_GIT_REQUEST_ID'];
        var output = process.env['VSCODE_GIT_ASKPASS_PIPE'];
        var request = argv[2];
        var host = argv[4].substring(1, argv[4].length - 2);
        ipc_net_1.connect(process.env['VSCODE_IPC_HOOK'])
            .then(function (client) {
            var channel = client.getChannel('askpass');
            var service = new gitIpc_1.AskpassChannelClient(channel);
            return service.askpass(id, host, process.env['MONACO_GIT_COMMAND']).then(function (result) {
                if (result) {
                    fs.writeFileSync(output, (/^Username$/i.test(request) ? result.username : result.password) + '\n');
                }
                return client;
            });
        })
            .done(function (c) {
            c.dispose();
            setTimeout(function () { return process.exit(0); }, 0);
        });
    }
    main(process.argv);
});
//# sourceMappingURL=askpass.js.map