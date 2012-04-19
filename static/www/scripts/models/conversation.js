/**
 * models/conversation.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone'
  ], function ($, _, Backbone) {

  var Conversation = Backbone.Model.extend({

    url: CONFIG.ENDPOINT + "/api/v1/conversation/"

  });

  return Conversation;

});