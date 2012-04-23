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
      data.back = (this.options.done == "conversation");
      data.side = (data.back) ? "l" : "r";
      data.gender = data.gender.substring(0,1);
      data.gender_pronoun = (data.gender == "F") ? "Her" : "Him";
      data.them = this.$("select[name='text_author']").val() == "them";
      data.texts = _.map(this.collection.toJSON(), function(text) {
        text.them = function() {
          return text.author_name == data.target;
        }
        return text;
      });
      return data;
    },

    submitConversation: function() {
      this.undelegateEvents();
      this.trigger("done", this.collection);
    },

    addText: function() {
      var author = this.$("select[name='text_author']").val();
      var author_name;
      if (author == "them") {
        author = null;
        author_name = this.model.get("target");
      } else {
        author = SpiritApp.User.toJSON();
        author_name = author.username;
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