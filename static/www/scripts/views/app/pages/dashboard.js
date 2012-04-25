/**
 * views/app/pages/dashboard.js
 * Shows user their options
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'collections/texts',
  'views/app/conversation/conversation',
  'text!templates/app/pages/dashboard.mustache!strip'
  ], function ($, _, Backbone, Mustache, Texts, ConversationView, dashboard_template) {

  var DashboardView = Backbone.View.extend({

    initialize: function() {
      this.collection.on("reset", this.render, this);
      this.collection.on("add", this.render, this);
    },

    el: $("#dashboard-page"),

    initPage: function() {
      var _d = this;
      var a = _d.collection.fetch({
        data: {
          author: SpiritApp.User.get("id"),
          council_members: SpiritApp.User.get("id"),
          order_by: "date_created"
        }
      });
    },

    template: function(params) {
      return Mustache.to_html(dashboard_template, params);
    },

    events: {
      'click #logout-link' : 'logout',
      'click .content li'  : 'conversationPage'
    },

    render: function() {
      var data = this.prepareData();
      this.$(".header, .content").remove();
      this.$el.prepend(this.template(data));
      this.$el.page("destroy").page();
      return this;
    },

    prepareData: function() {
      var data = {
        user: SpiritApp.User.toJSON(),
        latest: {}
      };
      data.latest.new_texts = _.filter(this.collection.toJSON(), function(conversation) {
        return SpiritApp.User.get("id") == conversation.author.id;
      }).slice(0,2);
      data.latest.new_comments = _.filter(this.collection.toJSON(), function(conversation) {
        return _.any(conversation.council_members, function(council_member) {
          return SpiritApp.User.get("id") == council_member.id;
        })
      }).slice(0,2);
      return data;
    },

    logout: function() {
      $.ajax({
        type: "GET",
        url: CONFIG.ENDPOINT + "/auth/logout",
        success: function(response) {
          SpiritApp.User.trigger("logged_out");
        }
      })
    },

    conversationPage: function(e) {
      console.log($(e.currentTarget))
      var conversation_id = $(e.currentTarget).data("id");
      SpiritApp.App.views.conversation = new ConversationView({
        model: this.collection.get(conversation_id),
        collection: new Texts(),
        back: "dashboard"
      });
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, transition: 'slide' });
      SpiritApp.App.views.conversation.initPage();
      SpiritApp.App.updateFooter();
    }

  });

  return DashboardView;

});