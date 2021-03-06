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
  'collections/texts',
  'views/app/import/new-conversation-1',
  'views/app/import/new-conversation-2',
  'views/app/import/import-mode',
  'views/app/conversation/conversation'
  ], function ($, _, Backbone, Mustache, Conversation, Texts, NewConversation1View, NewConversation2View, ImportModeView, ConversationView) {

  var ImportConversationView = Backbone.View.extend({

    initialize: function() {
      this.views = {};

      this.views.new_conversation_1 = new NewConversation1View({
        model: this.model
      });
      this.views.new_conversation_2 = new NewConversation2View({
        model: this.model
      });

      this.views.new_conversation_1.on("step_2", this.newConversation2Page, this);
      this.views.new_conversation_2.on("step_1", this.newConversation1Page, this);
      this.views.new_conversation_2.on("step_3", this.importModePage, this);
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

    importModePage: function(reverse) {
      SpiritApp.App.views.import_mode = new ImportModeView({
        model: this.model,
        collection: new Texts(),
        done: "new-conversation-2"
      });
      SpiritApp.App.views.import_mode.on("step_2", this.newConversation2Page, this);
      SpiritApp.App.views.import_mode.on("done", this.conversationPage, this);
      var import_mode_page = $("#import-mode-page");
      $.mobile.changePage(import_mode_page, { changeHash: false, reverse: reverse, transition: 'slide' });
      SpiritApp.App.views.import_mode.initPage();
    },

    conversationPage: function(texts) {
      SpiritApp.App.views.conversation = new ConversationView({
        model: this.model.clone(),
        collection: texts,
        back: "conversations"
      });
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, transition: 'slide' });
      SpiritApp.App.views.conversation.render();
      SpiritApp.App.updateFooter();
    }

  });

  return ImportConversationView;

});