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

    oppGender: function() {
      if (this.get("gender") == "Female") return "Male";
      else return "Female";
    }

  });

  return User;

});