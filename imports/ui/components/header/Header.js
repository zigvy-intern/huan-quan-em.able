import React, { Component } from 'react';
import Accounts from '/imports/ui/components/accounts/Accounts';

export default class Header extends Component {
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
                <span>Howdy</span> <Accounts /> <span className="icon-arrow-down"></span>
              </p>
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
    
        <div className="white-top-wrapper">
          <div className="white-top">
            <div className="child">
              <img src="/img/logo.png" alt="" />
            </div>
            <div className="child">
              <p>
                My Courses
              </p>
            </div>
            <div className="child">
              <p>
                My Bookings
              </p>
            </div>
            <div className="child">
              <p>
                Dashboard
              </p>
            </div>
            <div className="child">
              <p>
                How It Works
              </p>
            </div>
            <div className="child">
              <p>
                All Courses
              </p>
            </div>
            <div className="child">
              <p>
                Blog
              </p>
            </div>
            <div className="child">
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
      </div>
    )
  }
}