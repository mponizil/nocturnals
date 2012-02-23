/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:50 AM
 */

define(['jQuery', 'views/init/init'], function ($, InitView) {
  return {
    init: function () {
      var init_view = (new InitView).render().$el;
      $('body').append(init_view);
      $.mobile.initializePage();
    }
  };
});