/**
 * views/auth/login.js
 * Allows user to login
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/user',
  'text!templates/auth/login.mustache!strip'
  ], function ($, _, Backbone, Mustache, User, login_template) {

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
      var login_data = this.$("#login-form").serialize();
      $.ajax({
        type: "POST",
        url: CONFIG.ENDPOINT + "/auth/login",
        data: login_data,
        success: function(response) {
          if (response.success) {
            SpiritApp.User = new User({
              id: response.data.user.id,
              username: response.data.user.username
            });
            var dashboardView = new SpiritApp.Pages.DashboardView;
            var page = dashboardView.render().$el;
            $.mobile.pageContainer.append(page);
            $.mobile.changePage(page, { role: 'page', transition: 'slide' });
          } else {
            alert(response.error);
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