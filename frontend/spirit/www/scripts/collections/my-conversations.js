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

  var MyConversations = Backbone.Collection.extend({

    model: Conversation

  });

  return MyConversations;

});