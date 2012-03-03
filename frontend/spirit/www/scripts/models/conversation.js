/**
 * models/conversation.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user',
  'models/text',
  'collections/texts',
  'collections/conversation-comments'
  ], function ($, _, Backbone, User, Text, Comment, Texts, ConversationComments) {

  var Conversation = Backbone.RelationalModel.extend({

    relations: [{
      type: Backbone.HasOne,
      key: 'author',
      relatedModel: 'User',
      reverseRelation: {
        key: 'conversations'
      }
    }, {
      type: Backbone.HasMany,
      key: 'texts',
      relatedModel: 'Text',
      collectionType: 'Texts',
      reverseRelation: {
        key: 'conversation'
      }
    }, {
      type: Backbone.HasMany,
      key: 'comments',
      relatedModel: 'Comment',
      collectionType: 'ConversationComments',
      reverseRelation: {
        key: 'conversation'
      }
    }],

    defaults: {
      
    },

    initialize: function() {
    },

    parse: function(response) {
      console.log(response);
    }

  });

  return Conversation;

});