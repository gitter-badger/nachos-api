'use strict';

// TODO: export to module

var request = require('request');
var urljoin = require('url-join');
var _ = require('lodash');

module.exports = function (baseUri, subRoute, routes) {
  return _.mapValues(routes, function (options) {
    return function (data, cb) {
      cb = cb || _.noop;
      request({
        uri: urljoin(baseUri, subRoute, options.uri),
        method: options.method,
        json: data
      }, function (err, response, body) {
        if (err) {
          return cb(err);
        }
        else if (response.statusCode !== 200) {
          return cb({response: response, body: body});
        }

        cb(null, body);
      });
    };
  });
};