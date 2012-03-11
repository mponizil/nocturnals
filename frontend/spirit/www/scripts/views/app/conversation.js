/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/app/conversation.mustache!strip'
  ], function ($, _, Backbone, Mustache, conversation_template) {

  var ConversationView = Backbone.View.extend({

    el: $("#conversation-page"),

    initialize: function() {
    },

    initPage: function() {
      var _cv = this;
      _cv.model.fetchRelated('texts', {
        data: { conversation: _cv.model.get("id") },
        success: function() { _cv.render(); }
      });
      _cv.model.fetchRelated('comments', {
        data: { conversation: _cv.model.get("id") },
        success: function() { _cv.render(); }
      });
    },

    template: function(params) {
      return Mustache.to_html(conversation_template, params);
    },

    events: {
      'click #link-my-conversations' : 'myConversationsPage',
      'click #link-browse-feed'      : 'browseFeedPage'
    },

    render: function() {
      var data = $.extend({}, this.model.toJSON(), { back: this.options.back });
      this.$el.html(this.template(data));
      this.$el.page("destroy").page();
      return this;
    },

    myConversationsPage: function() {
      var my_conversations_page = $("#my-conversations-page");
      $.mobile.changePage(my_conversations_page, { changeHash: false, reverse: true, transition: 'slide' });
    },

    browseFeedPage: function() {
      var browse_feed_page = $("#browse-feed-page");
      $.mobile.changePage(browse_feed_page, { changeHash: false, reverse: true, transition: 'slide' });
    }

  });

  return ConversationView;

});