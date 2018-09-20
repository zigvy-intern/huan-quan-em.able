import React, { Component } from 'react';

export class Image extends Component {
  constructor(props) {
    super(props);
    this.setCover = this.setCover.bind(this);
    this.deleteMedia = this.deleteMedia.bind(this);
  }

  setCover() {
    Meteor.call('media.setCover', this.props.media._id);
  }

  deleteMedia() {
    Meteor.call('media.remove', this.props.media._id, this.props.media.owner);
  }

  onChangeRetrieveImgSrc(imgSrc) {
    this.props.retrieveSource(imgSrc);
  }

  render() {
    const { media } = this.props;
    if (media.cover) {
      return (
        <div className="img-wrapper flex-column" id="img-cover">
          <img id={media._id} className="cover-img" onClick={() => this.onChangeRetrieveImgSrc(media._id)} src={media.img} alt="cover" />
          <button>
            <span className="icon-delete delete-btn" />
          </button>
          <div className="img-action">Cover</div>
        </div>
      )
    }
    return (
      <div className="img-wrapper flex-column">
        <img id={media._id} className="cover-img" onClick={() => this.onChangeRetrieveImgSrc(media._id)} src={media.img} alt="cover" />
        <button onClick={this.deleteMedia}>
          <span className="icon-delete delete-btn" />
        </button>
        <button onClick={this.setCover}><div className="img-action">Set as Cover</div></button>
      </div>
    )
  }
}