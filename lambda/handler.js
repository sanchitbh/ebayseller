'use strict';

var request = require('request');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
var $ = require('./node_modules/jquery/dist/jquery')(window);

module.exports.proxy = (event, context, callback) => {
  var reply = request(event.path.substr(1), function(err, response, body) {
    var div = $(body.toString());
    var feedback = div.find('span.mbg-l')
    var rating = div.find('div#si-fb');

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        feedback: feedback.html(),
        rating: rating.html()
      })
    });
  });
};
