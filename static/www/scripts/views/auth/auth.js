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
  'views/auth/signup',
  'views/auth/login',
  'text!templates/auth/auth.mustache!strip'
  ], function ($, _, Backbone, Mustache, SignupView, LoginView, auth_template) {

  var AuthView = Backbone.View.extend({

    el: $("#auth-page"),

    initialize: function() {
      this.views = {};

      this.render();

      this.getUserStatus();

      this.views.signup = new SignupView();
      this.views.login = new LoginView();
      this.views.signup.on("login_page", this.loginPage, this);
      this.views.login.on("signup_page", this.signupPage, this);
    },

    template: function(params) {
      return Mustache.to_html(auth_template, params);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    getUserStatus: function() {
      var _auth = this;

      $.ajax({
        type: "POST",
        url: CONFIG.ENDPOINT + "/auth/init",
        success: function(response) {
          _auth.userStatus(response);
        }
      });
    },

    userStatus: function(response) {
      if (response.data.logged_in) {
        SpiritApp.User.set({
          id: response.data.user.id,
          username: response.data.user.username,
          gender: response.data.user.gender
        });
        SpiritApp.User.trigger("logged_in");
      } else {
        var signup_page = $("#signup-page");
        $.mobile.changePage(signup_page, { changeHash: false, transition: 'slide' });
      }
    },

    signupPage: function() {
      var signup_page = $("#signup-page");
      $.mobile.changePage(signup_page, { changeHash: false, reverse: true, transition: 'flip' });
    },

    loginPage: function() {
      var login_page = $("#login-page");
      $.mobile.changePage(login_page, { changeHash: false, transition: 'flip' });
    }

  });

  return AuthView;

});