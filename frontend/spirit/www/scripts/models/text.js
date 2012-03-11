/**
 * models/text.js
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