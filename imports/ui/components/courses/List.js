import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class List extends Component {
  deleteCourse() {
    Meteor.call('courses.remove', this.props.course._id, this.props.course.owner)
  }

  render() {
    const { course } = this.props;
    const time = moment(course.createdAt).fromNow();

    return (
      <div className="course">
        <div className="child">
          <img className="course-pic" src={course.img} alt={course.name} />
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
                {course.username}
              </div>
              <div className="creator-date">
                {time}
              </div>
            </div>
          </div>
        </div>
        <div className="child status">
          <p className={`status-wrapper draft ${course.status}`}>
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
              <Link className="icon-edit" to={`/courses-list/${course._id}`}></Link>
            </div>
            <div></div>
            <div onClick={this.deleteCourse.bind(this)} className="remove">
              <span className="icon-delete-gray"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}