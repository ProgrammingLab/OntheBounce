var expect = require('chai').expect;
var ServerManager = require('../es6/server_manager');

let server_manager = new ServerManager();

describe('server_manager', () => {
    it('should singleton', () => {
        var s = new ServerManager();
        expect(s == server_manager).to.be.true
    });
});
