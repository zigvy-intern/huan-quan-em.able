import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Courses } from '/imports/api/courses';
import Header from '../header/Header';

class ListCourses extends Component {
  constructor(props) {
    super(props);
    this.renderCourse = this.renderCourse.bind(this);
  }

  renderCourse() {
    return this.props.courses.map((course) => {
      <ListCourse key={course._id} course={course} />
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="description-wrapper">
          <div className="description">
            <div className="des-child">
              <p>
                This page contains all your course created listings. You can edit or delete your existing course listings.
                All course listings will be reviewed by Em.able comittee before course listings can be published, during
                which will appear as pending for approval.
                </p>
            </div>
            <div className="des-button">
              <button>
                <Link className="add-new-course" to="/creating">
                  <span className="icon-add"></span>
                  <span>create a new course</span>
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="title-wrapper">
          <div className="title-list">
            <div className="child">
              Photo
              </div>
            <div className="child">
              Course name
              </div>
            <div className="child">
              category
              </div>
            <div className="child">
              creator/date
              </div>
            <div className="child">
              status
              </div>
            <div className="child">
              slot(s)
              </div>
            <div className="child">
              Actions
              </div>
          </div>
        </div>

        <div className="course-list">
          {this.renderCourse()}
        </div>

        <div className="loading-wrapper">
          <div className="loading">
            <span className="icon-loading"></span> <span>Loading more Courses...</span>
          </div>
        </div>
      </div>
    )
  }
}

class ListCourse extends Component {
  render() {
    const { course } = this.props;
    return (
      <div className="course">
        <div className="child course-pic">
          <div>
          </div>
        </div>
        <div className="child course-des">
          <div>
            <div className="des">
              {course.name}
            </div>
            <div className="code">
              Code: {course.code}
            </div>
          </div>
        </div>
        <div className="child category">
          <p>
            {course.category}
          </p>
        </div>
        <div className="child creator">
          <div>
            <div className="creator-ava">
              <div>
                <img src="/img/creator-avatar.jpg" alt="" />
              </div>
            </div>
            <div className="creator-details">
              <div className="creator-name">
                {course.owner}
              </div>
              <div className="creator-date">
                2 weeks ago
                </div>
            </div>
          </div>
        </div>
        <div className="child status">
          <p className={`status-wrapper ${course.status}`}>
            {course.status}
          </p>
        </div>
        <div className="child slot">
          <div className="slot-number">
            <p>
              0
              </p>
          </div>
        </div>
        <div className="child icon-edit-remove">
          <div>
            <div className="edit">
              <span className="icon-edit"></span>
            </div>
            <div></div>
            <div className="remove">
              <span className="icon-delete"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('courses');

  return {
    courses: Courses.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(ListCourses);