/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/app/my-conversations.mustache!strip'
  ], function ($, _, Backbone, Mustache, my_conversations_template) {

  SpiritApp.Pages.MyConversationsView = Backbone.View.extend({

    template: function(params) {
      return Mustache.to_html(my_conversations_template, params);
    },

    events: {
      'click #link-dashboard' : 'dashboard'
    },

    render: function() {
      var conversations = [
        { preview: "Hey ;)" },
        { preview: "Helloooo" },
        { preview: "Got so much homewo..." }
      ]
      this.$el.html(this.template({ conversations: conversations }));
      return this;
    },

    dashboard: function() {
      var dashboardView = new SpiritApp.Pages.DashboardView;
      var page = dashboardView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', reverse: true, transition: 'slide' });
    }

  });

  return SpiritApp.Pages.DashboardView;

});