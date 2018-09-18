import React, { Component } from "react";


export default class Card extends Component {
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