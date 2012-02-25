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
  'views/auth/signup',
  'text!templates/dashboard.mustache!strip'
  ], function ($, _, Backbone, Mustache, SignupView, dashboard_template) {

  var DashboardView = Backbone.View.extend({

    template: function(params) {
      return Mustache.to_html(dashboard_template, params);
    },

    events: {
      'click #logout-link' : 'logout'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    logout: function() {
      $.ajax({
        type: "GET",
        url: CONFIG.ENDPOINT + "/auth/logout",
        success: function(data) {
          var signupView = new SignupView;
          var page = signupView.render().$el;
          $.mobile.pageContainer.append(page);
          $.mobile.changePage(page, { role: 'page', transition: 'slide' });
        }
      })
    }

  });

  return DashboardView;

});