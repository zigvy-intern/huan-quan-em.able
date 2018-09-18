import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Courses = new Mongo.Collection('courses');

if (Meteor.isServer) {
  Meteor.publish('courses', function coursesPublication() {
    return Courses.find();
  });
}

Meteor.methods({
  'courses.insert' (name, category, subCategory, subject, price, 
                    level, size, desc, status, code, img) {
    check(name, String);
    check(category, String);
    check(subCategory, String);
    check(subject, String);
    check(price, String);
    check(level, String);
    check(size, String);
    check(desc, String);
    check(status, String);
    check(code, String);
    check(img, String);

    if (!this.userId) {
      throw new Meteor.Error(403, "Not authorized");
    }

    Courses.insert({
      name,
      category,
      subCategory,
      subject,
      price,
      level,
      size,
      desc,
      status,
      code,
      img,
      createdAt: new Date(),      
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
});