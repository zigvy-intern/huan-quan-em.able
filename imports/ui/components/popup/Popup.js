import React, { Component } from 'react';

class Popup extends Component {

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
            closeModal();
            alertArea.parentNode.removeChild(alertArea);
            clearTimeout(disperseTimeout);
        }, 500);
    }

    render() {
        const { message, courseName, status, option } = this.props;
        return (
            <div id="alert-area" className="alert-area">
                <div className="alert-box">
                    <div id="alert-content" className="alert-content">
                        {
                            option == 'create' ?
                                "You just launched a new course: " + courseName.toUpperCase() + ", status: " + status.toUpperCase()
                                :
                                option == 'update' ?
                                    "You just edit a course: " + courseName.toUpperCase() + ", status: " + status.toUpperCase()
                                    :
                                    message
                        }
                    </div>
                </div>
                <a onClick={this.onRemoveFromTree} className="alert-close" href="#" />
            </div>
        );
    }
}

export default Popup;