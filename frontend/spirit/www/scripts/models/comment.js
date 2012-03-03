/**
 * models/comment.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user'
  ], function ($, _, Backbone, User) {

  var Comment = Backbone.RelationalModel.extend({

    relations: [{
      type: Backbone.HasOne,
      key: 'author',
      relatedModel: 'User',
      reverseRelation: {
        key: 'conversations'
      }
    }],

    defaults: {
      
    },

    initialize: function() {
      
    }

  });

  return Comment;

});