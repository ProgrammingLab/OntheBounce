var dgram = require('dgram');
var readline = require('readline');
var _ = require('./util');
var ServerManager = require('./server_manager');

var server = dgram.createSocket('udp4');

var server_manager = new ServerManager();
server_manager.init(server);

server.bind(8080, '127.0.0.1');

var rl = readline.createInterface(process.stdin, process.stdout);

rl.on('SIGINT', function () {
  server.close();
  rl.close();
});
