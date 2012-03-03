/**
 * models/my-conversations.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user'
  'models/text',
  'collections/texts',
  'collections/comments'
  ], function ($, _, Backbone, User, Text, TextsCollection, CommentsCollection) {

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
      collectionType: 'TextsCollection',
      reverseRelation: {
        key: 'conversation'
      }
    }, {
      type: Backbone.HasMany,
      key: 'comments',
      relatedModel: 'Comment',
      collectionType: 'CommentsCollection',
      reverseRelation: {
        key: 'conversation'
      }
    }]

    defaults: {
      
    },

    initialize: function() {
      
    }

  });

  return Conversation;

});