/**
 * models/user.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone'
  ], function ($, _, Backbone) {

  var User = Backbone.RelationalModel.extend({

    defaults: {
      username: null
    },

    // urlRoot: CONFIG.ENDPOINT + "/",

    initialize: function() {
      
    }

  });

  return User;

});