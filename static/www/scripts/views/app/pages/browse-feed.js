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
  'collections/texts',
  'views/app/conversation/conversation',
  'text!templates/app/pages/browse-feed.mustache!strip'
  ], function ($, _, Backbone, Mustache, Conversation, Conversations, Texts, ConversationView, browse_feed_template) {

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
      var conversation_id = $(event.currentTarget).data("id");
      SpiritApp.App.views.conversation = new ConversationView({
        model: this.collection.get(conversation_id),
        collection: new Texts(),
        back: "browse-feed"
      });
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, transition: 'slide' });
      SpiritApp.App.views.conversation.initPage();
    }

  });

  return BrowseFeedView;

});