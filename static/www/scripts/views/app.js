/**
 * views/app.js
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user',
  'collections/conversations',
  'views/auth/auth',
  'views/app/dashboard',
  'views/app/pages/my-conversations',
  'views/app/pages/import-conversation',
  'views/app/pages/browse-feed',
  'views/app/pages/my-councils',
  'text!templates/skeleton.mustache'
  ], function ($, _, Backbone, User, Conversations, AuthView, DashboardView, MyConversationsView, ImportConversationView, BrowseFeedView, MyCouncilsView, skeleton_template) {

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
      this.views.my_conversations = new MyConversationsView({
        collection: new Conversations()
      });
      this.views.my_councils = new MyCouncilsView({
        collection: new Conversations()
      });
      this.views.browse_feed = new BrowseFeedView({
        collection: new Conversations()
      });
      this.views.import_conversation = new ImportConversationView();
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
      var dashboard_page = $("#dashboard-page");
      $.mobile.changePage(dashboard_page, { changeHash: false, transition: 'slide' });
    },

    pageNav: function(e) {
      var page_a = $(e.target).parent("a");
      var page_key = page_a.attr("id").replace("nav-",""); // page as referenced in dash format
      var page_view = page_a.data("view"); // page as referenced as Backbone view

      // update footer nav to indicate which page is active
      $(".footer a").removeClass("ui-btn-active ui-state-persist");
      $("#nav-" + page_key + "-page .footer #" + page_key).addClass("ui-btn-active ui-state-persist");

      // execute $.mobile.changePage
      var page = $("#" + page_key + "-page");
      $.mobile.changePage(page, { changeHash: false, transition: 'fade' });
      this.views[page_view].initPage();
    }

  });

  return AppView;

});