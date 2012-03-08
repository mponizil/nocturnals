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
  'models/comment',
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

    url: function() {
      return CONFIG.ENDPOINT + "/api/v1/conversation/" + this.get("id") + "/?format=json"
    }

  });

  return Conversation;

});