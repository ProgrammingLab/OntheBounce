var chai = require('chai');
var Member = require('../es6/member');
var rewire = require('rewire');
var pMember = rewire('../es6/member.es6');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
var expect = chai.expect;

