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

  var Message = Backbone.RelationalModel.extend({

    relations: [{
      type: Backbone.HasOne,
      key: 'author',
      relatedModel: 'User',
      reverseRelation: {
        type: Backbone.HasMany,
        key: 'messages'
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

  return Message;

});