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

    model: Text

  });

  return Texts;

});