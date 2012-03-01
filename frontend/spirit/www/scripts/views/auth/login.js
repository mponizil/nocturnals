/**
 * views/auth/login.js
 * Allows user to login
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/auth/login.mustache!strip'
  ], function ($, _, Backbone, Mustache, login_template) {

  SpiritApp.Pages.LoginView = Backbone.View.extend({

    initialize: function() {
    },

    template: function(params) {
      return Mustache.to_html(login_template, params);
    },

    events: {
      'submit #login-form' : 'login',
      'click #signup-link' : 'signup'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    login: function(event) {
      var login_data = $("#login-form").serialize();
      $.ajax({
        type: "POST",
        url: CONFIG.ENDPOINT + "/auth/login",
        data: login_data,
        success: function(data) {
          if (data.success) {
            var dashboardView = new SpiritApp.Pages.DashboardView;
            var page = dashboardView.render().$el;
            $.mobile.pageContainer.append(page);
            $.mobile.changePage(page, { role: 'page', transition: 'slide' });
          } else {
            alert(data.error);
          }
        }
      });
      return false;
    },

    signup: function(event) {
      var signupView = new SpiritApp.Pages.SignupView;
      var page = signupView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', transition: 'flip' });
    }
  });

  return SpiritApp.Pages.LoginView;

});