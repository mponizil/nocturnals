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
  'models/user',
  'collections/comments',
  'views/dialog',
  'views/app/conversation/comments',
  'views/app/import/add-council-members',
  'views/app/user',
  'views/app/import/import-mode',
  'text!templates/app/conversation/conversation.mustache!strip'
  ], function ($, _, Backbone, Mustache, Text, User, Comments, DialogView, CommentsView, AddCouncilMembersView, UserView, ImportModeView, conversation_template) {

  var ConversationView = Backbone.View.extend({

    el: $("#conversation-page"),

    initialize: function() {
      this.model.on("change", this.render, this);
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
      'click #link-comments'           : 'commentsPage',
      'swipeleft'                      : 'commentsPage',
      'submit #new-text-form'          : 'newText',
      'click #add-council-members'     : 'addCouncilMembers',
      'click #delete-conversation'     : 'removeConversation',
      'click #import-mode'             : 'importMode',
      'click #council-members .user'   : 'viewUser',
      'click #council-members .delete' : 'removeCouncilMember',
      'click #texts .text'             : 'chooseText'
    },

    render: function() {
      var data = this.prepareData();
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(data));
      this.$el.page("destroy").page();
      return this;
    },

    prepareData: function() {
      var _c = this;
      var owner = (SpiritApp.User.get("id") == this.model.get("author").id);
      var data = $.extend({}, this.model.toJSON(), { back: this.options.back, owner: owner });
      data.texts = _.map(this.collection.toJSON(), function(text) {
        text.them = function() {
          return text.author_name == data.target;
        };
        text.gender_class = function() {
          var my_gender = (SpiritApp.User.get("gender") == "Male") ? "dude" : "girl";
          var author_gender = (_c.model.get("gender") == "F" || _c.model.get("gender") == "Female") ? "dude" : "girl";
          var opp_gender = (_c.model.get("gender") == "F" || _c.model.get("gender") == "Female") ? "girl" : "dude";
          var gender = "other";
          if (text.author_name == data.target) gender = opp_gender;
          if (text.author) {
            if (text.author.id == _c.model.get("author").id) gender = author_gender;
            if (text.author.id == SpiritApp.User.get("id") && _c.model.get("author").id == SpiritApp.User.get("id")) gender = my_gender;
          }
          return gender;
        };
        return text;
      });
      return data;
    },

    commentsPage: function() {
      SpiritApp.App.views.comments = new CommentsView({
        model: this.model,
        collection: new Comments()
      });
      var comments_page = $("#comments-page");
      $.mobile.changePage(comments_page, { changeHash: false, transition: 'slide' });
      SpiritApp.App.views.comments.initPage();
    },

    newText: function(e) {
      var new_text_body = this.$("#new-text").val();
      if (!new_text_body) return false;
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

    viewUser: function(e) {
      var user_id = $(e.target).parents("li").data("id");
      SpiritApp.App.views.user = new UserView({
        model: new User({ id: user_id }),
        back: {
          view: this,
          slug: "conversation"
        }
      });
      var user_page = $("#user-page");
      $.mobile.changePage(user_page, { changeHash: false, transition: 'slide' });
      SpiritApp.App.views.user.initPage();
    },

    removeCouncilMember: function(e) {
      var user_id = $(e.target).parents("li").data("id");
      var confirmed = confirm("Do you want to remove this council member?");
      if (confirmed) {
        var council_members = _.reject(this.model.get("council_members"), function(council_member) {
          return council_member.id == user_id;
        });
        this.model.set("council_members", council_members);
        this.model.save(null, {
          url: CONFIG.ENDPOINT + this.model.get("resource_uri")
        });
      }
    },

    addCouncilMembers: function() {
      var _c = this;
      _c.model.set({ texts: [] });
      this.collection.each(function(text) {
        _c.model.get("texts").push(text.get("resource_uri"));
      });
      SpiritApp.App.views.add_council_members = new AddCouncilMembersView({
        model: this.model
      });
      var add_council_members_page = $("#add-council-members-page");
      $.mobile.changePage(add_council_members_page, { changeHash: false, transition: 'slide' });
      SpiritApp.App.views.add_council_members.initPage();
    },

    removeConversation: function(e) {
      var confirmed = confirm("Are you sure you want to remove this conversation?");
      if (confirmed) {
        this.model.destroy({
          url: CONFIG.ENDPOINT + this.model.get("resource_uri"),
          success: function() {
            $("#nav-conversations").click();
          }
        });
      }
    },

    importMode: function(e) {
      SpiritApp.App.views.import_mode = new ImportModeView({
        model: this.model,
        collection: this.collection,
        done: "conversation"
      });
      SpiritApp.App.views.import_mode.on("done", this.conversationPage, this);
      var import_mode_page = $("#import-mode-page");
      $.mobile.changePage(import_mode_page, { changeHash: false, transition: 'slide' });
      SpiritApp.App.views.import_mode.initPage();
    },

    conversationPage: function(texts) {
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, reverse: true, transition: 'slide' });
      SpiritApp.App.views.conversation.render();
    },

    chooseText: function(e) {
      var text_id = $(e.currentTarget).data("id");
      var text = this.collection.get(text_id);
      if (text.get("author") && text.get("author").id != SpiritApp.User.get("id") && this.model.get("author").id == SpiritApp.User.get("id")) {
        var confirmed = confirm("Are you sure you want to send the message: \"" + text.get("body") + "\"?");
        if (confirmed) {
          var new_text = new Text({
            conversation: this.model.get("resource_uri"),
            author: SpiritApp.User.toJSON(),
            author_name: SpiritApp.User.get("username"),
            body: text.get("body")
          });
          new_text.save();
          this.collection.add(new_text);
        }
      }
    }

  });

  return ConversationView;

});