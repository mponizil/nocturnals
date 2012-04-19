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
  'text!templates/app/import/search-users-list.mustache'
  ], function ($, _, Backbone, Mustache, User, Users, search_users_list_template) {

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

    render: function() {
      var data = this.prepareData();
      this.$el.html(this.template(data));
      this.$el.listview("refresh");
      return this;
    },

    prepareData: function() {
      var data = {
        app_users: this.collections.app_users.toJSON(),
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
        _sul.collection.app_users.reset();
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
    }

  });

  return SearchUsersListView;

});