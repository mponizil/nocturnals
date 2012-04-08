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
  'views/app/my-councils',
  'text!templates/app/dashboard.mustache!strip'
  ], function ($, _, Backbone, Mustache, Conversations, MyConversationsView, ImportConversationsView, BrowseFeedView, MyCouncilsView, dashboard_template) {

  var DashboardView = Backbone.View.extend({

    el: $("#dashboard-page"),

    initialize: function() {
      this.render();

      // make grid the right size
      _.bind(this.sizeGrid, this);
      $(window).resize(this.sizeGrid);
      this.sizeGrid();

      this.views = {};
      this.views.my_conversations = new MyConversationsView({
        collection: new Conversations()
      });
      this.views.my_councils = new MyCouncilsView({
        collection: new Conversations()
      });
      this.views.browse_feed = new BrowseFeedView({
        collection: new Conversations()
      });
      this.views.import_conversations = new ImportConversationsView();
    },

    template: function(params) {
      return Mustache.to_html(dashboard_template, params);
    },

    events: {
      'click #logout-link'          : 'logout',
      'click #my-conversations'     : 'myConversations',
      'click #my-councils'          : 'myCouncils',
      'click #browse-feed'          : 'browseFeed',
      'click #import-conversations' : 'importConversations'
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

    sizeGrid: function() {
      var grid_height = $("body").height() - 41;
      this.$("#dashboard-grid").height(grid_height);
    },

    myConversations: function() {
      var my_conversations_page = $("#my-conversations-page");
      $.mobile.changePage(my_conversations_page, { changeHash: false, transition: 'slide' });
      this.views.my_conversations.initPage();
    },

    myCouncils: function() {
      var my_councils_page = $("#my-councils-page");
      $.mobile.changePage(my_councils_page, { changeHash: false, transition: 'slide' });
      this.views.my_councils.initPage();
    },

    browseFeed: function() {
      var browse_feed_page = $("#browse-feed-page");
      $.mobile.changePage(browse_feed_page, { changeHash: false, transition: 'slide' });
      this.views.browse_feed.initPage();
    },

    importConversations: function() {
      var import_conversations_page = $("#import-conversations-page");
      $.mobile.changePage(import_conversations_page, { changeHash: false, transition: 'slide' });
      this.views.import_conversations.initPage();
    },

  });

  return DashboardView;

});