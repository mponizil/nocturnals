/**
 * views/app/conversation/conversation.js
 * View a conversation
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/text',
  'collections/texts',
  'views/dialog',
  'views/app/conversation/comments',
  'text!templates/app/conversation/conversation.mustache!strip'
  ], function ($, _, Backbone, Mustache, Text, Texts, DialogView, CommentsView, conversation_template) {

  var ConversationView = Backbone.View.extend({

    el: $("#conversation-page"),

    initPage: function() {
      var _cv = this;
      _cv.collection = new Texts();
      _cv.collection.fetch({
        data: { conversation: _cv.model.get("id") },
        success: function() { _cv.render() }
      });
    },

    template: function(params) {
      return Mustache.to_html(conversation_template, params);
    },

    events: {
      'click #link-conversations'  : 'conversationsPage',
      'click #link-browse-feed'    : 'browseFeedPage',
      'click #link-comments'       : 'commentsPage',
      'swipeleft'                  : 'commentsPage',
      'submit #new-text-form'      : 'newText',
      'click #delete-conversation' : 'removeConversation',
      'click #edit-conversation'   : 'editConversation'
    },

    render: function() {
      var owner = (SpiritApp.User.get("id") == this.model.get("author").id);
      var data = $.extend({}, this.model.toJSON(), { back: this.options.back, owner: owner });
      data.texts = this.collection.toJSON();
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(data));
      this.$el.page("destroy").page();
      return this;
    },

    conversationsPage: function() {
      var conversations_page = $("#conversations-page");
      $.mobile.changePage(conversations_page, { changeHash: false, reverse: true, transition: 'slide' });
      this.undelegateEvents();
    },

    browseFeedPage: function() {
      var browse_feed_page = $("#browse-feed-page");
      $.mobile.changePage(browse_feed_page, { changeHash: false, reverse: true, transition: 'slide' });
      this.undelegateEvents();
    },

    commentsPage: function() {
      var comments_view = new CommentsView({
        model: this.model
      });
      var comments_page = $("#comments-page");
      $.mobile.changePage(comments_page, { changeHash: false, transition: 'slide' });
      comments_view.initPage();
    },

    newText: function(e) {
      var new_text_body = this.$("#new-text").val();
      var new_text = new Text({
        conversation: this.model.get("resource_uri"),
        author: SpiritApp.User.toJSON(),
        author_name: SpiritApp.User.get("username"),
        body: new_text_body
      });
      new_text.save();
      this.collection.add(new_text);
      this.render();
      return false;
    },

    removeConversation: function(e) {
      var _cv = this;
      var confirmed = confirm("Are you sure you want to remove this conversation?");
      if (confirmed) {
        _cv.model.destroy({
          url: CONFIG.ENDPOINT + "/api/v1/conversation/" + _cv.model.get("id"),
          success: function() {
            _cv.conversationsPage();
          }
        });
      }
    },

    editConversation: function(e) {
      // this.trigger("edit_conversation", this.model);
    }

  });

  return ConversationView;

});