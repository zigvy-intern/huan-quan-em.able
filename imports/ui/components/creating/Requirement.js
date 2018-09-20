import React, { Component } from 'react';

export class Requirement extends Component {
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