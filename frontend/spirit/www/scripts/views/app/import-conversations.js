/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/import-conversations.mustache!strip'
  ], function ($, _, Backbone, Mustache, import_conversations_template) {

  SpiritApp.Pages.ImportConversationsView = Backbone.View.extend({

    template: function(params) {
      return Mustache.to_html(import_conversations_template, params);
    },

    events: {
      'click #link-dashboard' : 'dashboard'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }  ,

    dashboard: function() {
      var dashboardView = new SpiritApp.Pages.DashboardView;
      var page = dashboardView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', transition: 'slide' });
    }

  });

  return SpiritApp.Pages.ImportConversationsView;

});