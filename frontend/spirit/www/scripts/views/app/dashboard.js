/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/dashboard.mustache!strip'
  ], function ($, _, Backbone, Mustache, dashboard_template) {

  SpiritApp.Pages.DashboardView = Backbone.View.extend({

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
          var signupView = new SpiritApp.Pages.SignupView;
          var page = signupView.render().$el;
          $.mobile.pageContainer.append(page);
          $.mobile.changePage(page, { role: 'page', transition: 'slide' });
        }
      })
    }

  });

  return SpiritApp.Pages.DashboardView;

});