import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  'user.register'(data) {
    Accounts.createUser({
      username: data.username,
      email: data.email,
      password: data.password,
      roles: roles,
    })
  },
})
