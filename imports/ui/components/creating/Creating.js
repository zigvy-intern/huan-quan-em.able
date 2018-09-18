import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      category: '',
      subCategory: '',
      subject: '',
      level: '',
      size: '',
      status: '',
      index: 0
    }
    this.uploadMedia = this.uploadMedia.bind(this);
    this.renderMedia = this.renderMedia.bind(this);
    this.createLiveCourse = this.createLiveCourse.bind(this);
    this.createDraftCourse = this.createDraftCourse.bind(this);
    this.addRequirement = this.addRequirement.bind(this);
    this.renderRequirement = this.renderRequirement.bind(this);
  }

  uploadMedia() {
    cloudinary.openUploadWidget({ 
			cloud_name: 'rai3399', upload_preset: 'bdz2m5kq', tags:['em.able']},
      (error, result) => { 
        const img = `https://res.cloudinary.com/rai3399/image/upload/w_700,h_496,c_fill/${result[0].public_id}.jpg`
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

  renderRequirement() {
    let requirements = []
    for (let i = 1; i <= this.state.index; i++) {
      requirements.push(<Requirement key={`requirement${i}`} index={i} />)
    }
    return <div>{requirements}</div>
  }

  createLiveCourse() {
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const category = this.state.category;
    const subCategory = this.state.subCategory;
    const subject = this.state.subject;
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();
    const level = this.state.level;
    const size = this.state.size;
    const desc = ReactDOM.findDOMNode(this.refs.descInput).value.trim();
    const status = 'live';
    const img = this.props.media[0].img;

    let code = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  
    for (let i = 0; i < 10; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length))};

    Meteor.call('courses.insert', name, category, subCategory, subject, 
                price, level, size, desc, status, code, img)

    ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    ReactDOM.findDOMNode(this.refs.priceInput).value = '';
    ReactDOM.findDOMNode(this.refs.descInput).value = '';
  }

  createDraftCourse() {
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const category = this.state.category;
    const subCategory = this.state.subCategory;
    const subject = this.state.subject;
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();
    const level = this.state.level;
    const size = this.state.size;
    const desc = ReactDOM.findDOMNode(this.refs.descInput).value.trim();
    const status = 'draft';
    const img = this.props.media[0].img;

    let code = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  
    for (let i = 0; i < 10; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length))};

    Meteor.call('courses.insert', name, category, subCategory, subject, 
                price, level, size, desc, status, code, img)

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
            <div className="flex-row space-between">
              <div className="info-wrapper flex-row align space-between" id="category">              
                <div className="info light">Category:</div>
                <select 
                  className="flex-row space-between detail bold"
                  value={this.state.category}
                  onChange={(e) => this.setState({ category: e.target.value })}
                  required
                >
                  <option>Music</option>
                  <option>Art</option>
                  <option>Coding</option>
                </select>                       
              </div>
              <div className="info-wrapper flex-row align space-between" id="sub-category">              
                <div className="info light">Sub Category:</div>
                <select 
                  className="flex-row space-between detail bold"
                  value={this.state.subCategory}
                  onChange={(e) => this.setState({ subCategory: e.target.value })}
                  required
                >
                  <option>Junior College</option>
                  <option>Public College</option>
                  <option>Private College</option>
                </select>       
              </div>
              <div className="info-wrapper flex-row align space-between" id="subject">              
                <div className="info light">Subject:</div>
                <select 
                  className="flex-row space-between detail bold"
                  value={this.state.subject}
                  onChange={(e) => this.setState({ subject: e.target.value })}
                  required
                >
                  <option>English</option>
                  <option>History</option>
                  <option>Civic Education</option>
                </select>     
              </div>
            </div>
            <div className="flex-row space-between">
              <div className="info-wrapper flex-row align space-between" id="fee">
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
              <div className="info-wrapper flex-row align space-between" id="level">              
                <div className="info light">Difficulty Level:</div>
                <select 
                  className="flex-row space-between detail bold"
                  value={this.state.level}
                  onChange={(e) => this.setState({ level: e.target.value })}
                  required
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>    
              </div>
              <div className="info-wrapper flex-row align space-between" id="size">              
                <div className="info light">Class Size:</div>
                <select 
                  className="flex-row space-between detail bold"
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
          <div className="dotted-line"></div>

          <div className="flex-column component-wrapper">
            <div className="component flex-row align">
              <div className="blue-line"></div><div className="component-title gray8c flex-row">Photo & Video</div>
            </div>
            <div className="media-component">    
              {this.renderMedia()}
              <div className="img-wrapper flex-column">
                <div className="flex-column center">
                  <div className="video"></div>
                  <img className="cover-img" src="/img/demo2.jpg" alt="cover" />
                  <button className="play-btn-wrapper">
                    <img className="play-btn" src="/icons/play.svg" alt="play" />
                  </button>
                </div>	
                <button><img className="delete-btn" src="/icons/delete-white.svg" alt="delete" /></button>
              </div>              
              <div className="blank-img flex-column center">
                <button className="add-btn-wrapper">
                  <img onClick={this.uploadMedia} className="add-btn" src="/icons/add.svg" alt="cover" />
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
              onClick={this.createLiveCourse} 
              className="bottom-btn bold" 
              id="bottom-btn1"
            >
              Create
            </button>
            <button 
              onClick={this.createDraftCourse}
              className="bottom-btn bold" 
              id="bottom-btn2"
            >
              Save as draft
            </button>
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
        <div className="detail">
          <input 
            className="detail"
            type="text"
            placeholder={`Requirement ${this.props.index}`}                
          /> 
        </div>
      </div>
    )
  }
}

class Image extends Component {
  constructor(props) {
    super(props);
    this.setCover = this.setCover.bind(this);
    this.deleteMedia = this.deleteMedia.bind(this);
  }

  setCover() {
    Meteor.call('media.cover', this.props.media._id);
  }

  deleteMedia() {
    Meteor.call('media.remove', this.props.media._id); //this.props.comment.owner
  }

  render() {
    const { media } = this.props;
    if (media.cover) {
      return (
        <div className="img-wrapper flex-column" id="img-cover">
          <img className="cover-img" src={media.img} alt="cover" />
          <button><img className="delete-btn" src="/icons/delete-white.svg" alt="delete" /></button>
          <div className="img-action">Cover</div>
        </div>
      )
    }
    return (
      <div className="img-wrapper flex-column">
        <img className="cover-img" src={media.img} alt="cover" />
        <button onClick={this.deleteMedia}><img className="delete-btn" src="/icons/delete-white.svg" alt="delete" /></button>
        <button onClick={this.setCover}><div className="img-action">Set as Cover</div></button>
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