/**
 * collections/comments.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/comment'
  ], function ($, _, Backbone, Comment) {

  var Comments = Backbone.Collection.extend({

    url: function() {
      return CONFIG.ENDPOINT + '/api/v1/comment/?format=json';
    },

    model: Comment

  });

  return Comments;

});