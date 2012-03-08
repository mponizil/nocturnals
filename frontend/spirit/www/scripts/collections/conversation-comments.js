/**
 * models/conversation-comments.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/comment'
  ], function ($, _, Backbone, Comment) {

  var ConversationComments = Backbone.Collection.extend({

    model: Comment,

    parse: function(response) {
      return response.objects;
    }

  });

  return new ConversationComments;

});