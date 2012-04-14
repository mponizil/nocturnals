/**
 * views/app/pages/import-conversation.js
 * Manages import process
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/conversation',
  'views/app/import/new-conversation-1',
  'views/app/import/new-conversation-2',
  'views/app/import/new-conversation-3'
  ], function ($, _, Backbone, Mustache, Conversation, NewConversation1View, NewConversation2View, NewConversation3View) {

  var ImportConversationView = Backbone.View.extend({

    initialize: function() {
      this.views = {};
      this.model = new Conversation();

      this.views.new_conversation_1 = new NewConversation1View({
        model: this.model
      });
      this.views.new_conversation_2 = new NewConversation2View({
        model: this.model
      });
      this.views.new_conversation_3 = new NewConversation3View({
        model: this.model
      });

      this.views.new_conversation_1.on("step_2", this.newConversation2Page, this);
      this.views.new_conversation_2.on("step_1", this.newConversation1Page, this);
      this.views.new_conversation_2.on("step_3", this.newConversation3Page, this);
      this.views.new_conversation_3.on("step_2", this.newConversation2Page, this);
    },

    initPage: function() {
      this.views.new_conversation_1.initPage();
      return this;
    },

    newConversation1Page: function(reverse) {
      var new_conversation_1_page = $("#new-conversation-1-page");
      $.mobile.changePage(new_conversation_1_page, { changeHash: false, reverse: reverse, transition: 'slide' });
      this.views.new_conversation_1.initPage();
    },

    newConversation2Page: function(reverse) {
      var new_conversation_2_page = $("#new-conversation-2-page");
      $.mobile.changePage(new_conversation_2_page, { changeHash: false, reverse: reverse, transition: 'slide' });
      this.views.new_conversation_2.initPage();
    },

    newConversation3Page: function(reverse) {
      var new_conversation_3_page = $("#new-conversation-3-page");
      $.mobile.changePage(new_conversation_3_page, { changeHash: false, reverse: reverse, transition: 'slide' });
      this.views.new_conversation_3.initPage();
    }

  });

  return ImportConversationView;

});