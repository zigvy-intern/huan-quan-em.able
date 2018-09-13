import React, { Component } from 'react';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.changeOnClick = this.changeOnClick.bind(this);
  }

  changeOnClick(childPosition) {

  }

  render() {
    return (
      <div className="all-use-top">
        <div className="blue-top-wrapper">
          <div className="blue-top">
            <div className="child">
              <p>
                Home &#8901; About Em.able
              </p>
            </div>
            <div className="child">
              <p>
                <span>Howdy</span> Terry Richardson <span className="icon-arrow-down"></span>
              </p>
            </div>
          </div>
        </div>

        <div className="white-top-wrapper">
          <div className="white-top">
            <div className="child">
              <img src="/img/logo.png" alt="" />
            </div>
            <div id="nav-1" className="child">
              <p>
                My Courses
              </p>
            </div>
            <div id="nav-2" className="child">
              <p>
                My Bookings
              </p>
            </div>
            <div id="nav-3" className="child">
              <p>
                Dashboard
              </p>
            </div>
            <div id="nav-4" className="child">
              <p>
                How It Works
              </p>
            </div>
            <div id="nav-5" className="child">
              <p>
                All Courses
              </p>
            </div>
            <div id="nav-6" className="child">
              <p>
                Blog
              </p>
            </div>
            <div id="nav-7" className="child">
              <p>
                Course Leads
              </p>
            </div>
            <div className="child">
              <span className="icon-search"></span>
            </div>
            <div className="child">
              <span className="icon-noti"></span>
            </div>
          </div>
        </div>

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
      </div>

    )
  }
}