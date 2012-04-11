/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/app/new-conversation-1.mustache!strip'
  ], function ($, _, Backbone, Mustache, new_conversation_1_template) {

  var NewConversation1View = Backbone.View.extend({

    el: $("#new-conversation-1-page"),

    initialize: function() {
    },

    initPage: function() {
      this.$el.html(this.template());
      this.$el.page("destroy").page();
      return this;
    },

    template: function(params) {
      return Mustache.to_html(new_conversation_1_template, params);
    },

    events: {
      'click #link-dashboard'           : 'dashboardPage',
      'submit #new-conversation-1-form' : 'newConversation'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }  ,

    dashboardPage: function() {
      var dashboard_page = $("#dashboard-page");
      $.mobile.changePage(dashboard_page, { changeHash: false, reverse: true, transition: 'slide' });
    },

    newConversation: function() {
      console.log('submit');
      this.trigger("step_2");
      return false;
    }

  });

  return NewConversation1View;

});