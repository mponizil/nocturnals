/**
 * models/text.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone'
  ], function ($, _, Backbone) {

  var Text = Backbone.Model.extend({

    url: CONFIG.ENDPOINT + "/api/v1/text/"

  });

  return Text;

});