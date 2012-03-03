/**
 * views/app/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'text!templates/app/conversation.mustache!strip'
  ], function ($, _, Backbone, Mustache, conversation_template) {

  SpiritApp.Pages.ConversationView = Backbone.View.extend({

    template: function(params) {
      return Mustache.to_html(conversation_template, params);
    },

    events: {
      'click #link-my-conversations' : 'myConversations'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    myConversations: function() {
      var myConversationsView = new SpiritApp.Pages.MyConversationsView;
      var page = myConversationsView.render().$el;
      $.mobile.pageContainer.append(page);
      $.mobile.changePage(page, { role: 'page', reverse: true, transition: 'slide' });
    }

  });

  return SpiritApp.Pages.ConversationView;

});