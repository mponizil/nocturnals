/**
 * views/app/my-councils.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/conversation',
  'collections/conversations',
  'views/app/conversation/conversation',
  'text!templates/app/pages/my-councils.mustache!strip'
  ], function ($, _, Backbone, Mustache, Conversation, Conversations, ConversationView, my_councils_template) {

  var MyCouncilsView = Backbone.View.extend({

    el: $("#my-councils-page"),

    initialize: function() {
    },

    initPage: function() {
      var _mcv = this;
      _mcv.collection.fetch({
        data: {
          council_members: SpiritApp.User.get("id")
        },
        success: function() {
          _mcv.render();
        }
      });
    },

    template: function(params) {
      return Mustache.to_html(my_councils_template, params);
    },

    events: {
      'click #link-dashboard' : 'dashboardPage',
      'click li a'            : 'conversationPage'
    },

    render: function() {
      this.$el.html(this.template({ conversations: this.collection.toJSON() }));
      this.$el.page("destroy").page();
      return this;
    },

    dashboardPage: function() {
      var dashboard_page = $("#dashboard-page");
      $.mobile.changePage(dashboard_page, { changeHash: false, reverse: true, transition: 'slide' });
    },

    conversationPage: function(event) {
      var conversation_id = $(event.target).data("id");
      var conversation_view = new ConversationView({
        model: this.collection.get(conversation_id),
        back: {
          slug: "my-councils",
          title: "My Councils"
        }
      });
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, transition: 'slide' });
      conversation_view.initPage();
    }

  });

  return MyCouncilsView;

});