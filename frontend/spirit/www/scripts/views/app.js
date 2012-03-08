/**
 * views/app.js
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'models/user',
  'views/auth/auth',
  'views/app/dashboard'
  ], function ($, _, Backbone, User, AuthView, DashboardView) {

  var AppView = Backbone.View.extend({

    el: $("body"),

    initialize: function() {
      SpiritApp.User = new User;
      SpiritApp.User.on("logged_in", this.loggedIn, this);
      SpiritApp.User.on("logged_out", this.loggedOut, this);

      this.views = {};
      this.views.auth = new AuthView;
      this.views.dashboard = new DashboardView;
    },

    loggedOut: function() {
      SpiritApp.User.clear();
      $("#login-form")[0].reset();
      var login_page = $("#login-page");
      $.mobile.changePage(login_page, { changeHash: false, reverse: true, transition: 'slide' });
    },

    loggedIn: function() {
      var dashboard_page = $("#dashboard-page");
      $.mobile.changePage(dashboard_page, { changeHash: false, transition: 'slide' });
    }

  });

  return AppView;

});