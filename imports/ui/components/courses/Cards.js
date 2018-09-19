import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Courses } from '/imports/api/courses';
import Header from '../header/Header';
import Card from './Card';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    this.renderCourse = this.renderCourse.bind(this);
  }

  renderCourse(course) {
    return <Card key={course._id} course={course} />
  }

  render() {
    const { search } = this.state;
    const filteredCourses = this.props.courses.filter(course => {
      return course.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
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

        <div className="card-list">
          <div className="card-wrapper">
            <div className="card-column">
              {filteredCourses.map(this.renderCourse)}
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
})(Cards);