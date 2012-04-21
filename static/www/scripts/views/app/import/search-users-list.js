/**
 * views/app/import/search-users-list.js
 * 
 */

define([
  'jQuery',
  'underscore',
  'Backbone',
  'Mustache',
  'models/user',
  'collections/users',
  'views/app/user',
  'text!templates/app/import/search-users-list.mustache'
  ], function ($, _, Backbone, Mustache, User, Users, UserView, search_users_list_template) {

  var SearchUsersListView = Backbone.View.extend({

    initialize: function() {
      this.collections = {};
      this.collections.app_users = new Users();
      this.collections.contacts = new Users();
      this.collections.app_users.on("reset", this.render, this);
      this.collections.contacts.on("reset", this.render, this);
    },

    template: function(params) {
      return Mustache.to_html(search_users_list_template, params);
    },

    events: {
      'click a' : 'chooseUser'
    },

    render: function() {
      var data = this.prepareData();
      this.$el.html(this.template(data));
      this.$el.listview("refresh");
      return this;
    },

    prepareData: function() {
      var _sul = this;
      var app_users = _.map(this.collections.app_users.toJSON(), function(app_user) {
        app_user.in_council = _.any(_sul.model.get("council_members"), function(council_member) {
          return council_member.id == app_user.id;
        });
        return app_user;
      });
      var data = {
        app_users: app_users,
        contacts: this.collections.contacts.toJSON()
      };
      return data;
    },

    searchUsers: function(query) {
      var _sul = this;
      if (query.length >= 3) {
        $.ajax({
          type: "GET",
          url: CONFIG.ENDPOINT + "/auth/search",
          data: {
            q: query
          },
          success: function(data) {
            var users = [];
            _.each(data, function(user) {
              users.push(new User(user));
            });
            _sul.collections.app_users.reset(users);
          }
        })
      } else {
        _sul.collections.app_users.reset();
      }
      return false;
    },

    searchContacts: function(query) {
      if (!CONFIG.DEV) {
        var options = new ContactFindOptions();
        options.filter = query;
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields, function(contacts) {
          alert(contacts)
          console.log(contacts);
        }, function(error) {
          console.error(error);
        }, options);
      }
    },

    chooseUser: function(e) {
      var user_id = $(e.target).data("id");
      var collection = $(e.target).data("collection");
      SpiritApp.App.views.user = new UserView({
        model: this.collections[collection].get(user_id),
        action: "council-member",
        conversation: this.model
      });
      var user_page = $("#user-page");
      $.mobile.changePage(user_page, { changeHash: false, transition: 'slide' });
      SpiritApp.App.views.user.initPage();
    }

  });

  return SearchUsersListView;

});