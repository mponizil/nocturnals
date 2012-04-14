/**
 * views/app/pages/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/app/pages/dashboard.mustache!strip'
  ], function ($, _, Backbone, Mustache, dashboard_template) {

  var DashboardView = Backbone.View.extend({

    el: $("#dashboard-page"),

    initPage: function() {
      this.render();
    },

    template: function(params) {
      return Mustache.to_html(dashboard_template, params);
    },

    events: {
      'click #logout-link' : 'logout'
    },

    render: function() {
      this.$(".header, .content").remove();
      this.$el.prepend(this.template());
      this.$el.page("destroy").page();
      return this;
    },

    logout: function() {
      $.ajax({
        type: "GET",
        url: CONFIG.ENDPOINT + "/auth/logout",
        success: function(response) {
          SpiritApp.User.trigger("logged_out");
        }
      })
    }

  });

  return DashboardView;

});