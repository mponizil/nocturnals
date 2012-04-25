/**
 * views/app/conversation/comments.js
 * View conversation comments
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/comment',
  'collections/comments',
  'text!templates/app/conversation/comments.mustache!strip'
  ], function ($, _, Backbone, Mustache, Comment, Comments, comments_template) {

  var CommentsView = Backbone.View.extend({

    el: $("#comments-page"),

    initialize: function() {
      this.collection.on("reset", this.render, this);
      this.collection.on("add", this.render, this);
    },

    initPage: function() {
      var _cv = this;
      _cv.collection.fetch({
        data: { conversation: _cv.model.get("id") }
      });
    },

    template: function(params) {
      return Mustache.render(comments_template, params);
    },

    events: {
      'click #link-conversation' : 'conversationPage',
      'swiperight'               : 'conversationPage',
      'submit #new-comment-form' : 'newComment'
    },

    render: function() {
      var data = $.extend({}, this.model.toJSON(), { back: this.options.back });
      data.comments = this.collection.toJSON();
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(data));
      this.$el.page("destroy").page();
      return this;
    },

    conversationPage: function() {
      var _c = this;
      _c.model.set({ comments: [] });
      this.collection.each(function(comment) {
        _c.model.get("comments").push(comment.get("resource_uri"));
      });
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, reverse: true, transition: 'slide' });
      this.undelegateEvents();
    },

    newComment: function(event) {
      var new_comment_body = this.$("#new-comment").val();
      if (!new_comment_body) return false;
      var new_comment = new Comment({
        conversation: this.model.get("resource_uri"),
        author: SpiritApp.User.toJSON(),
        body: new_comment_body
      });
      new_comment.save();
      this.collection.add(new_comment);
      return false;
    }

  });

  return CommentsView;

});