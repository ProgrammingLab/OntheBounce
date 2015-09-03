var chai = require('chai');
var Packet = require('../es6/packet');
var rewire = require('rewire');
var pPacket = rewire('../es6/packet.es6');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
var expect = chai.expect;

describe('session id packet', () => {
    var session_id = require('../es6/packets/session_id');
    it ('packet is instance of session_id', () => {
        var obj = {event: 'session_id', data: {session_id: 10}, errors: []};
        var packet = new Packet(obj);
        expect(packet.obj instanceof session_id).to.be.true;
    });

    it ('session id is required', () => {
        var obj = {event: 'session_id', data: {session_id: 10}, errors: []};
        var packet = new Packet(obj);
        expect(packet.obj.data.session_id).to.be.not.undefined
        expect(packet.obj.data.session_id).to.eql(10);
    });

    it ('unknown event occurred', () => {
        var obj = {event: 'test', data: {session_id: 10}, errors: []};
        var packet = new Packet(obj);
        expect(packet.obj instanceof session_id).to.be.false;
    });
});