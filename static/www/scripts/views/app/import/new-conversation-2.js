/**
 * views/app/dashboard.js
 * Shows user their options
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

    initialize: function() {
    },

    initPage: function() {
      this.$el.html(this.template());
      this.$el.page("destroy").page();
      return this;
    },

    template: function(params) {
      return Mustache.to_html(new_conversation_2_template, params);
    },

    events: {
      'click #link-new-conversation-1' : 'newConversation1Page'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    newConversation1Page: function() {
      this.trigger("step_1");
    }

  });

  return NewConversation2View;

});