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
  ], function ($, _, Backbone, User, Text) {

  var Comment = Backbone.RelationalModel.extend({

    relations: [{
      type: Backbone.HasOne,
      key: 'author',
      relatedModel: 'User',
      reverseRelation: {
        key: 'conversations'
      }
    }]

    defaults: {
      
    },

    initialize: function() {
      
    }

  });

  return Comment;

});