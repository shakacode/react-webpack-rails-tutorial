var React = require('react');
var ReactAddons = require('react/addons');
var TestUtils = React.addons.TestUtils;
//var assert = require('assert');
//var expect = require('expect');
//var Root = require('../root');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})
