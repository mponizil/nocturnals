/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/comment',
  'text!templates/app/comments.mustache!strip'
  ], function ($, _, Backbone, Mustache, Comment, comments_template) {

  var CommentsView = Backbone.View.extend({

    el: $("#comments-page"),

    initialize: function() {
    },

    initPage: function() {
      var _cv = this;
      _cv.model.fetchRelated('comments', {
        data: { conversation: _cv.model.get("id") },
        success: function() { _cv.render(); }
      });
    },

    template: function(params) {
      return Mustache.to_html(comments_template, params);
    },

    events: {
      'click #link-conversation' : 'conversationPage',
      'submit #new-comment-form' : 'newComment'
    },

    render: function() {
      var data = $.extend({}, this.model.toJSON(), { back: this.options.back });
      this.$el.html(this.template(data));
      this.$el.page("destroy").page();
      return this;
    },

    conversationPage: function() {
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, reverse: true, transition: 'slide' });
      this.undelegateEvents();
    },

    newComment: function(event) {
      var new_comment_body = this.$("#new-comment").val();
      var new_comment = new Comment({
        author: SpiritApp.User,
        body: new_comment_body
      });
      // new_comment.save();
      this.model.get("comments").add(new_comment);
      this.render();
      return false;
    }

  });

  return CommentsView;

});