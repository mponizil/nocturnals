/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/app/import/new-conversation-3.mustache!strip'
  ], function ($, _, Backbone, Mustache, new_conversation_3_template) {

  var NewConversation3View = Backbone.View.extend({

    el: $("#new-conversation-3-page"),

    initPage: function() {
      this.render();
      return this;
    },

    template: function(params) {
      return Mustache.to_html(new_conversation_3_template, params);
    },

    events: {
      'click #link-new-conversation-2' : 'newConversation2Page'
    },

    render: function() {
      var conversation = this.model.toJSON();
      conversation.gender = conversation.gender.substring(0,1);
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(conversation));
      this.$el.page("destroy").page();
      return this;
    },

    newConversation2Page: function() {
      this.trigger("step_2", true);
    }

  });

  return NewConversation3View;

});