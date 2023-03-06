'use strict';
/* jshint node:true */

var _ = require('underscore');

exports.dontCare = function(keyName, returnValue) {
  // we only care that it exists.
  return (typeof returnValue !== 'undefined');
};

exports.optional = function(keyName, returnValue) {
  // we don't even care if it exists
  return true;
};

exports.optionalMatchValue = function(value) {
  // either it is undefined or it strict equals the value
  return function(keyName, returnValue) {
    return (typeof returnValue === 'undefined' || returnValue === value);
  };
};

exports.matchType = function(type) {
  // it is of the given type
  return function(keyName, returnValue) {
    return (typeof returnValue === type);
  };
};

exports.optionalMatchType = function(type) {
  // either it is undefined or it is of the given type
  return function(keyName, returnValue) {
    return (typeof returnValue === type || typeof returnValue === 'undefined');
  };
};

exports.isEqual = function(src, dst, silence) {


  var fullDst = JSON.stringify(dst, null, 2);

  function failTest(msg) {
    if (!silence) {
      console.log(msg);
      console.log(fullDst);
    }
    return false;
  }

  function innerCheck(name, src, dst) {

    var len, res, i;

    // if the test has given us a function, evaluate that.
    if (typeof src === 'function') {
      if (!src(name, dst, fullDst)) {
        return failTest("Failed func " + name + " got " + dst);
      }
      // don't bother doing any other checks
      return true;
    }

    // check dst exists (redundant code but gives a better error message)
    if (typeof dst === 'undefined') {
      return failTest("dest is missing key " + name + "");
    }

    // make sure the data types match
    if (typeof src !== typeof dst) {
      return failTest("types don't match for " + name + ". " + typeof src + " != " + typeof dst);
    }

    // check array has the same length and check their contents is equal
    if (_.isArray(src) || _.isArray(dst)) {
      if (!_.isArray(dst) || !_.isArray(src)) {
        return failTest("source is array but dest is not in " + name);
      }
      if (src.length !== dst.length) {
        return failTest("source and dest have different lengths in " + name);
      }

      len = src.length;
      for (i = 0; i < len; i++) {
        res = innerCheck(name + "[" + i + "]", src[i], dst[i]);
        if (!res) {
          return false;
        }
      }

      // don't check anything else for this
      return true;
    }

    // check objects have the same keys and that their contents is equal
    if (_.isObject(src)) {
      if (!_.isObject(dst)) {
        return failTest("source is object but dest is not in " + name);
      }

      var keys = _.union(_.keys(src), _.keys(dst));

      len = keys.length;
      for (i = 0; i < len; i++) {
        var key = keys[i];

        if (!src.hasOwnProperty(key)) {
          return failTest("dest has unexpected key " + key + " in " + name + ". ");
        }

        res = innerCheck(name + "." + key, src[key], dst[key]);
        if (!res) {
          return false;
        }
      }

      // don't check anything else for this
      return true;
    }

    // finally check the two things are the same.
    if (src !== dst) {
      return failTest("Expected " + src + " = " + dst + " in " + name);
    }

    // they must be equal
    return true;
  }

  return innerCheck('', src, dst);
};
