/**
 * app.js
 * Used to initialize the app and begin
 */

define([
  'jQuery',
  'views/app'
  ], function ($, AppView) {
  return {
    init: function () {
      SpiritApp.App = new AppView;
      $.mobile.initializePage();
    }
  };
});