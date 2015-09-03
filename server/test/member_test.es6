var chai = require('chai');
var Member = require('../es6/member');
var rewire = require('rewire');
var pMember = rewire('../es6/member.es6');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
var expect = chai.expect;

describe('Member.getMember', () => {
    it ('returns member', () => {
        var member = new Member('localhost');
        member.session_id = 'test';
        Member.pushMember(member);
        expect(Member.getMember('test')).to.eql(member);
        expect(Member.getMember('')).to.be.null;
    });
});
