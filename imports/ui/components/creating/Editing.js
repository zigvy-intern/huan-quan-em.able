import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Media } from '/imports/api/media';
import Header from '/imports/ui/components/header/Header';
import Map from './Map';
import { Image } from './Media'
import { Requirement } from './Requirement';
import Popup from '../popup/Popup.js';

class Editing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      course: null,
      courseId: null
    }   
    this.renderEditing = this.renderEditing.bind(this); 
  }

  componentDidMount() {
    const courseId = this.props.match.params.id;
    this.setState({
      courseId: courseId
    })
    
    Meteor.call('courses.get', courseId, (error, course) => {
      const result = {
        course, error: null,
      }
      if (error) {
        result.error = error;
      } else {
        result.course = course
      }
      this.setState({
        ...result
      });         
    });
  }

  renderEditing() {
    const { courseId, course, error } = this.state;

    return course ? 
      <RenderEditing 
        key={course._id} course={course}
        courseId={courseId}
        media={this.props.media}
        username={this.props.username}         
      /> 
      : null
  }

  render() {
    return <div>{this.renderEditing()}</div>
  }
}

let temporaryStatus = '';

class RenderEditing extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: this.props.course.name,
      price: this.props.course.price,
      desc: this.props.course.desc,
      img: '',
      category: '',
      subCategory: '',
      subject: '',
      level: '',
      size: '',
      index: 0,
      shouldShowPopup: false,
      courseStatusTemp: '',
    }
    this.uploadMedia = this.uploadMedia.bind(this);
    this.renderMedia = this.renderMedia.bind(this);
    this.editLiveCourse = this.editLiveCourse.bind(this);
    this.editDraftCourse = this.editDraftCourse.bind(this);
    this.editCourse = this.editCourse.bind(this);
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
      <Image key={media._id} media={media} />
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

  editLiveCourse() {
    temporaryStatus = 'live';

    return this.editCourse();
  }

  editDraftCourse() {
    temporaryStatus = 'draft';

    return this.editCourse();
  }

  editCourse() {
    let name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    let price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();
    let desc = ReactDOM.findDOMNode(this.refs.descInput).value.trim();
   
    if (name === '') {
      name = this.state.name
    }    
    if (price === '') {
      price = this.state.price
    }    
    if (desc === '') {
      desc = this.state.desc
    }
      
    const { courseId, owner } = this.props;
    const status = temporaryStatus;
    const { category, subCategory, subject, level, size } = this.state;
    const img = this.props.media[0].img;

    Meteor.call('courses.edit', courseId, name, category, subCategory, subject,
      price, level, size, desc, status, img, owner)

    ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    ReactDOM.findDOMNode(this.refs.priceInput).value = '';
    ReactDOM.findDOMNode(this.refs.descInput).value = '';
    this.setState({
      shouldShowPopup: true,
      courseStatusTemp: temporaryStatus,
    })
  }

  render() {
    const { course } = this.props;

    return (
      <div>
        <Header />
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
                  placeholder={course.name}
                  required
                />
              </div>
            </div>
            <div className="flex-row space-between">
              <div className="info-wrapper-outside" id="category">
                <div className="info-wrapper flex-row align space-between">
                  <div className="info light">Category:</div>
                  <select
                    className="flex-row space-between detail bold"
                    value={this.state.category}
                    placeholder={course.category}
                    onChange={(e) => this.setState({ category: e.target.value })}
                    required
                  >
                    <option>{course.category}</option>
                    <option>Music</option>
                    <option>Art</option>
                    <option>Coding</option>
                  </select>
                </div>
              </div>
              <div className="info-wrapper-outside" id="sub-category">
                <div className="info-wrapper flex-row align space-between" >
                  <div className="info light">Sub Category:</div>
                  <select
                    className="flex-row space-between detail bold"
                    value={this.state.subCategory}
                    placeholder={course.subCategory}
                    onChange={(e) => this.setState({ subCategory: e.target.value })}
                    required
                  >
                    <option>{course.subCategory}</option>
                    <option>Junior College</option>
                    <option>Public College</option>
                    <option>Private College</option>
                  </select>
                </div>
              </div>
              <div className="info-wrapper-outside" id="subject">
                <div className="info-wrapper flex-row align space-between" >
                  <div className="info light">Subject:</div>
                  <select
                    className="flex-row space-between detail bold"
                    value={this.state.subject}
                    placeholder={course.subject}
                    onChange={(e) => this.setState({ subject: e.target.value })}
                    required
                  >
                    <option>{course.subject}</option>
                    <option>English</option>
                    <option>History</option>
                    <option>Civic Education</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-row space-between">
              <div className="info-wrapper-outside" id="fee">
                <div className="info-wrapper flex-row align space-between" >
                  <div className="flex-row align">
                    <div className="info light">Course fees:</div>
                    <input
                      className="blue-detail bold"
                      type="text"
                      ref="priceInput"
                      pattern="[0-9.]{0,}"
                      placeholder={course.price}
                      required
                    />
                  </div>
                  <div className="blue-detail bold">USD</div>
                </div>
              </div>
              <div className="info-wrapper-outside" id="level">
                <div className="info-wrapper flex-row align space-between" >
                  <div className="info light">Difficulty Level:</div>
                  <select
                    className="flex-row space-between detail bold"
                    value={this.state.level}
                    placeholder={course.level}
                    onChange={(e) => this.setState({ level: e.target.value })}
                    required
                  >
                    <option>{course.level}</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              <div className="info-wrapper-outside" id="size">
                <div className="info-wrapper flex-row align space-between" >
                  <div className="info light">Class Size:</div>
                  <select
                    className="flex-row space-between detail bold"
                    value={this.state.size}
                    placeholder={course.size}
                    onChange={(e) => this.setState({ size: e.target.value })}
                    required
                  >
                    <option>{course.size}</option>
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
                  placeholder={course.desc}
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
            <button
              onClick={this.editLiveCourse}
              className="bottom-btn bold"
              id="bottom-btn1"
            >
              Edit
            </button>
            <button
              onClick={this.editDraftCourse}
              className="bottom-btn bold"
              id="bottom-btn2"
            >
              Save as draft
            </button>
          </div>
        </div>
        {this.state.shouldShowPopup && <Popup courseName={this.state.name} status={this.state.courseStatusTemp} option="update" />}
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
})(Editing);