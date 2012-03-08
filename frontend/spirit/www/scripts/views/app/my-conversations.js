/**
 * views/app/my-conversations.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/conversation',
  'collections/conversations',
  'views/app/conversation',
  'text!templates/app/my-conversations.mustache!strip'
  ], function ($, _, Backbone, Mustache, Conversation, Conversations, ConversationView, my_conversations_template) {

  var MyConversationsView = Backbone.View.extend({

    el: $("#my-conversations-page"),

    initialize: function() {
    },

    initPage: function() {
      var _mc = this;
      Conversations.fetch({
        data: {
          author: SpiritApp.User.get("id")
        },
        success: function() {
          _mc.render();
        }
      });
    },

    template: function(params) {
      return Mustache.to_html(my_conversations_template, params);
    },

    events: {
      'click #link-dashboard' : 'dashboardPage',
      'click li a'            : 'conversationPage'
    },

    render: function() {
      this.$el.html(this.template({ conversations: Conversations.toJSON() }));
      this.$el.page("destroy").page();
      return this;
    },

    dashboardPage: function() {
      var dashboard_page = $("#dashboard-page");
      $.mobile.changePage(dashboard_page, { changeHash: false, reverse: true, transition: 'slide' });
    },

    conversationPage: function(event) {
      var conversation_id = $(event.target).data("id");
      var conversation_view = new ConversationView({
        model: new Conversation({ id: conversation_id }),
        back: {
          slug: "my-conversations",
          title: "My Conversations"
        }
      });
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, transition: 'slide' });
      conversation_view.initPage();
    }

  });

  return MyConversationsView;

});