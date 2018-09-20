import React, { Component } from "react";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Card extends Component {
  deleteCourse() {
    Meteor.call('courses.remove', this.props.course._id, this.props.course.owner)
  }

  render() {
    const { course } = this.props;
    const time = moment(course.createdAt).fromNow();

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
                <Link to={`/courses-list/${course._id}`}>
                  <span className="icon-edit on-hover-white"></span>
                </Link>
              </div>
              <div className="child"></div>
              <div onClick={this.deleteCourse.bind(this)} className="child">
                <span className="icon-delete on-hover-white"></span>
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
                  {time}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}