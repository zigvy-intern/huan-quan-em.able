import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Courses } from '/imports/api/courses';
import Header from '../header/Header';

class ListCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    this.renderCourse = this.renderCourse.bind(this);
  }

  renderCourse(course) {
    return <ListCourse key={course._id} course={course} />  
  }

  render() {
    const { search } = this.state;
    const filteredCourses = this.props.courses.filter(course => {
      return course.name.toLowerCase().indexOf( search.toLowerCase() ) !== -1
    })

    return (
      <div>
        <Header />
        <div className="main">
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
                  <span className="icon-add"></span> 
                  <span>create a new course</span>
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

          { filteredCourses.map(this.renderCourse) }  
          
          <div className="loading-wrapper">
            <div className="loading">
              <span className="icon-loading"></span> <span>Loading more Courses...</span>
            </div>
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
      <div className="course-list">
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
      </div>
    )
  }
}

class CardCourse extends Component {
  render() {
    const { course } = this.props;

    return (      
      <div className="card-list">
        <div className="card-wrapper">
          <div className="card-column">
            <div className="child">
              <div className="course-card">
                <div className="course-pic-card container">
                  <img className="image" src={course.img} alt="" />
                  <div className="draft-card">
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
                        {course.owner}
                      </div>
                      <div className="creator-date">
                        2 weeks ago
                      </div>
                    </div>
                  </div>
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
})(ListCourses);