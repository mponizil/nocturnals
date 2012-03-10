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
  'views/app/my-conversations',
  'views/app/import-conversations',
  'views/app/browse-feed',
  'text!templates/app/dashboard.mustache!strip'
  ], function ($, _, Backbone, Mustache, Conversations, MyConversationsView, ImportConversationsView, BrowseFeedView, dashboard_template) {

  var DashboardView = Backbone.View.extend({

    el: $("#dashboard-page"),

    initialize: function() {
      this.render();

      this.views = {};
      this.views.my_conversations = new MyConversationsView({
        collection: new Conversations()
      });
      this.views.import_conversations = new ImportConversationsView();
      this.views.browse_feed = new BrowseFeedView({
        collection: new Conversations()
      });
    },

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
          SpiritApp.User.trigger("logged_out");
        }
      })
    },

    myConversations: function() {
      var my_conversations_page = $("#my-conversations-page");
      $.mobile.changePage(my_conversations_page, { changeHash: false, transition: 'slide' });
      this.views.my_conversations.initPage();
    },

    importConversations: function() {
      var import_conversations_page = $("#import-conversations-page");
      $.mobile.changePage(import_conversations_page, { changeHash: false, transition: 'slide' });
      this.views.import_conversations.initPage();
    },

    browseFeed: function() {
      var browse_feed_page = $("#browse-feed-page");
      $.mobile.changePage(browse_feed_page, { changeHash: false, transition: 'slide' });
      this.views.browse_feed.initPage();
    }

  });

  return DashboardView;

});