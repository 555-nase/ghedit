/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function getArgs(){for(var e=[],s=0;process.env["PTYSHELLARG"+s];)e.push(process.env["PTYSHELLARG"+s]),s++;return e}function cleanEnv(){var e=["ATOM_SHELL_INTERNAL_RUN_AS_NODE","PTYCWD","PTYPID","PTYSHELL"];e.forEach(function(e){process.env[e]&&delete process.env[e]});for(var s=0;process.env["PTYSHELLARG"+s];)delete process.env["PTYSHELLARG"+s]}function setupPlanB(e){setInterval(function(){try{process.kill(e,0)}catch(s){process.exit()}},5e3)}function setupTitlePolling(){sendProcessTitle(),setInterval(function(){currentTitle!==ptyProcess.process&&sendProcessTitle()},200)}function sendProcessTitle(){process.send({type:"title",content:ptyProcess.process}),currentTitle=ptyProcess.process}var fs=require("fs"),os=require("os"),path=require("path"),ptyJs=require("pty.js"),name;name="win32"===os.platform()?path.basename(process.env.PTYSHELL):"xterm-256color";var shell=process.env.PTYSHELL,args=getArgs(),cwd=process.env.PTYCWD,currentTitle="";setupPlanB(process.env.PTYPID),cleanEnv();var ptyProcess=ptyJs.fork(shell,args,{name:name,cwd:cwd});ptyProcess.on("data",function(e){process.send({type:"data",content:e})}),ptyProcess.on("exit",function(e){process.exit(e)}),process.on("message",function(e){"input"===e.event?ptyProcess.write(e.data):"resize"===e.event&&ptyProcess.resize(e.cols,e.rows)}),setupTitlePolling();