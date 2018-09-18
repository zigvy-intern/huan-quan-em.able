import { Meteor } from 'meteor/meteor'
import forEach from 'lodash/foreach';
import { MongoClient } from 'mongodb';
import './courses';
import './media';

const uri = "mongodb+srv://emable1:9a9seMAVNKYWN0B4@em-able-utlze.mongodb.net/test?retryWrites=true"
MongoClient.connect(uri, { useNewUrlParser: true }, async function(err, client) {
  if(err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    return;
  }
  console.log('Connected...');
  const collection = client.db("testing1").collection("testing11");
  const r = await collection.insertOne({name: '123'});
  console.log('r', r);
  const testing11 = await collection.find().toArray();
  console.log('testing11', testing11);
  client.close();
}
);

//hehe

{/*if (Meteor.isServer) {
  Meteor.startup(() => {
    const users = [
      {name:"Normal1",email:"normal1@zigvy.com",roles:[]},
      {name:"Normal2",email:"normal2@zigvy.com",roles:[]},
      {name:"Admin1",email:"admin1@zigvy.com",roles:['admin']},
      {name:"Admin2",email:"admin2@zigvy.com",roles:['admin']}
    ];

    forEach(users, function (user) {
    const id = Accounts.createUser({
      email: user.email,
      password: "zigvy123",
      username: user.name
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }
    });
  });
}*/}