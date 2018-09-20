
import { MongoClient } from 'mongodb';
import { Meteor } from 'meteor/meteor';
import './courses';
import './media';
import forEach from 'lodash/forEach';

{/*const uri = "mongodb+srv://emable1:DFJk78MEUlnsBrVl@em-able-utlze.mongodb.net/test?retryWrites=true";

MongoClient.connect(uri, { useNewUrlParser: true }, async function (err, client) {
  if (err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    return;
  }
  console.log('Connected...');
  const collection = client.db("em-ableDB");
  const courseTbl = await collection.collection("courseTbl").find().toArray();
  const mediaTbl = await collection.collection("mediaTbl").find().toArray();
  console.log('courseTbl', courseTbl);
  console.log('mediaTbl', mediaTbl);
  client.close();
}
);*/}

// if (Meteor.isServer) {
//   Meteor.startup(() => {
//     const users = [
//       { name: "Normal1", email: "normal1@zigvy.com", roles: [] },
//       { name: "Normal2", email: "normal2@zigvy.com", roles: [] },
//       { name: "Admin1", email: "admin1@zigvy.com", roles: ['admin'] },
//       { name: "Admin2", email: "admin2@zigvy.com", roles: ['admin'] }
//     ];

//     forEach(users, function (user) {
//       const id = Accounts.createUser({
//         email: user.email,
//         password: "zigvy123",
//         username: user.name
//       });

//       if (user.roles.length > 0) {
//         Roles.addUsersToRoles(id, user.roles);
//       }
//     });
//   });
// }
