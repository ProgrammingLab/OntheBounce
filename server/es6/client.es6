var dgram = require('dgram');
var readline = require('readline');
var Udp = require('./udp');

var options = {
  host: '127.0.0.1',
  port: 8080
};

var client = new Udp(options.host, options.port);

var rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function (cmd) {
  console.log(`You just typed: ${cmd}`);
  client.distribute('typed', cmd, {});
});


rl.on('SIGINT', function () {
  console.log(`Connection Closed - ${options.host}:${options.port}`);
  client.close();
  rl.close();
});
