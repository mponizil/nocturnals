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

    url: CONFIG.ENDPOINT + '/api/v1/comment/?format=json',

    model: Comment,

    parse: function(data) {
      return data.objects;
    }

  });

  return Comments;

});