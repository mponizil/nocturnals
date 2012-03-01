/**
 * views/auth/signup.js
 * Allows user to signup
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/auth/signup.mustache!strip'
  ], function ($, _, Backbone, Mustache, signup_template) {

  SpiritApp.Pages.SignupView = Backbone.View.extend({

    initialize: function() {
    },

    template: function(params) {
      return Mustache.to_html(signup_template, params);
    },

    events: {
      'submit #signup-form' : 'signup',
      'click #login-link'   : 'login'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    signup: function(event) {
      var signup_data = $("#signup-form").serialize();
      $.ajax({
        type: "POST",
        url: CONFIG.ENDPOINT + "/auth/register",
        data: signup_data,
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

    login: function(event) {
      var loginView = new SpiritApp.Pages.LoginView;
      var page = loginView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', reverse: true, transition: 'flip' });
    }
  });

  return SpiritApp.Pages.SignupView;

});