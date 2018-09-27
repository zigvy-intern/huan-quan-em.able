import React, { Component } from 'react';

export default class ErrorPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeTime: 7000,
    }
    this.displayMessage = this.displayMessage.bind(this);
    this.onRemoveFromTree = this.onRemoveFromTree.bind(this);
  }


  componentDidMount() {
    const alertTimeout = setTimeout(() => {
      this.onRemoveFromTree();
      clearTimeout(alertTimeout);
    }, this.state.closeTime);
  }

  onRemoveFromTree() {
    const alertArea = document.getElementById("alert-area");
    alertArea.classList.add("hide");
    const disperseTimeout = setTimeout(() => {
      alertArea.parentNode.removeChild(alertArea);
      clearTimeout(disperseTimeout);
    }, 500);
  }

  displayMessage() {
    if (this.props.option == 'permission') {
      return "You have no authorize to remove this course.";
    }
    if (this.props.option == 'loginError') {
      return "You have to login or register to continue your work!";
    }
  }

  render() {
    return (
      <div id="alert-area" className="alert-area">
        <div className="alert-box error">
          <div id="alert-content" className="alert-content">
            {this.displayMessage()}
          </div>
        </div>
        <a onClick={this.onRemoveFromTree} className="alert-close" href="#" />
      </div>
    )
  }
}