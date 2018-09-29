import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Accounts from '/imports/ui/components/accounts/Accounts';
import Context from '../../../startup/client/index';
import { Courses } from '/imports/api/courses';

class Header extends Component {

  constructor(props) {
    super(props);
    // this.changeOnClick = this.changeOnClick.bind(this);
    this.state = {
      search: '',
      whiteNavChildFlag: false,
      searchFlag: false,
      notificationPing: this.props.notiNumber,
    };
    this.changeOnClick = this.changeOnClick.bind(this);
    this.changeDropDownOnClick = this.changeDropDownOnClick.bind(this);
    this.changeOnSearchClick = this.changeOnSearchClick.bind(this);
    this.handleSearchInfo = this.handleSearchInfo.bind(this);
  }

  changeOnClick(childPosition) {
    for (var i = 1; i <= 7; i++) {
      // if (i != childPosition) {
      document.getElementById("nav-" + i).style.borderBottom = "1.5px solid transparent";
      // }
    }
    document.getElementById("nav-" + childPosition).style.borderBottom = "1.5px solid #4a90e2";
  }

  changeDropDownOnClick() {
    if (!this.state.whiteNavChildFlag) {
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
    if (!this.state.searchFlag) {
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

  handleSearchInfo(e) {
    const { handleSearch } = this.props;
    const { search } = this.state;
    this.setState({
      search: e.target.value
    })

    handleSearch({
      search: search
    });
  }

  render() {
    const { CATE_COUNT, COURSE_COUNT } = this.props;
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
                <span>Howdy </span>
                <Accounts />
              </p>
            </div>
          </div>
        </div>

        <div className="white-top-wrapper">
          <div className="white-top">
            <div className="child">
              <img src="/img/logo.png" alt="" />
            </div>
            <Context.Consumer>
              {
                context => (
                  <Fragment>
                    <div onClick={() => {
                      context.changeCurPos(1);
                      this.changeOnClick(1);
                    }} id="nav-1" className="child" style={{ borderBottom: context.curPos == 1 ? '1.5px solid #4a90e2' : '1.5px solid transparent' }}>
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
                    <div onClick={() => {
                      context.changeCurPos(3);
                      this.changeOnClick(3);
                    }} id="nav-3" className="child" style={{ borderBottom: context.curPos == 3 ? '1.5px solid #4a90e2' : '1.5px solid transparent' }}>
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
                  </Fragment>
                )
              }
            </Context.Consumer>

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
              <span
                onClick={() => this.changeOnSearchClick()}
                className="icon-search">
              </span>
              <div id="search-bar" className="slide-animation">
                <form id="searchForm" method="get">
                  <input
                    type="search"
                    id="searchField"
                    placeholder="Course name..."
                    onChange={this.handleSearchInfo}
                  />
                </form>
              </div>
            </div>
            <Context.Consumer>
              {
                context => (
                  <div data-number={context.notiNum} className="child">
                    <span className="icon-noti"></span>
                  </div>
                )
              }
            </Context.Consumer>
          </div>
        </div>
        <div className="banner">
          <div className="my-courses">
            <div>
              My Courses
            </div>
            <div>
              {CATE_COUNT} Categories &#8901; {COURSE_COUNT} Courses
            </div>
            <div></div>
          </div>
        </div>
      </div>

    )
  }
}


export default withTracker(() => {
  Meteor.subscribe('courses');
  return {
    COURSE_COUNT: Courses.find({ _id: { $ne: true } }).count(),
    CATE_COUNT: Courses.find({ category: { unique: true, dropDups: true } }).count(),
  };
})(Header);
