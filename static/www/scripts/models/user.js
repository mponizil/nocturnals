/**
 * models/user.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone'
  ], function ($, _, Backbone) {

  var User = Backbone.Model.extend({

    url: CONFIG.ENDPOINT + "/api/v1/user/",

    parse: function(data) {
      return data && data.objects && ( _.isArray( data.objects ) ? data.objects[ 0 ] : data.objects ) || data;
    },

    oppGender: function() {
      if (this.get("gender") == "Female") return "Male";
      else return "Female";
    }

  });

  return User;

});