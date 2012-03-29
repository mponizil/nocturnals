/**
 * models/text.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user'
  ], function ($, _, Backbone, User) {

  var Text = Backbone.Model.extend({

    initialize: function() {
    },

    url: CONFIG.ENDPOINT + "/api/v1/text/"

  });

  return Text;

});