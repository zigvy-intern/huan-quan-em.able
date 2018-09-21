
import { Meteor } from 'meteor/meteor';
import forEach from 'lodash/forEach';
import './courses';
import './media';

// if (Meteor.isServer) {
//   Meteor.startup(() => {
//     const users = [
//       {name:"Normal1",email:"normal1@zigvy.com",roles:[]},
//       {name:"Normal2",email:"normal2@zigvy.com",roles:[]},
//       {name:"Admin1",email:"admin1@zigvy.com",roles:['admin']},
//       {name:"Admin2",email:"admin2@zigvy.com",roles:['admin']}
//     ];

//     forEach(users, function (user) {
//     const id = Accounts.createUser({
//       email: user.email,
//       password: "zigvy123",
//       username: user.name
//     });

//     if (user.roles.length > 0) {
//       Roles.addUsersToRoles(id, user.roles);
//     }
//     });
//   });
// }