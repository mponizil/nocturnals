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
  'collections/comments',
  'text!templates/app/conversation/comments.mustache!strip'
  ], function ($, _, Backbone, Mustache, Comment, Comments, comments_template) {

  var CommentsView = Backbone.View.extend({

    el: $("#comments-page"),

    initPage: function() {
      var _cv = this;
      _cv.collection = new Comments();
      _cv.collection.fetch({
        data: { conversation: _cv.model.get("id") },
        success: function() { _cv.render() }
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
      data.comments = this.collection.toJSON();
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
        conversation: this.model.get("resource_uri"),
        author: SpiritApp.User.toJSON(),
        body: new_comment_body
      });
      new_comment.save();
      this.collection.add(new_comment);
      this.render();
      return false;
    }

  });

  return CommentsView;

});