var dgram = require('dgram');
var readline = require('readline');
var net = require('net');
var Tcp = require('./tcp');

var options = {
  host: '127.0.0.1',
  port: 8080
};

var client = net.connect(options);

var rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function (cmd) {
  console.log(`You just typed: ${cmd}`);
  var json = Tcp.to_json('debug', cmd, {});
  client.write(json);
});


rl.on('SIGINT', function () {
  console.log(`Connection Closed - ${options.host}:${options.port}`);
  rl.close();
});
