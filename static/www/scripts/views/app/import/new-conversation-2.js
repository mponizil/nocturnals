/**
 * views/app/import/new-conversation-2.js
 * Step 2 of import process
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/app/import/new-conversation-2.mustache!strip'
  ], function ($, _, Backbone, Mustache, new_conversation_2_template) {

  var NewConversation2View = Backbone.View.extend({

    el: $("#new-conversation-2-page"),

    initPage: function() {
      this.render();
      return this;
    },

    template: function(params) {
      return Mustache.to_html(new_conversation_2_template, params);
    },

    events: {
      'click #link-new-conversation-1'  : 'newConversation1Page',
      'submit #new-conversation-2-form' : 'createConversation'
    },

    render: function() {
      var conversation = this.model.toJSON();
      conversation.gender = conversation.gender.substring(0,1);
      conversation.public = (conversation.public == null) ? false : conversation.public;
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(conversation));
      this.$el.page("destroy").page();
      return this;
    },

    newConversation1Page: function() {
      this.trigger("step_1", true);
    },

    createConversation: function() {
      var context = $("#context").val();
      var public = $("select[name='public']").val() == "public";
      this.model.set({
        context: context,
        public: public
      });
      this.model.save();
      this.trigger("step_3", false);
      return false;
    }

  });

  return NewConversation2View;

});