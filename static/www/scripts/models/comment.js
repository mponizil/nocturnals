/**
 * models/comment.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone'
  ], function ($, _, Backbone) {

  var Comment = Backbone.Model.extend({

    url: CONFIG.ENDPOINT + "/api/v1/comment/"

  });

  return Comment;

});