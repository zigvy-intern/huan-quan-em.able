import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

  constructor(props) {
    super(props);
    // this.changeOnClick = this.changeOnClick.bind(this);
    this.state = {
      whiteNavChildFlag: false,
      searchFlag: false,
    };
  }

  changeOnClick(childPosition) {
    document.getElementById("nav-" + childPosition).style.borderBottom = "1.5px solid #4a90e2";
    for (var i = 1; i <= 7; i++) {
      if (i != childPosition) {
        document.getElementById("nav-" + i).style.borderBottom = "1.5px solid transparent";
      }
    }
  }

  changeDropDownOnClick() {
    if (this.state.whiteNavChildFlag == false) {
      document.getElementById("drop-down-list").style.display = "flex";
      this.setState({
        whiteNavChildFlag: true,
      });
    } else {
      document.getElementById("drop-down-list").style.display = "none";
      this.setState({
        whiteNavChildFlag: false,
      });
    }

  }

  changeOnSearchClick() {
    if (this.state.searchFlag == false) {
      document.getElementById("search-bar").style.display = "block";
      this.setState({
        searchFlag: true,
      })
    } else {
      document.getElementById("search-bar").style.display = "none";
      this.setState({
        searchFlag: false,
      })
    }
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
<<<<<<< Updated upstream
                <span>Howdy</span> Terry Richardson <span className="icon-arrow-down"></span>
=======
                <span>Howdy </span>
                <Accounts />
>>>>>>> Stashed changes
              </p>
            </div>
          </div>
        </div>

        <div className="white-top-wrapper">
          <div className="white-top">
            <div className="child">
              <img src="/img/logo.png" alt="" />
            </div>
            <div onClick={() => this.changeOnClick("1")} id="nav-1" className="child">
              <Link to='/courses-list'>
                <p>
                  My Courses
                </p>
              </Link>
            </div>
            <div onClick={() => this.changeOnClick("2")} id="nav-2" className="child">
              <p>
                My Bookings
              </p>
            </div>
            <div onClick={() => this.changeOnClick("3")} id="nav-3" className="child">
              <Link to='/courses-card'>
                <p>
                  Dashboard
                </p>
              </Link>
            </div>
            <div onClick={() => this.changeOnClick("4")} id="nav-4" className="child">
              <p>
                How It Works
              </p>
            </div>
            <div onClick={() => this.changeOnClick("5")} id="nav-5" className="child">
              <p>
                All Courses
              </p>
            </div>
            <div onClick={() => this.changeOnClick("6")} id="nav-6" className="child">
              <p>
                Blog
              </p>
            </div>
            <div onClick={() => this.changeOnClick("7")} id="nav-7" className="child">
              <p>
                Course Leads
              </p>
            </div>
            <div onClick={() => this.changeDropDownOnClick()} id="icon-more" className="child">
              <span className="icon-list-with-bullets"></span>
              <div id="drop-down-list">
                <div onClick={() => this.changeOnClick("1")} className="child">
                  <Link className="white-top-nav" to='/courses-list'>
                    <p>
                      My Courses
                   </p>
                  </Link>
                </div>
                <div onClick={() => this.changeOnClick("2")} className="child">
                  <p>
                    My Bookings
                  </p>
                </div>
                <div onClick={() => this.changeOnClick("3")} className="child">
                  <Link className="white-top-nav" to='/courses-card'>
                    <p>
                      Dashboard
                    </p>
                  </Link>
                </div>
                <div onClick={() => this.changeOnClick("4")} className="child">
                  <p>
                    How It Works
                  </p>
                </div>
                <div onClick={() => this.changeOnClick("5")} className="child">
                  <p>
                    All Courses
                  </p>
                </div>
                <div onClick={() => this.changeOnClick("6")} className="child">
                  <p>
                    Blog
                  </p>
                </div>
                <div onClick={() => this.changeOnClick("7")} className="child">
                  <p>
                    Course Leads
                  </p>
                </div>
              </div>
            </div>
            <div id="search-toggle" className="child">
              <span onClick={() => this.changeOnSearchClick()} className="icon-search"></span>
              <div id="search-bar" className="slide-animation">
                <form id="searchForm" method="get">
                  <input type="search" id="searchField" placeholder="Course name..." autoComplete="off" />
                </form>
              </div>
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