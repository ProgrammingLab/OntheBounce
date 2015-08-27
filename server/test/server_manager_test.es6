var chai = require('chai');
var ServerManager = require('../es6/server_manager');
var rewire = require('rewire');
var pServerManager = rewire('../es6/server_manager.es6');
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

describe('parseJson', () => {
    var parseJson = pServerManager.__get__('parseJson');
    it ('success when json is ok', () => {
        var msg = JSON.stringify({event: 'event', data: [], errors: []});
        var errors = [];
        var result = parseJson(msg, errors);
        expect(errors).to.be.empty;
        expect(result).to.be.an('object');
    });
    it ('unsuccess when json is not ok', () => {
        var msg = '';
        var errors = [];
        var result = parseJson(msg, errors);
        expect(errors).to.not.be.empty;
        expect(result).to.be.undefined;
    });
});
