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
  'views/signup/signup',
  'views/app/dashboard',
  'text!templates/init.mustache!strip'
  ], function ($, _, Backbone, Mustache, SignupView, DashboardView, init_template) {

  var InitView = Backbone.View.extend({

    initialize: function() {
      $.ajax({
        type: "POST",
        url: CONFIG.ENDPOINT + "/init",
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
        var dashboardView = new DashboardView;
        var page = dashboardView.render().$el;

        $.mobile.pageContainer.append(page);
        $.mobile.changePage(page, { role: 'page', transition: 'slide' });
      } else {
        var signupView = new SignupView;
        var page = signupView.render().$el;

        $.mobile.pageContainer.append(page);
        $.mobile.changePage(page, { role: 'page', transition: 'slide' });
      }
    }

  });

  return InitView;

});