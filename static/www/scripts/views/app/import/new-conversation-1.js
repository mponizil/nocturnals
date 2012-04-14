/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/conversation',
  'text!templates/app/import/new-conversation-1.mustache!strip'
  ], function ($, _, Backbone, Mustache, Conversation, new_conversation_1_template) {

  var NewConversation1View = Backbone.View.extend({

    el: $("#new-conversation-1-page"),

    initPage: function() {
      this.render();
      return this;
    },

    template: function(params) {
      return Mustache.to_html(new_conversation_1_template, params);
    },

    events: {
      'click #link-dashboard'           : 'dashboardPage',
      'submit #new-conversation-1-form' : 'newConversation'
    },

    render: function() {
      var conversation = this.model.toJSON();
      conversation.gender = conversation.gender || SpiritApp.User.oppGender();
      conversation.gender = conversation.gender.substring(0,1);
      conversation.female = (conversation.gender != "M");
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(conversation));
      this.$el.page("destroy").page();
      return this;
    },

    dashboardPage: function() {
      $(".footer a").removeClass("ui-btn-active ui-state-persist");
      var dashboard_page = $("#dashboard-page");
      $.mobile.changePage(dashboard_page, { changeHash: false, reverse: true, transition: 'fade' });
      this.model.clear();
    },

    newConversation: function() {
      var target = $("#target").val();
      var gender = this.$("input[name='gender']:checked").val();
      this.model.set({
        author: SpiritApp.User.toJSON(),
        target: target,
        gender: gender
      });
      this.trigger("step_2", false);
      return false;
    }

  });

  return NewConversation1View;

});