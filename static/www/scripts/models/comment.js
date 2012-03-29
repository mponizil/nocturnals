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

  var Comment = Backbone.Model.extend({

    initialize: function() {
    },

    url: CONFIG.ENDPOINT + "/api/v1/comment/"

  });

  return Comment;

});