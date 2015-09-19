var chai = require('chai');
var Room = require('../es6/room');
var rewire = require('rewire');
var pRoom = rewire('../es6/room.es6');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
var expect = chai.expect;
