/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'collections/conversations',
  'text!templates/app/dashboard.mustache!strip'
  ], function ($, _, Backbone, Mustache, Conversations, dashboard_template) {

  SpiritApp.Pages.DashboardView = Backbone.View.extend({

    template: function(params) {
      return Mustache.to_html(dashboard_template, params);
    },

    events: {
      'click #logout-link'          : 'logout',
      'click #my-conversations'     : 'myConversations',
      'click #import-conversations' : 'importConversations',
      'click #browse-feed'          : 'browseFeed'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    logout: function() {
      $.ajax({
        type: "GET",
        url: CONFIG.ENDPOINT + "/auth/logout",
        success: function(response) {
          SpiritApp.User = null;
          var loginView = new SpiritApp.Pages.LoginView;
          var page = loginView.render().$el;
          $.mobile.pageContainer.append(page);
          $.mobile.changePage(page, { role: 'page', reverse: true, transition: 'slide' });
        }
      })
    },

    myConversations: function() {
      Conversations.fetch({
        data: {
          author: SpiritApp.User.get("id")
        },
        success: function(response) {
          var myConversationsView = new SpiritApp.Pages.MyConversationsView({
            collection: Conversations
          });
          var page = myConversationsView.render().$el;
          $.mobile.pageContainer.append(page);
          $.mobile.changePage(page, { role: 'page', transition: 'slide' });
        }
      });
    },

    importConversations: function() {
      var importConversationsView = new SpiritApp.Pages.ImportConversationsView;
      var page = importConversationsView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', transition: 'slide' });
    },

    browseFeed: function() {
      var browseFeedView = new SpiritApp.Pages.BrowseFeedView;
      var page = browseFeedView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', transition: 'slide' });
    }

  });

  return SpiritApp.Pages.DashboardView;

});