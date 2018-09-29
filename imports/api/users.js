import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Accounts.onCreateUser((options, user) => {
  const customizedUser = Object.assign({
    roles: options.roles,
  }, user);
  return customizedUser;
});

Meteor.methods({
  'user.register'(data) {
    Accounts.createUser(data);
  },
})
