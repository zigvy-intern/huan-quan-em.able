import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Courses } from '/imports/api/courses';
import Header from '../header/Header';

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

        <div className="card-list">
          <div className="card-wrapper">
            <div className="card-column">
              { filteredCourses.map(this.renderCourse) }
            </div>
          </div>
        </div>
      </div >
    )
  }
}

class Card extends Component {
  render() {
    const { course } = this.props;

    return (
      <div className="child">
        <div className="course-card">
          <div className="course-pic-card container">
            <img className="image" src={course.img} alt="" />
            <div className={`${course.status}-card`}>
              <p>{course.status}</p>
            </div>
            <div className="middle">
              <div className="child">
                <span className="icon-edit"></span>
              </div>
              <div className="child"></div>
              <div className="child">
                <span className="icon-delete"></span>
              </div>
            </div>
          </div>
          <div className="course-des-card des">
            {course.name}
          </div>
          <div className="course-cate-card category">
            {course.category}
          </div>
          <div className="creator">
            <div>
              <div className="creator-ava">
                <div>
                  <img src="./img/creator-avatar.jpg" alt="" />
                </div>
              </div>
              <div className="creator-details">
                <div className="creator-name">
                  {course.username}
                </div>
                <div className="creator-date">
                  2 weeks ago
                </div>
              </div>
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