/**
 * views/auth/signup.js
 * Allows user to signup
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'views/auth/login',
  'text!templates/auth/signup.mustache!strip'
  ], function ($, _, Backbone, Mustache, LoginView, signup_template) {

  var SignupView = Backbone.View.extend({

    el: $("#signup-page"),

    initialize: function() {
      this.render();
    },

    template: function(params) {
      return Mustache.to_html(signup_template, params);
    },

    events: {
      'submit #signup-form' : 'signup',
      'click #login-link'   : 'loginPage'
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
        success: this.signupResponse
      });
      return false;
    },

    signupResponse: function(response) {
      if (response.success) {
        SpiritApp.User.set({
          id: response.data.user.id,
          username: response.data.user.username,
          gender: response.data.user.gender
        });
        SpiritApp.User.trigger("logged_in");
      } else {
        alert(response.error);
      }
    },

    loginPage: function(event) {
      this.trigger("login_page");
    }
  });

  return SignupView;

});