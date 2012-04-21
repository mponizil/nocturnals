/**
 * models/text.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone'
  ], function ($, _, Backbone) {

  var Text = Backbone.Model.extend({

    url: CONFIG.ENDPOINT + "/api/v1/text/",

    parse: function(data) {
      return data && data.objects && ( _.isArray( data.objects ) ? data.objects[ 0 ] : data.objects ) || data;
    }

  });

  return Text;

});