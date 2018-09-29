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
  'courses.insert'(name, category, subCategory, subject, price,
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
  'courses.edit'(courseId, name, category, subCategory, subject, price,
    level, size, desc, status, img) {
    check(courseId, String)
    check(status, String);
    check(img, String);

    if (!this.userId) {
      throw new Meteor.Error(403, "Not authorized");
    }

    Courses.update(
      { _id: courseId },
      {
        name: name,
        category: category,
        subCategory: subCategory,
        subject: subject,
        price: price,
        level: level,
        size: size,
        desc: desc,
        status: status,
        img: img
      }
    );
  },
  'courses.get'(courseId) {
    check(courseId, String);
    const result = Courses.findOne({ _id: courseId });

    return result;
  },
  'courses.remove'(courseId, owner) {
    check(courseId, String);
    check(owner, String);

    if (Roles.userIsInRole(Meteor.user()._id, ['admin']) || owner == Meteor.user()._id) {
      Courses.remove(courseId);
    }
  }
});