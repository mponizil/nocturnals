/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'views/app/import/new-conversation-1',
  'views/app/import/new-conversation-2'
  ], function ($, _, Backbone, Mustache, NewConversation1View, NewConversation2View) {

  var ImportConversationView = Backbone.View.extend({

    initialize: function() {
      this.views = {};

      this.views.new_conversation_1 = new NewConversation1View();
      this.views.new_conversation_2 = new NewConversation2View();

      this.views.new_conversation_2.on("step_1", this.newConversation1Page, this);
      this.views.new_conversation_1.on("step_2", this.newConversation2Page, this);
    },

    initPage: function() {
      this.views.new_conversation_1.initPage();
      return this;
    },

    newConversation1Page: function() {
      var new_conversation_1_page = $("#new-conversation-1-page");
      $.mobile.changePage(new_conversation_1_page, { changeHash: false, reverse: true, transition: 'slide' });
      this.views.new_conversation_1.initPage();
    },

    newConversation2Page: function() {
      var new_conversation_2_page = $("#new-conversation-2-page");
      $.mobile.changePage(new_conversation_2_page, { changeHash: false, transition: 'slide' });
      this.views.new_conversation_2.initPage();
    }

  });

  return ImportConversationView;

});