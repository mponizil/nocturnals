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

    url: CONFIG.ENDPOINT + "/api/v1/comment/",

    parse: function(data) {
      return data && data.objects && ( _.isArray( data.objects ) ? data.objects[ 0 ] : data.objects ) || data;
    }

  });

  return Comment;

});