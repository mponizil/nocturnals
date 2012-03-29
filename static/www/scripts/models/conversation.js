/**
 * models/conversation.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user',
  'models/text',
  'models/comment',
  'collections/texts',
  'collections/comments'
  ], function ($, _, Backbone, User, Text, Comment, Texts, Comments) {

  var Conversation = Backbone.Model.extend({

    url: CONFIG.ENDPOINT + "/api/v1/conversation/"

  });

  return Conversation;

});