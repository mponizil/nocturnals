/**
 * views/app/user.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/app/user.mustache!strip'
  ], function ($, _, Backbone, Mustache, user_template) {

  var UserView = Backbone.View.extend({

    el: $("#user-page"),

    initialize: function() {
      this.model.on("change", this.render, this);
    },

    initPage: function() {
      var _uv = this;
      _uv.model.fetch({
        data: { id: _uv.model.get("id") }
      });
    },

    template: function(params) {
      return Mustache.to_html(user_template, params);
    },

    events: {
      'click #link-back'      : 'back',
      'click #add-to-council' : 'addToCouncil'
    },

    render: function() {
      var data = this.prepareData();
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(data));
      this.$el.page("destroy").page();
      return this;
    },

    prepareData: function() {
      var data = this.model.toJSON();
      data.council_member = (this.options.back == "add-council-members");
      return data;
    },

    back: function(e) {
      var page = $("#" + this.options.back + "-page");
      $.mobile.changePage(page, { changeHash: false, reverse: true, transition: 'slide' });
      this.undelegateEvents();
    },

    addToCouncil: function(e) {
      this.options.conversation.get("council_members").push(this.model.toJSON());
      this.options.conversation.save(null, {
        url: CONFIG.ENDPOINT + this.options.conversation.get("resource_uri")
      });
      this.back();
    }

  });

  return UserView;

});