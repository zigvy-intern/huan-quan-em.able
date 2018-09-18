import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import axios from 'axios';

import { Media } from '/imports/api/media';
import Header from '/imports/ui/components/header/Header';
import Map from './Map';

class Creating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      index: 0
    }
    this.uploadMedia = this.uploadMedia.bind(this);
    this.renderMedia = this.renderMedia.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.addRequirement = this.addRequirement.bind(this);
  }

  uploadMedia() {
    cloudinary.openUploadWidget({
      cloud_name: 'rai3399', upload_preset: 'bdz2m5kq', tags: ['em.able']
    },
      (error, result) => {
        const img = `https://res.cloudinary.com/rai3399/image/upload/w_700,h_496,c_fill/${result[0].public_id}.jpg`
        console.log(img)
        Meteor.call('media.insert', img)
      }
    );
  }

  renderMedia() {
    return this.props.media.map((media) => (
      <Image key={media._id} media={media} />
    ));
  }


  addRequirement() {
    this.setState({
      index: this.state.index + 1
    })
  }

  createCourse(e) {
    e.preventDefault();
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();
    const desc = ReactDOM.findDOMNode(this.refs.descInput).value.trim();


    ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    ReactDOM.findDOMNode(this.refs.priceInput).value = '';
    ReactDOM.findDOMNode(this.refs.descInput).value = '';
  }

  render() {
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
                  placeholder="Add course's name"
                  required
                />
              </div>
            </div>
            <div className="flex-row space-between">
              <div className="info-wrapper-outside" id="category">
                <div className="info-wrapper flex-row align space-between">
                  <div className="info light">Category:</div>
                  <select className="flex-row space-between detail bold">
                    <option>Music</option>
                    <option>Art</option>
                    <option>Coding</option>
                  </select>
                </div>
              </div>
              <div className="info-wrapper-outside" id="sub-category">
                <div className="info-wrapper flex-row align space-between" >
                  <div className="info light">Sub Category:</div>
                  <select className="flex-row space-between detail bold">
                    <option>Junior College</option>
                    <option>Public College</option>
                    <option>Private College</option>
                  </select>
                </div>
              </div>
              <div className="info-wrapper-outside" id="subject">
                <div className="info-wrapper flex-row align space-between">
                  <div className="info light">Subject:</div>
                  <select className="flex-row space-between detail bold">
                    <option>English</option>
                    <option>History</option>
                    <option>Civic Education</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-row space-between">
              <div className="info-wrapper-outside" id="fee">
                <div className="info-wrapper flex-row align space-between">
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
              <div className="info-wrapper-outside" id="level">
                <div className="info-wrapper flex-row align space-between">
                  <div className="info light">Difficulty Level:</div>
                  <select className="flex-row space-between detail bold">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              <div className="info-wrapper-outside" id="size">
                <div className="info-wrapper flex-row align space-between">
                  <div className="info light">Class Size:</div>
                  <select className="flex-row space-between detail bold">
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
              <div className="img-wrapper flex-column" id="img-cover">
                <img className="cover-img" src="/img/demo1.jpg" alt="cover" />
                <button>
                  <span className="icon-delete delete-btn"></span>
                </button>
                <div className="img-action">Cover</div>
              </div>
              <div className="img-wrapper flex-column">
                <img className="cover-img" src="/img/demo2.jpg" alt="cover" />
                <button>
                  <span className="icon-delete delete-btn" />
                </button>
                <div className="img-action">Set as Cover</div>
              </div>
              <div className="img-wrapper flex-column">
                <div className="flex-column center">
                  <div className="video"></div>
                  <img className="cover-img" src="/img/demo2.jpg" alt="cover" />
                  <button className="play-btn-wrapper">
                    <img className="play-btn" src="/icons/play.svg" alt="play" />
                  </button>
                </div>
                <button><span className="icon-delete delete-btn"></span></button>
              </div>
              {this.renderMedia()}
              <div className="blank-img flex-column center">
                <button className="add-btn-wrapper">
                  <span onClick={this.uploadMedia} className="add-btn" className="icon-add-blue"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="dotted-line"></div>

          <div className="flex-column component-wrapper">
            <div className="component flex-row align">
              <div className="blue-line"></div><div className="component-title gray8c flex-row">Location</div>
            </div>
            <div className="info-wrapper flex-row align space-between">
              <div className="flex-row align">
                <div className="info light">Address:</div>
                <div className="detail bold"></div>
              </div>
              <button>
                <span className="icon-send send-btn"></span>
              </button>
            </div>
            <div className="map">
              <Map />
            </div>
          </div>
          <div className="dotted-line"></div>

          <div className="flex-column component-wrapper">
            <div className="component flex-row align">
              <div className="blue-line"></div><div className="component-title gray8c flex-row">Requirements</div>
            </div>
            <div className="requi-wrapper flex-row align">
              <div className="info light">1:</div>
              <div className="detail">
                <input
                  className="detail"
                  type="text"
                  placeholder="Requirement 1"
                />
              </div>
            </div>
            <div className="requi-wrapper flex-row align">
              <div className="info light">2:</div>
              <div className="detail">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.</div>
            </div>
            <Requirement key={this.state.index} index={this.state.index} />
            <button onClick={this.addRequirement} className="requi-add-wrapper flex-row align">
              <img className="info add-btn" src="/icons/add.svg" alt="cover" />
              <div className="requi-add">Add a new field</div>
            </button>
          </div>

          <div className="bottom flex-row center">
            <button className="bottom-btn bold" id="bottom-btn1">Create</button>
            <button className="bottom-btn bold" id="bottom-btn2">Save as draft</button>
          </div>
        </div>
      </div>
    )
  }
}

class Requirement extends Component {
  render() {
    return (
      <div className="requi-wrapper flex-row align">
        <div className="info light">{this.props.index}:</div>
        <div className="detail">Requirement {this.props.index}</div>
      </div>
    )
  }
}

class Image extends Component {
  deleteMedia() {
    Meteor.call('media.remove', this.props.media._id); //this.props.comment.owner
  }

  render() {
    console.log(this.props.media.img)
    return (
      <div className="img-wrapper flex-column">
        <img className="cover-img" src={this.props.media.img} alt="cover" />
        <button onClick={this.deleteMedia.bind(this)}>
          <span className="icon-delete delete-btn"></span>
        </button>
        <div className="img-action">Set as Cover</div>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('media');

  return {
    media: Media.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(Creating);