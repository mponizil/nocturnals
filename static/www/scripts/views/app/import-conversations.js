/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/app/import-conversations.mustache!strip'
  ], function ($, _, Backbone, Mustache, import_conversations_template) {

  var ImportConversationsView = Backbone.View.extend({

    el: $("#import-conversations-page"),

    initialize: function() {
    },

    initPage: function() {
      this.$el.html(this.template());
      this.$el.page("destroy").page();
      return this;
    },

    template: function(params) {
      return Mustache.to_html(import_conversations_template, params);
    },

    events: {
      'click #link-dashboard' : 'dashboardPage'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }  ,

    dashboardPage: function() {
      var dashboard_page = $("#dashboard-page");
      $.mobile.changePage(dashboard_page, { changeHash: false, reverse: true, transition: 'slide' });
    }

  });

  return ImportConversationsView;

});