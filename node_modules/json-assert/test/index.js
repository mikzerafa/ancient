'use strict';
/* jshint node:true */
/* global describe, it */

var assert = require("assert");
var jsonAssert = require("..");

var DEBUG = false;

var basicThings = [
  null,
  true,
  false,
  0,
  1,
  "",
  "1",
  "null", [], {},
  [0],
  [1],
  [0, 0],
  [0, 1],
  [1, 0],
  "a", {
    a: 0
  }, {
    b: 0
  }, {
    a: 1
  }, {
    a: false
  }, {
    a: {
      b: {
        c: false
      }
    }
  }, {
    a: {
      b: {
        c: 0
      }
    }
  }, {
    a: []
  }, {
    a: [1]
  }
];

function check(src, dst, expectedResult) {
  if (DEBUG) {
    console.log('----\n', "expected(", expectedResult, ")\n", src, "\n", dst);
  }
  assert.equal(
    jsonAssert.isEqual(src, dst, true),
    expectedResult,
    "expected(" + expectedResult + ") " + JSON.stringify(src) + " " + JSON.stringify(dst)
  );
}

describe('json-assert', function() {
  describe('isEqual', function() {

    it('should have basic objects as different from each other', function() {
      var len, i, j, src, dst;

      len = basicThings.length;
      for (i = 0; i < len; i++) {
        src = basicThings[i];
        for (j = 0; j < len; j++) {

          // to make them different objects we can stringify then parse
          dst = basicThings[j];
          if (dst !== undefined) {
            dst = JSON.parse(JSON.stringify(dst));
          }

          var expectedResult = (i == j);
          check(src, dst, expectedResult);
        }
      }
    });

    it('should accept functions in the source', function() {
      var len, i, j, src, dst;

      len = basicThings.length;
      for (i = 0; i < len; i++) {
        src = basicThings[i];

        check({
          x: jsonAssert.dontCare
        }, {
          x: src
        }, true);

        check({
          x: jsonAssert.matchType(typeof src)
        }, {
          x: src
        }, true);

        check({
          x: jsonAssert.dontCare,
          y: jsonAssert.optional
        }, {
          x: src
        }, true);

        check({
          x: jsonAssert.dontCare,
          y: jsonAssert.optional
        }, {
          x: src,
          y: src
        }, true);

      }
    });

    it('should check for missing parts', function() {

      var expected = [{
        name: 'admin',
        isSpecial: true
      }, {
        name: 'everyone',
        isSpecial: true
      }, {
        name: 'testGroup',
        isSpecial: false,
        asdasdasd: 4 // extra param
      }];

      var actual = [{
        name: 'admin',
        isSpecial: true
      }, {
        name: 'everyone',
        isSpecial: true
      }, {
        name: 'testGroup',
        isSpecial: false
      }];

      check(expected, actual, false);

    });

  });
});
