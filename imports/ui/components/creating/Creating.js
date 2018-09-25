import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Media } from '/imports/api/media';
import Header from '/imports/ui/components/header/Header';
import Map from './Map';
import { Image } from './Media';
import { Requirement } from './Requirement';
import Popup from '../popup/Popup.js';
import Context from '../../../startup/client/index';
let temporaryStatus = '';

class Creating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      category: '',
      subCategory: '',
      subject: '',
      level: '',
      size: '',
      status: '',
      index: 0,
      shouldShowPopup: false,
    }
    this.uploadMedia = this.uploadMedia.bind(this);
    this.renderMedia = this.renderMedia.bind(this);
    this.createCourse = this.createCourse.bind(this)
    this.createLiveCourse = this.createLiveCourse.bind(this);
    this.createDraftCourse = this.createDraftCourse.bind(this);
    this.addRequirement = this.addRequirement.bind(this);
    this.renderRequirement = this.renderRequirement.bind(this);
    this.onChangeClose = this.onChangeClose.bind(this);
    this.onChangeModalPicture = this.onChangeModalPicture.bind(this);
  }

  uploadMedia() {
    cloudinary.openUploadWidget({
      cloud_name: 'rai3399', upload_preset: 'bdz2m5kq', tags: ['em.able']
    },
      (error, result) => {
        const img = `https://res.cloudinary.com/rai3399/image/upload/w_700,h_496,c_fill/${result[0].public_id}.jpg`;
        const cover = false;
        Meteor.call('media.insert', img, cover)
      }
    );
  }

  renderMedia() {
    return this.props.media.map((media) => (
      <Image key={media._id} media={media} retrieveSource={this.onChangeModalPicture} />
    ));
  }

  onChangeModalPicture(primitiveImgId) {
    const modalBox = document.getElementById("modal-img-review");
    modalBox.style.display = "flex";
    if (primitiveImgId != 'video') {
      if (document.getElementById('video-modal')) {
        modalBox.removeChild(modalBox.lastElementChild);
        const imgTag = document.createElement("img");
        imgTag.classList.add("modal-content");
        imgTag.src = document.getElementById(primitiveImgId).src;
        imgTag.setAttribute('id', 'img-modal');
        modalBox.appendChild(imgTag);
      } else {
        document.getElementById("img-modal").src = document.getElementById(primitiveImgId).src;
      }
    } else {
      modalBox.removeChild(modalBox.lastElementChild);
      const videoTag = document.createElement("video");
      videoTag.classList.add("modal-content");
      videoTag.src = document.getElementById("video-play").src;
      videoTag.setAttribute('controls', 'true');
      videoTag.setAttribute('id', 'video-modal');
      modalBox.appendChild(videoTag);
    }
  }

  onChangeClose() {
    document.getElementById("modal-img-review").style.display = "none";
  }

  addRequirement() {
    this.setState({
      index: this.state.index + 1
    })
  }

  renderRequirement() {
    let requirements = []
    for (let i = 1; i <= this.state.index; i++) {
      requirements.push(<Requirement key={`requirement${i}`} index={i} />)
    }
    return <div>{requirements}</div>
  }

  createLiveCourse() {
    temporaryStatus = 'live';
    return this.createCourse();
  }

  createDraftCourse() {
    temporaryStatus = 'draft';
    return this.createCourse();
  }

  createCourse() {
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();
    const desc = ReactDOM.findDOMNode(this.refs.descInput).value.trim();
    const status = temporaryStatus;
    const { category, subCategory, subject, level, size } = this.state;
    const img = this.props.media[0].img;

    let code = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 10; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length))
    };

    Meteor.call('courses.insert', name, category, subCategory, subject,
      price, level, size, desc, status, code, img)

    ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    ReactDOM.findDOMNode(this.refs.priceInput).value = '';
    ReactDOM.findDOMNode(this.refs.descInput).value = '';
    this.setState({
      shouldShowPopup: true,
      courseNameTemp: name,
      courseStatusTemp: status,
    })
    return <Popup />
  }

  render() {
    return (
      <div>
        <Header />
        <div className="banner">
          <div className="my-courses">
            <div>
              My Courses
            </div>
            <div>
              3 Categories &#8901; 6 Courses
            </div>
            <div></div>
          </div>
        </div>
        <div className="main">
          <div className="title light">Create new Course</div>
          <div className="flex-column component-wrapper">
            <div className="component flex-row align">
              <div className="blue-line"></div><div className="component-title gray8c flex-row">General Information</div>
            </div>
            <div className="info-wrapper-outside">
              <div className="info-wrapper flex-row align">
                <div className="info light">Course Name:</div>
                <input
                  className="detail bold"
                  type="text"
                  ref="nameInput"
                  placeholder="Add course's name"
                  required
                />
              </div>
            </div>
            <div className="flex-row space-between responsive-field-column">
              <div className="info-wrapper-outside set-height-custom" id="category">
                <div className="info-wrapper flex-row align space-between select-custom">
                  <div className="info light">Category:</div>
                  <select
                    className="flex-row space-between detail bold select-child-custom"
                    value={this.state.category}
                    onChange={(e) => this.setState({ category: e.target.value })}
                    required
                  >
                    <option>Music</option>
                    <option>Art</option>
                    <option>Coding</option>
                  </select>
                </div>
              </div>
              <div className="info-wrapper-outside set-height-custom" id="sub-category">
                <div className="info-wrapper flex-row align space-between select-custom" >
                  <div className="info light">Sub Category:</div>
                  <select
                    className="flex-row space-between detail bold select-child-custom"
                    value={this.state.subCategory}
                    onChange={(e) => this.setState({ subCategory: e.target.value })}
                    required
                  >
                    <option>Junior College</option>
                    <option>Public College</option>
                    <option>Private College</option>
                  </select>
                </div>
              </div>
              <div className="info-wrapper-outside set-height-custom" id="subject">
                <div className="info-wrapper flex-row align space-between select-custom" >
                  <div className="info light">Subject:</div>
                  <select
                    className="flex-row space-between detail bold select-child-custom"
                    value={this.state.subject}
                    onChange={(e) => this.setState({ subject: e.target.value })} required>
                    <option>English</option>
                    <option>History</option>
                    <option>Civic Education</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-row space-between responsive-field-column">
              <div className="info-wrapper-outside" id="fee">
                <div className="info-wrapper flex-row align space-between" >
                  <div className="flex-row align">
                    <div className="info light">Course fees:</div>
                    <input
                      className="blue-detail bold"
                      type="text"
                      ref="priceInput"
                      pattern="[0-9.]{0,}"
                      placeholder="145.00"
                      required
                    />
                  </div>
                  <div className="blue-detail bold">USD</div>
                </div>
              </div>
              <div className="info-wrapper-outside set-height-custom" id="level">
                <div className="info-wrapper flex-row align space-between select-custom" >
                  <div className="info light">Difficulty Level:</div>
                  <select
                    className="flex-row space-between detail bold select-child-custom"
                    value={this.state.level}
                    onChange={(e) => this.setState({ level: e.target.value })}
                    required
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              <div className="info-wrapper-outside set-height-custom" id="size">
                <div className="info-wrapper flex-row align space-between select-custom" >
                  <div className="info light">Class Size:</div>
                  <select
                    className="flex-row space-between detail bold select-child-custom"
                    value={this.state.size}
                    onChange={(e) => this.setState({ size: e.target.value })}
                    required
                  >
                    <option>10 People +</option>
                    <option>20 People +</option>
                    <option>30 People +</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="info-wrapper-outside">
              <div className="info-wrapper flex-column">
                <div className="info light">Course Description:</div>
                <input
                  className="desc"
                  type="text"
                  ref="descInput"
                  placeholder="Add course's description"
                  required
                />
              </div>
            </div>
          </div>
          <div className="dotted-line"></div>

          <div className="flex-column component-wrapper">
            <div className="component flex-row align">
              <div className="blue-line"></div><div className="component-title gray8c flex-row">Photo & Video</div>
            </div>
            <div className="media-component">
              {this.renderMedia()}
              <div className="img-wrapper flex-column">
                <div className="video" />
                <div className="flex-column center">
                  <video id='video-play' src="/video/test.mp4" className="cover-img">
                  </video>
                  <button onClick={() => this.onChangeModalPicture("video")} className="play-btn-wrapper">
                    <img className="play-btn" src="/icons/play.svg" alt="play" />
                  </button>
                </div>
                <button>
                  <span className="icon-delete delete-btn"></span>
                </button>
              </div>
              <div className="blank-img flex-column center">
                <button className="add-btn-wrapper">
                  <span onClick={this.uploadMedia} className="icon-add add-btn"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="dotted-line"></div>

          <div className="flex-column component-wrapper">
            <div className="component flex-row align">
              <div className="blue-line"></div><div className="component-title gray8c flex-row">Location</div>
            </div>
            <Map />
          </div>
          <div className="dotted-line"></div>

          <div className="flex-column component-wrapper">
            <div className="component flex-row align">
              <div className="blue-line"></div><div className="component-title gray8c flex-row">Requirements</div>
            </div>

            {this.renderRequirement()}

            <button onClick={this.addRequirement} className="requi-add-wrapper flex-row align">
              <img className="info add-btn" src="/icons/add.svg" alt="cover" />
              <div className="requi-add">Add a new field</div>
            </button>
          </div>

          <div className="bottom flex-row center">
            <Context.Consumer>
              {
                context => (
                  <Fragment>
                    <button
                      onClick={() => {
                        this.createLiveCourse();
                        context.changeNotiNum(context.notiNum + 1);
                      }}
                      className="bottom-btn bold"
                      id="bottom-btn1">
                      Create
                  </button>
                    <button
                      onClick={() => {
                        this.createDraftCourse();
                        context.changeNotiNum(context.notiNum + 1);
                      }}
                      className="bottom-btn bold"
                      id="bottom-btn2">
                      Save as draft
                  </button>
                  </Fragment>
                )
              }
            </Context.Consumer>
          </div>
        </div>
        <div id="modal-img-review" className="modal">
          <span onClick={() => this.onChangeClose()} className="close">&times;</span>
          <img className="modal-content" id="img-modal" />
        </div>
        {this.state.shouldShowPopup && <Popup courseName={this.state.courseNameTemp} status={this.state.courseStatusTemp} option="create" />}
      </div>
    )
  }
}



export default withTracker(() => {
  Meteor.subscribe('media');

  return {
    media: Media.find({}, { sort: { cover: -1, createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(Creating);