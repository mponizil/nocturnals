/**
 * models/my-conversations.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user'
  'models/message',
  'collections/message-collection',
  ], function ($, _, Backbone, User, Message, MessageCollection) {

  var Conversation = Backbone.RelationalModel.extend({

    relations: [{
      type: Backbone.HasMany,
      key: 'messages',
      relatedModel: 'Message',
      collectionType: 'MessageCollection',
      reverseRelation: {
        key: 'conversation'
      }
    }, {
      type: Backbone.HasOne,
      key: 'author',
      relatedModel: 'User',
      reverseRelation: {
        key: 'conversations'
      }
    }]

    defaults: {
      
    },

    url: CONFIG.ENDPOINT + "/",

    initialize: function() {
      
    }

  });

  return Conversation;

});