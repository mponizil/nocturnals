/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/text',
  'models/comment',
  'text!templates/app/conversation.mustache!strip'
  ], function ($, _, Backbone, Mustache, Text, Comment, conversation_template) {

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
      'click #link-my-councils'      : 'myCouncilsPage',
      'click #link-browse-feed'      : 'browseFeedPage',
      'submit #new-text-form'        : 'newText',
      'submit #new-comment-form'     : 'newComment'
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
      // unbind all events this view has created
    },

    myCouncilsPage: function() {
      var my_councils_page = $("#my-councils-page");
      $.mobile.changePage(my_councils_page, { changeHash: false, reverse: true, transition: 'slide' });
      // unbind all events this view has created
    },

    browseFeedPage: function() {
      var browse_feed_page = $("#browse-feed-page");
      $.mobile.changePage(browse_feed_page, { changeHash: false, reverse: true, transition: 'slide' });
      // unbind all events this view has created
    },

    newText: function(event) {
      var new_text_body = this.$("#new-text").val();
      var new_text = new Text({
        author: SpiritApp.User,
        author_name: SpiritApp.User.get("username"),
        body: new_text_body
      });
      // new_text.save();
      this.model.get("texts").add(new_text);
      this.render();
      return false;
    },

    newComment: function(event) {
      console.log('yo')
      var new_comment_body = this.$("#new-comment").val();
      var new_comment = new Comment({
        author: SpiritApp.User,
        body: new_comment_body
      });
      // new_text.save();
      this.model.get("comments").add(new_comment);
      this.render();
      return false;
    }

  });

  return ConversationView;

});