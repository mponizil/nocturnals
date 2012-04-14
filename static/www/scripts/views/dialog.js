/**
 * views/app/conversation/comments.js
 * View conversation comments
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/_dialog.mustache'
  ], function ($, _, Backbone, Mustache, dialog_template) {

  var DialogView = Backbone.View.extend({

    el: $("#dialog"),

    render: function() {
      this.$el.html(this.template(this.options));
      $.mobile.changePage(this.$el, { changeHash: false, role: 'dialog' });
      return this;
    },

    template: function(params) {
      return Mustache.render(dialog_template, params);
    },

    events: {
      'click a[data-icon="delete"]' : 'close',
      'click #cancel'               : 'close',
      'click #confirm'              : 'confirm'
    },

    close: function() {
      console.log('close dialog')
    },

    confirm: function() {
      this.trigger("confirm");
    }

  });

  return DialogView;

});