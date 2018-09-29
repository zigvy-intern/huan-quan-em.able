import React, { Component } from 'react';

export default class ErrorPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeTime: 7000,
    }
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
      const { closeModal } = this.props;
      if (closeModal != null) {
        closeModal();
      }
      alertArea.parentNode.removeChild(alertArea);
      clearTimeout(disperseTimeout);
    }, 500);
  }

  render() {
    const { message } = this.props;
    return (
      <div id="alert-area" className="alert-area">
        <div className="alert-box error">
          <div id="alert-content" className="alert-content">
            {message}
          </div>
        </div>
        <a onClick={this.onRemoveFromTree} className="alert-close" href="#" />
      </div>
    )
  }
}