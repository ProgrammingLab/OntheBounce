var chai = require('chai');
var ServerManager = require('../es6/server_manager');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
var expect = chai.expect;

let server_manager = new ServerManager();

describe('server_manager', () => {
    it('should singleton', () => {
        var s = new ServerManager();
        expect(s == server_manager).to.be.true
    });
});

describe('udp methods', () => {
    it ('init', () => {
        var server_manager = new ServerManager();
        var socket = { on: function() {}};
        var spy = sinon.spy(socket, 'on');
        server_manager.init(socket);
        expect(spy.called).to.be.true;
    });
});

