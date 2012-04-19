/**
 * collections/users.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user'
  ], function ($, _, Backbone, User) {

  var Users = Backbone.Collection.extend({

    url: CONFIG.ENDPOINT + '/api/v1/user/?format=json',

    model: User,

    parse: function(data) {
      return data.objects;
    }

  });

  return Users;

});