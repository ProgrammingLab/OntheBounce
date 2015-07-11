var dgram = require('dgram');
var readline = require('readline');
var _ = require('./util');

var server = dgram.createSocket('udp4');

server.on('message', function (msg, rinfo) {
  console.log(msg.toString());
  console.log("%s:%d\n", rinfo.address, rinfo.port);
});

server.on('error', function (err) {
  console.log("server error:\n" + err.stack);
  server.close();
});

server.on('close', function () {
  console.log('Server Closed');
});

server.on('listening', function () {
  var addr = server.address();
  console.log(`Listening Start on Server - ${addr.address}:${addr.port}`)
});

server.bind(8080, '127.0.0.1');

var rl = readline.createInterface(process.stdin, process.stdout);

rl.on('SIGINT', function () {
  server.close();
  rl.close();
});
