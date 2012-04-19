/**
 * views/app.js
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user',
  'models/conversation',
  'collections/conversations',
  'views/auth/auth',
  'views/app/pages/dashboard',
  'views/app/pages/conversations',
  'views/app/pages/import-conversation',
  'views/app/pages/browse-feed',
  'text!templates/skeleton.mustache'
  ], function ($, _, Backbone, User, Conversation, Conversations, AuthView, DashboardView, ConversationsView, ImportConversationView, BrowseFeedView, skeleton_template) {

  var AppView = Backbone.View.extend({

    el: $("body"),

    initialize: function() {
      this.fillSkeleton();

      SpiritApp.User = new User;
      SpiritApp.User.on("logged_in", this.loggedIn, this);
      SpiritApp.User.on("logged_out", this.loggedOut, this);
      
      this.views = {};
      this.views.auth = new AuthView();
      this.views.dashboard = new DashboardView();
      this.views.conversations = new ConversationsView();
      this.views.browse_feed = new BrowseFeedView({
        collection: new Conversations()
      });
      this.views.import_conversation = new ImportConversationView({
        model: new Conversation()
      });
    },

    events: {
      'click .footer a' : 'pageNav'
    },

    fillSkeleton: function() {
      var exclude = ["auth","signup","login"];
      $("div[data-role='page']").each(function() {
        if (_.indexOf(exclude, $(this).attr("id").replace("-page","")) == -1) {
          $(this).html(skeleton_template);
        }
      });
    },

    loggedOut: function() {
      SpiritApp.User.clear();
      $("#login-form")[0].reset();
      $("#signup-form")[0].reset();
      var login_page = $("#login-page");
      $.mobile.changePage(login_page, { changeHash: false, reverse: true, transition: 'slide' });
    },

    loggedIn: function() {
      this.updateFooter("dashboard");
      var dashboard_page = $("#dashboard-page");
      $.mobile.changePage(dashboard_page, { changeHash: false, transition: 'slide' });
      this.views.dashboard.initPage();
    },

    pageNav: function(e) {
      var page_a = $(e.currentTarget);
      var page_key = page_a.attr("id").replace("nav-",""); // page as referenced in dash format
      var page_view = page_a.data("view"); // page as referenced as Backbone view

      this.resetPages(page_key);

      // execute $.mobile.changePage
      var page = $("#" + page_key + "-page");
      $.mobile.changePage(page, { changeHash: false, transition: 'fade' });
      this.views[page_view].initPage();
    },

    resetPages: function(page_key) {
      this.updateFooter(page_key);
      if (SpiritApp.App.conversation_view) SpiritApp.App.conversation_view.undelegateEvents();
      if (SpiritApp.App.comments_view) SpiritApp.App.comments_view.undelegateEvents();
      if ($("#new-conversation-1-form")[0]) $("#new-conversation-1-form")[0].reset();
      if ($("#new-conversation-2-form")[0]) $("#new-conversation-2-form")[0].reset();
    },

    // update footer nav to indicate which page is active
    updateFooter: function(page_key) {
      $(".footer a").removeClass("ui-btn-active ui-state-persist");
      $(".footer #nav-" + page_key).addClass("ui-btn-active ui-state-persist");
    }

  });

  return AppView;

});