/**
 * views/app/pages/conversations.js
 * Shows user their conversations
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/conversation',
  'collections/conversations',
  'collections/texts',
  'views/app/conversation/conversation',
  'text!templates/app/pages/conversations.mustache!strip'
  ], function ($, _, Backbone, Mustache, Conversation, Conversations, Texts, ConversationView, conversations_template) {

  var ConversationsView = Backbone.View.extend({

    el: $("#conversations-page"),

    initialize: function() {
      this.collections = {};
      this.collections.my_conversations = new Conversations();
      this.collections.my_councils = new Conversations();

      this.collections.my_conversations.on("destroy", this.render, this);
      this.collections.my_councils.on("destroy", this.render, this);
    },

    initPage: function() {
      var _mcv = this;
      _mcv.data_loaded = 0;
      _mcv.collections.my_conversations.fetch({
        data: {
          author: SpiritApp.User.get("id")
        },
        success: function() {
          _mcv.dataReady();
        }
      });
      _mcv.collections.my_councils.fetch({
        data: {
          council_members: SpiritApp.User.get("id")
        },
        success: function() {
          _mcv.dataReady();
        }
      });
    },

    dataReady: function() {
      this.data_loaded++;
      if (this.data_loaded == 2) {
        this.render();
      }
    },

    template: function(params) {
      return Mustache.render(conversations_template, params);
    },

    events: {
      'click .content li a' : 'conversationPage'
    },

    render: function() {
      var conversations = {
        my_conversations: this.collections.my_conversations.toJSON(),
        my_councils: this.collections.my_councils.toJSON()
      };
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(conversations));
      this.$el.page("destroy").page();
      return this;
    },

    conversationPage: function(e) {
      var conversation_id = $(e.currentTarget).data("id");
      var collection = $(e.currentTarget).data("collection");
      SpiritApp.App.views.conversation = new ConversationView({
        model: this.collections[collection].get(conversation_id),
        collection: new Texts(),
        back: "conversations"
      });
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, transition: 'slide' });
      SpiritApp.App.views.conversation.initPage();
    }

  });

  return ConversationsView;

});