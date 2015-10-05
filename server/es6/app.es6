var dgram = require('dgram');
var readline = require('readline');
var _ = require('./util');
var ServerManager = require('./server_manager');
var net = require('net');

var server = net.createServer();

var server_manager = new ServerManager();
server_manager.init(server);

server.listen(8080, '0.0.0.0');

var rl = readline.createInterface(process.stdin, process.stdout);

rl.on('SIGINT', function () {
    server.close();
    rl.close();
});
