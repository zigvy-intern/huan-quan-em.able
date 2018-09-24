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

    const INSERT_COURSE = Courses.insert({
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

    if (owner == this.userId) {      
      return INSERT_COURSE;
    }
    
    throw new Meteor.Error(403, "Not authorized");    
  },

  'courses.edit' (courseId, name, category, subCategory, subject, price, 
    level, size, desc, status, img, owner) {

    check(courseId, String)
    check(status, String);
    check(img, String);

    const UPDATE_COURSE = Courses.update(
      { _id: courseId },
      { 
        $set: {
          name: name,
          category: category,
          subCategory: subCategory,
          subject: subject,
          price: price,
          level: level,
          size: size,
          desc: desc,
          status: status,
          img: img,
          createdAt: new Date(),
        }
      }
    );

    if (Roles.userIsInRole(this.userId, ['admin'])) {      
      return UPDATE_COURSE;
    }

    if (owner == this.userId) {      
      return UPDATE_COURSE;
    }
    
    throw new Meteor.Error(403, "Not authorized");    
  },

  'courses.load' (courseNum) {
    check(courseNum, Number);
    const courses = Courses.find( {}, { limit: courseNum } ).fetch();

    return courses;
  },

  'courses.get' (courseId) {
    check(courseId, String);
    const result = Courses.findOne({ _id: courseId });
        
    return result;    
  },

  'courses.remove' (courseId, owner) {
    check(courseId, String);
    check(owner, String);

    if (Roles.userIsInRole(this.userId, ['admin'])) {      
      Courses.remove(courseId);
    }

    if (owner == this.userId) {      
      Courses.remove(courseId);      
    }
    
    throw new Meteor.Error(403, "Not authorized");
  }
});