/**
 * views/app/import/add-council-members.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'views/app/import/search-users-list',
  'text!templates/app/import/add-council-members.mustache!strip'
  ], function ($, _, Backbone, Mustache, SearchUsersListView, add_council_members_template) {

  var AddCouncilMembersView = Backbone.View.extend({

    el: $("#add-council-members-page"),

    initialize: function() {
      this.views = {};
    },

    initPage: function() {
      this.render();
      return this;
    },

    template: function(params) {
      return Mustache.to_html(add_council_members_template, params);
    },

    events: {
      'click #link-back'    : 'navBack',
      'keyup #search-query' : 'searchUsers'
    },

    render: function() {
      this.$(".header, .content").remove();
      this.$el.prepend(this.template());
      this.views.search_users_list = new SearchUsersListView({
        el: this.$("#search-users-list"),
        model: this.model
      });
      this.$el.page("destroy").page();
      return this;
    },

    navBack: function() {
      var conversation_page = $("#conversation-page");
      $.mobile.changePage(conversation_page, { changeHash: false, reverse: true, transition: 'slide' });
    },

    searchUsers: function(e) {
      var query = this.$("#search-query").val();
      this.views.search_users_list.searchUsers(query);
      this.views.search_users_list.searchContacts(query);
    }

  });

  return AddCouncilMembersView;

});