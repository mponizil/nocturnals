/**
 * views/app/import/import-mode.js
 * Step 3 of import process
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/text',
  'text!templates/app/import/import-mode.mustache!strip'
  ], function ($, _, Backbone, Mustache, Text, import_mode_template) {

  var ImportModeView = Backbone.View.extend({

    el: $("#import-mode-page"),

    initialize: function() {
      this.collection.on("add", this.render, this);
    },

    initPage: function() {
      this.render();
      return this;
    },

    template: function(params) {
      return Mustache.to_html(import_mode_template, params);
    },

    events: {
      'click #link-new-conversation-2'  : 'newConversation2Page',
      'click #link-submit-conversation' : 'submitConversation',
      'submit #add-text-form'           : 'addText'
    },

    render: function() {
      var data = this.prepareData();
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(data));
      this.$el.page("destroy").page();
      return this;
    },

    prepareData: function() {
      var data = this.model.toJSON();
      data.gender = data.gender.substring(0,1);
      data.gender_pronoun = (data.gender == "F") ? "Her" : "Him";
      data.me = this.$("select[name='text_author']").val() == "me";
      data.texts = _.map(this.collection.toJSON(), function(text) {
        text.me = function() {
          return text.author_name == SpiritApp.User.toJSON().username;
        }
        return text;
      });
      return data;
    },

    newConversation2Page: function() {
      this.trigger("step_2", true);
    },

    submitConversation: function() {
      this.trigger("done", this.collection);
    },

    addText: function() {
      var author = this.$("select[name='text_author']").val();
      var author_name;
      if (author == "me") {
        author = SpiritApp.User.toJSON();
        author_name = author.username;
      } else {
        author = null;
        author_name = this.model.get("target");
      }
      var body = this.$("#new-text").val();
      var new_text = new Text({
        conversation: this.model.get("resource_uri"),
        author: author,
        author_name: author_name,
        body: body
      });
      new_text.save();
      this.collection.add(new_text);
      return false;
    }

  });

  return ImportModeView;

});