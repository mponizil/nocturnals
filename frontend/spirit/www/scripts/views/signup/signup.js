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
  'views/next/next',
  'text!templates/signup.mustache!strip'
  ], function ($, _, Backbone, Mustache, NextView, signup_template) {

  var SignupView = Backbone.View.extend({

    initialize: function() {
    },

    template: function(params) {
      return Mustache.to_html(signup_template, params);
    },

    events: {
      'submit #signup-form'  : 'signup'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    signup: function(event) {
      var signup_data = $("#signup-form").serialize();
      $.ajax({
        type: "POST",
        url: CONFIG.ENDPOINT + "/users/new",
        data: signup_data,
        success: function(data) {
          var nextView = new NextView;
          var page = nextView.render().$el;

          $.mobile.pageContainer.append(page);
          $.mobile.changePage(page, { role: 'page', transition: 'slide' });
        }
      });
      return false;
    }
  });

  return SignupView;

});