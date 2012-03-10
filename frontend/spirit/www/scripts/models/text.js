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
      relatedModel: User,
      reverseRelation: {
        key: 'texts'
      }
    }],

    defaults: {
    },

    initialize: function() {
    },

    url: function() {
      return CONFIG.ENDPOINT + this.get("resource_uri") + "?format=json";
    }

  });

  return Text;

});