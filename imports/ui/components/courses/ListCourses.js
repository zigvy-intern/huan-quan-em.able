import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Courses } from '/imports/api/courses';
import Header from '../header/Header';
import List from './List';

class ListCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    this.renderCourse = this.renderCourse.bind(this);
  }

  renderCourse(course) {
    return <List key={course._id} course={course} />  
  }

  render() {
    const { search } = this.state;
    const filteredCourses = this.props.courses.filter(course => {
      return course.name.toLowerCase().indexOf( search.toLowerCase() ) !== -1
    })

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
          { filteredCourses.map(this.renderCourse) }
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

export default withTracker(() => {
  Meteor.subscribe('courses');

  return {
    courses: Courses.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(ListCourses);