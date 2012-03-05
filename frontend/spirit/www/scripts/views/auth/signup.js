/**
 * views/auth/signup.js
 * Allows user to signup
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/user',
  'text!templates/auth/signup.mustache!strip'
  ], function ($, _, Backbone, Mustache, User, signup_template) {

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
      var signup_data = this.$("#signup-form").serialize();
      $.ajax({
        type: "POST",
        url: CONFIG.ENDPOINT + "/auth/register",
        data: signup_data,
        success: function(response) {
          if (response.success) {
            SpiritApp.User = new User({
              id: response.data.user.id,
              username: response.data.user.username
            })
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

    login: function(event) {
      var loginView = new SpiritApp.Pages.LoginView;
      var page = loginView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', reverse: true, transition: 'flip' });
    }
  });

  return SpiritApp.Pages.SignupView;

});