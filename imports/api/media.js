import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { MongoClient } from 'mongodb';

export const Media = new Mongo.Collection('media');

if (Meteor.isServer) {
  Meteor.publish('media', function mediaPublication() {
    return Media.find();
  });
}

Meteor.methods({
  'media.insert' (img, cover) {
    Media.insert({
      img,
      cover,
      createdAt: new Date(),      
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'media.setCover' (coverId) {
    Media.update(
      { cover: true },
      { $set: { cover: false } }
    );
    Media.update(
      { _id: coverId },
      { $set: { cover: true } }
    )
  },
  'media.remove'(mediaId, owner) {
    check(mediaId, String);
    check(owner, String);

    if (Roles.userIsInRole(this.userId, ['admin'])) {      
      Media.remove(mediaId);
    }

    if (owner == this.userId) {      
      Media.remove(mediaId);      
    }
    
    throw new Meteor.Error(403, "Not authorized");
  },
});
