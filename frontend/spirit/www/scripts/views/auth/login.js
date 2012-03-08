/**
 * views/auth/login.js
 * Allows user to login
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'views/auth/signup',
  'text!templates/auth/login.mustache!strip'
  ], function ($, _, Backbone, Mustache, SignupView, login_template) {

  var LoginView = Backbone.View.extend({

    el: $("#login-page"),

    initialize: function() {
      this.render();
    },

    template: function(params) {
      return Mustache.to_html(login_template, params);
    },

    events: {
      'submit #login-form' : 'login',
      'click #signup-link' : 'signupPage'
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
        success: this.loginResponse
      });
      return false;
    },

    loginResponse: function(response) {
      if (response.success) {
        SpiritApp.User.set({
          id: response.data.user.id,
          username: response.data.user.username
        });
        SpiritApp.User.trigger("logged_in");
      } else {
        alert(response.error);
      }
    },

    signupPage: function(event) {
      this.trigger("signup_page");
    }
  });

  return LoginView;

});