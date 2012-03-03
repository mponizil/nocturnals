/**
 * models/my-conversations.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user'
  ], function ($, _, Backbone, User) {

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
      reverseRelation: {
        key: 'text'
      }
    }],

    defaults: {
      person: 1,
      message: null
    },

    // urlRoot: CONFIG.ENDPOINT + "/",

    initialize: function() {
      
    }

  });

  return Text;

});