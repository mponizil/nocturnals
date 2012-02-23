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
  'text!templates/next.mustache!strip'
  ], function ($, _, Backbone, Mustache, next_template) {

  var NextView = Backbone.View.extend({

    template: function(params) {
      return Mustache.to_html(next_template, params);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return NextView;

});