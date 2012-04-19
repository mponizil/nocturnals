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
  'collections/comments',
  'views/dialog',
  'views/app/conversation/comments',
  'text!templates/app/conversation/conversation.mustache!strip'
  ], function ($, _, Backbone, Mustache, Text, Comments, DialogView, CommentsView, conversation_template) {

  var ConversationView = Backbone.View.extend({

    el: $("#conversation-page"),

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
      return Mustache.to_html(conversation_template, params);
    },

    events: {
      'click #link-comments'       : 'commentsPage',
      'swipeleft'                  : 'commentsPage',
      'submit #new-text-form'      : 'newText',
      'click #delete-conversation' : 'removeConversation',
      'click #edit-conversation'   : 'editConversation'
    },

    render: function() {
      var data = this.prepareData();
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(data));
      this.$el.page("destroy").page();
      return this;
    },

    prepareData: function() {
      var owner = (SpiritApp.User.get("id") == this.model.get("author").id);
      var data = $.extend({}, this.model.toJSON(), { back: this.options.back, owner: owner });
      data.texts = _.map(this.collection.toJSON(), function(text) {
        text.me = function() {
          return text.author_name == SpiritApp.User.toJSON().username;
        }
        return text;
      });
      return data;
    },

    commentsPage: function() {
      var comments_view = new CommentsView({
        model: this.model,
        collection: new Comments()
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
      return false;
    },

    removeConversation: function(e) {
      var _cv = this;
      var confirmed = confirm("Are you sure you want to remove this conversation?");
      if (confirmed) {
        _cv.model.destroy({
          url: CONFIG.ENDPOINT + "/api/v1/conversation/" + _cv.model.get("id"),
          success: function() {
            this.undelegateEvents();
            $("#nav-conversations").click();
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