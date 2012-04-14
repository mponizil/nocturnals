/**
 * views/app/pages/browse-feed.js
 * View public conversations
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/conversation',
  'collections/conversations',
  'views/app/conversation/conversation',
  'text!templates/app/pages/browse-feed.mustache!strip'
  ], function ($, _, Backbone, Mustache, Conversation, Conversations, ConversationView, browse_feed_template) {

  var BrowseFeedView = Backbone.View.extend({

    el: $("#browse-feed-page"),

    initPage: function() {
      var _bfv = this;
      _bfv.collection.fetch({
        data: { public: true },
        success: function() {
          _bfv.render();
        }
      });
    },

    template: function(params) {
      return Mustache.render(browse_feed_template, params);
    },

    events: {
      'click .content li a' : 'conversationPage'
    },

    render: function() {
      this.$(".header, .content").remove();
      this.$el.prepend(this.template({ conversations: this.collection.toJSON() }));
      this.$el.page("destroy").page();
      return this;
    },

    conversationPage: function(event) {
      var conversation_id = $(event.target).data("id");
      var conversation_view = new ConversationView({
        model: this.collection.get(conversation_id),
        back: "browse-feed"
      });
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, transition: 'slide' });
      conversation_view.initPage();
    }

  });

  return BrowseFeedView;

});