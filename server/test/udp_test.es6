var expect = require('chai').expect;
var Udp = require('../es6/udp.es6');
var mockup = require('mock-udp');

describe('udp class', function () {
    describe('has host property', function () {
        it('is not null', function () {
            var udp = new Udp('host', 1234);
            expect(udp.host).to.not.be.null;
            expect(udp.host).to.not.be.undefined;
        });
        it('is null', function () {
            var udp = new Udp();
            expect(udp.host).to.be.undefined;
        });
    });
    describe('has port property', function () {
        it('is not null', function () {
            var udp = new Udp('host', 1234);
            expect(udp.port).to.not.be.null;
            expect(udp.port).to.not.be.undefined;
        });
        it('is null', function () {
            var udp = new Udp();
            expect(udp.port).to.be.undefined;
        });
    });

    describe('#distribute', function () {
        it('send data by udp', function () {
            var scope = mockup('localhost:1234');
            var udp = new Udp('localhost', 1234);
            udp.distribute('test', [], []);
            expect(scope.buffer).to.eql(Udp.to_json('test', [], []));
            scope.done();
        });
    });

    describe('to_json', function () {
        it('returns json data', function () {
            var msg_json = JSON.stringify({
                event: 'test',
                data: [],
                errors: []
            });
            expect(Udp.to_json('test', [], [])).to.eql(msg_json);
        });
    });
});
