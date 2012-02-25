/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'views/auth/login',
  'views/app/dashboard',
  'text!templates/signup.mustache!strip'
  ], function ($, _, Backbone, Mustache, LoginView, DashboardView, signup_template) {

  var SignupView = Backbone.View.extend({

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
            var dashboardView = new DashboardView;
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
      var loginView = new LoginView;
      var page = loginView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', transition: 'slide' });
    }
  });

  return SignupView;

});