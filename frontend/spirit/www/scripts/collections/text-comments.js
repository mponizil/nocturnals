/**
 * collections/text-comments.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/comment'
  ], function ($, _, Backbone, Comment) {

  var TextComments = Backbone.Collection.extend({

    model: Comment

  });

  return TextComments;

});