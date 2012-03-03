/**
 * models/my-conversations.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone'
  ], function ($, _, Backbone) {

  var Message = Backbone.RelationalModel.extend({

    defaults: {
      username: null
    },

    // urlRoot: CONFIG.ENDPOINT + "/",

    initialize: function() {
      
    }

  });

  return Message;

});