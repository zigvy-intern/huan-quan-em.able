import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Media = new Mongo.Collection('media');

if (Meteor.isServer) {
  Meteor.publish('media', function mediaPublication() {
    return Media.find();
  });
}

Meteor.methods({
  'media.insert' (img) {
    Media.insert({
      img,
      cover: false,
      createdAt: new Date(),      
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
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
    
    throw new Meteor.Error(403, "Not authorized");*/}
  },
  'media.cover'(mediaId) {
    check(mediaId, String);

    Media.update(
      { cover: true },
      { $set: { cover: false } }
    )

    Media.update(
      { _id: mediaId },
      { $set: { cover: true } }
    )
  }
});