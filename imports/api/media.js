import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { MongoClient } from 'mongodb';

{/*const uri = "mongodb+srv://emable1:DFJk78MEUlnsBrVl@em-able-utlze.mongodb.net/test?retryWrites=true";

MongoClient.connect(uri, { useNewUrlParser: true }, async function(err, client) {
  if(err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    return;
  }

  console.log('Connected...');
  export const Media = client.db("em-able").collection("media");

  if (Meteor.isServer) {
    Meteor.publish('media', function mediaPublication() {
      return Media.find();
    });
  }
  
  Meteor.methods({
    'media.insert' (img) {
      Media.insert({
        img,
        createdAt: new Date(),      
        //owner: this.userId,
        //username: Meteor.users.findOne(this.userId).username,
      });
    },
    'media.remove'(mediaId) {
      check(mediaId, String);
  
      Media.remove(mediaId)
      //check(owner, String);
  
      {/*if (Roles.userIsInRole(this.userId, ['admin'])) {      
        Comments.remove(matchId);
      }
  
      if (owner == this.userId) {      
        Comments.remove(matchId);      
      }
      
      throw new Meteor.Error(403, "Not authorized");
    },
  });
}
);*/}
