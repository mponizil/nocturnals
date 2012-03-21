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

    initialize: function() {
    }

  });

  return User;

});