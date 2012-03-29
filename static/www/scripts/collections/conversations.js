/**
 * collections/conversations.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/conversation'
  ], function ($, _, Backbone, Conversation) {

  var Conversations = Backbone.Collection.extend({

    url: CONFIG.ENDPOINT + "/api/v1/conversation/?format=json",

    model: Conversation,

    parse: function(data) {
      return data.objects;
    }

  });

  return Conversations;

});