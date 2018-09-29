import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LoginPopup from '../popup/LoginPopup';
import ErrorPopup from '../popup/ErrorPopup';
import Popup from '../popup/Popup';

export default class List extends Component {
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

  handleModal = () => {
    this.setState(prevState => ({ isPopupLogin: !prevState.isPopupLogin }));
  }

  closeModal = () => {
    this.setState({ isPopupLogin: false })
  }

  render() {
    const { course } = this.props;
    const { isPopupLogin, isError, errMess, isSucceed, scMess } = this.state;

    const time = moment(course.createdAt).fromNow();
    return (
      <Fragment>
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
            {
              Meteor.user() ?
                <div>
                  <div className="edit">
                    <Link to={`/courses-list/${course._id}`}>
                      <span className="icon-edit on-hover-gray"></span>
                    </Link>
                  </div>
                  <div></div>
                  <div onClick={this.deleteCourse.bind(this)} className="remove">
                    <span className="icon-delete on-hover-gray"></span>
                  </div>
                </div>
                :
                <div>
                  <div className="edit">
                    <span onClick={this.handleModal} className="icon-edit on-hover-gray"></span>
                  </div>
                  <div></div>
                  <div className="remove">
                    <span onClick={this.handleModal} className="icon-delete on-hover-gray"></span>
                  </div>
                </div>
            }
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