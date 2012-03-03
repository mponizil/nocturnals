/**
 * views/init/init.js
 * Checks if user is logged in
 * Yes: forwards to dashboard
 * No: forwards to signup
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/user',
  'text!templates/init/init.mustache!strip'
  ], function ($, _, Backbone, Mustache, User, init_template) {

  SpiritApp.Pages.InitView = Backbone.View.extend({

    initialize: function() {
      $.ajax({
        type: "POST",
        url: CONFIG.ENDPOINT + "/auth/init",
        success: this.userStatus
      });
    },

    template: function(params) {
      return Mustache.to_html(init_template, params);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    userStatus: function(response) {
      if (response.data.logged_in) {
        SpiritApp.User = new User({
          username: response.data.user.username
        });
        var dashboardView = new SpiritApp.Pages.DashboardView;
        var page = dashboardView.render().$el;
        $.mobile.pageContainer.append(page);
        $.mobile.changePage(page, { role: 'page', transition: 'slide' });
      } else {
        var signupView = new SpiritApp.Pages.SignupView;
        var page = signupView.render().$el;
        $.mobile.pageContainer.append(page);
        $.mobile.changePage(page, { role: 'page', transition: 'slide' });
      }
    }

  });

  return SpiritApp.Pages.InitView;

});