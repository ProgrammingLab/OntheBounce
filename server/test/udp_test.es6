var expect = require('chai').expect;
var Udp = require('../es6/udp.es6');
var mockup = require('mockup-udp');

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
});
