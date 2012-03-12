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

    url: CONFIG.ENDPOINT + '/api/v1/text/?format=json',

    model: Text

  });

  return Texts;

});