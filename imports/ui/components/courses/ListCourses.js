import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

import { Courses } from '/imports/api/courses';
import Header from '../header/Header';
import List from './List';

class ListCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      items: 5,
    };
    this.loadMoreCourses = this.loadMoreCourses.bind(this);
    this.renderCourse = this.renderCourse.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  loadMoreCourses() {
    setTimeout(() => {
      this.setState({
        items: this.state.items + 5
      });
    }, 1500);
  };

  renderCourse(course) {
    return <List key={course._id} course={course} />;
  }

  handleSearch(SEARCH_INPUT) {
    if (SEARCH_INPUT == undefined) {
      return; 
    }
    this.setState(
      SEARCH_INPUT
    )
  }

  render() {
    const { search } = this.state;
    const FILTERED_COURSES = this.props.courses.filter(course => {
      return course.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    
    const LOADER = (
      <div className="loading-wrapper">          
        <div className="loading">
          <span className="icon-loading"></span> <span>Loading more Courses...</span>
        </div>                   
      </div>
    );

    return (
      <div>
        <Header handleSearch={this.handleSearch} />
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
        <InfiniteScroll
          dataLength={this.state.items}
          next={this.loadMoreCourses}
          hasMore={true}
          loader={LOADER}
        >
          <div className="course-list">
            {FILTERED_COURSES.slice(0, this.state.items).map(this.renderCourse)}
          </div>     
        </InfiniteScroll>
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