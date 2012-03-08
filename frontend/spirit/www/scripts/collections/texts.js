/**
 * collections/texts.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/text'
  ], function ($, _, Backbone, Text) {

  var Texts = Backbone.Collection.extend({

    model: Text,

    parse: function(response) {
      return response.objects;
    }

  });

  return new Texts;

});