/**
 * models/text.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user',
  'models/comment',
  'collections/text-comments'
  ], function ($, _, Backbone, User, Comment, TextComments) {

  var Text = Backbone.RelationalModel.extend({

    relations: [{
      type: Backbone.HasOne,
      key: 'author',
      relatedModel: 'User',
      reverseRelation: {
        key: 'texts'
      }
    }, {
      type: Backbone.HasMany,
      key: 'comments',
      relatedModel: 'Comment',
      collectionType: 'TextComments',
      reverseRelation: {
        key: 'text'
      }
    }],

    defaults: {
    },

    initialize: function() {
      
    }

  });

  return Text;

});