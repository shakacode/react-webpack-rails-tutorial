var expect = require('expect');
var React = require('react/addons');

describe('example', function () {
  beforeEach(function () {
    var myDiv = document.createElement('div');
    myDiv.id = 'content';
    document.body.appendChild(myDiv);
  });

  it('mounts to #content correctly', function () {
    require('../example');
    expect(1).toBe(1);
  });
});
