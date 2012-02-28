/**
 * app.js
 * Used to initialize the app and begin
 */

define([
  'jQuery',
  'views/init/init',
  'views/auth/login',
  'views/auth/signup',
  'views/app/dashboard'
  ], function ($, InitView) {
  return {
    init: function () {
      var init_view = (new InitView).render().$el;
      $('body').append(init_view);
      $.mobile.initializePage();
    }
  };
});