import React, { Component, Fragment } from "react";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LoginPopup from '../popup/LoginPopup';
import ErrorPopup from '../popup/ErrorPopup';
import Popup from '../popup/Popup';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupLogin: false,
      isError: false,
      isSucceed: false,
      errMess: '',
      scMess: '',
    }
  }

  handleModal = () => {
    this.setState(prevState => ({ isPopupLogin: !prevState.isPopupLogin }));
  }

  closeModal = () => {
    this.setState({ isPopupLogin: false })
  }

  deleteCourse() {
    Meteor.call('courses.remove', this.props.course._id, this.props.course.owner, (err, result) => {
      if (err) {
        this.setState(prevState => ({
          isSucceed: !prevState.isSucceed,
          scMess: 'You have delete a course!'
        }));
      } else {
        this.setState(prevState => ({
          isError: !prevState.isError,
          errMess: 'You have no authorize to do this action!'
        }));
      }
    });

  }

  render() {
    const { course } = this.props;
    const { isPopupLogin, isError, errMess, isSucceed, scMess } = this.state;
    const time = moment(course.createdAt).fromNow();
    return (
      <Fragment>
        <div className="child">
          <div className="course-card">
            <div className="course-pic-card container">
              <img className="image" src={course.img} alt="" />
              <div className={`${course.status}-card`}>
                <p>{course.status}</p>
              </div>
              {
                Meteor.user() ?
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
                  :
                  <div className="middle">
                    <div className="child">
                      <span onClick={this.handleModal} className="icon-edit on-hover-white"></span>
                    </div>
                    <div className="child"></div>
                    <div onClick={this.handleModal} className="child">
                      <span className="icon-delete on-hover-white"></span>
                    </div>
                  </div>
              }
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
        {isPopupLogin &&
          <LoginPopup closeModal={this.closeModal} />
        }
        {
          isError &&
          <ErrorPopup closeModal={this.closeModal} message={errMess} />
        }
        {
          isSucceed &&
          <Popup closeModal={this.closeModal} message={scMess} />
        }
      </Fragment>
    )
  }
}