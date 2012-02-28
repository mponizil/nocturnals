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
  'text!templates/init.mustache!strip'
  ], function ($, _, Backbone, Mustache, init_template) {

  SpiritApp.Pages.InitView = Backbone.View.extend({

    initialize: function() {
      $.ajax({
        type: "POST",
        url: CONFIG.ENDPOINT + "/auth/init",
        success: this.userStatus
      });
    },

    template: function(params) {
      return Mustache.to_html(init_template, params);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    userStatus: function(data) {
      if (data.loggedin) {
        var dashboardView = new SpiritApp.Pages.DashboardView;
        var page = dashboardView.render().$el;
        $.mobile.pageContainer.append(page);
        $.mobile.changePage(page, { role: 'page', transition: 'slide' });
      } else {
        var signupView = new SpiritApp.Pages.SignupView;
        var page = signupView.render().$el;
        $.mobile.pageContainer.append(page);
        $.mobile.changePage(page, { role: 'page', transition: 'slide' });
      }
    }

  });

  return SpiritApp.Pages.InitView;

});