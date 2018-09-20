import React, { Component } from 'react';

class Popup extends Component {
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
        if (this.props.option == 'create') {
            return "You just launched a new course: " + this.props.courseName + ", status: " + this.props.status;
        }
        if (this.props.option == 'update') {
            return "You just edit course: " + this.props.courseName + ", status: " + this.props.status;
        }
    }

    render() {
        return (
            <div id="alert-area" className="alert-area">
                <div className="alert-box">
                    <div id="alert-content" className="alert-content">
                        {this.displayMessage()}
                    </div>
                </div>
                <a onClick={this.onRemoveFromTree} className="alert-close" href="#" />
            </div>
        );
    }
}

export default Popup;