/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/browse-feed.mustache!strip'
  ], function ($, _, Backbone, Mustache, browse_feed_template) {

  SpiritApp.Pages.BrowseFeedView = Backbone.View.extend({

    template: function(params) {
      return Mustache.to_html(browse_feed_template, params);
    },

    events: {
      'click #link-dashboard' : 'dashboard'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    dashboard: function() {
      var dashboardView = new SpiritApp.Pages.DashboardView;
      var page = dashboardView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', transition: 'slide' });
    }

  });

  return SpiritApp.Pages.BrowseFeedView;

});