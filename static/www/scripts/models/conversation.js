/**
 * models/conversation.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone'
  ], function ($, _, Backbone) {

  var Conversation = Backbone.Model.extend({

    defaults: {
      council_members: []
    },

    url: CONFIG.ENDPOINT + "/api/v1/conversation/",

    parse: function(data) {
      return data && data.objects && ( _.isArray( data.objects ) ? data.objects[ 0 ] : data.objects ) || data;
    }

  });

  return Conversation;

});