/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:50 AM
 */

define(['jQuery', 'views/home/home'], function ($, HomeView) {
  return {
    init: function () {
      var firstPage = (new HomeView).render().$el;
      $('body').append(firstPage);
      $.mobile.initializePage();
    }
  };
});