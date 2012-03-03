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

  var Comments = Backbone.Collection.extend({

    model: Comment

  });

  return Comments;

});