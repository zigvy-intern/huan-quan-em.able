import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';


class Cards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const history = this.props.history;
    return (
      <div>
<<<<<<< Updated upstream
        <Header history={history} />

=======
        <Header />
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
>>>>>>> Stashed changes
        <div className="description-wrapper">
          <div className="description">
            <div className="des-child">
              <p>
                This page contains all your course created listings. You can edit or delete your existing course listings.
                All course listings will be reviewed by Em.able comittee before course listings can be published, during
                which will appear as pending for approval.
                </p>
            </div>
            <div className="des-button">
              <button>
                <Link className="add-new-course" to="/creating">
                  <span className="icon-add"></span>
                  <span>create a new course</span>
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="card-list">
          <div className="card-wrapper">
            <div className="card-column">
              <div className="child">
                <div className="course-card">
                  <div className="course-pic-card container">
                    <img className="image" src="./img/photo-1.jpg" alt="" />
                    <div className="draft-card">
                      <p>draft</p>
                    </div>
                    <div className="middle">
                      <div className="child">
                        <span className="icon-edit"></span>
                      </div>
                      <div className="child"></div>
                      <div className="child">
                        <span className="icon-delete"></span>
                      </div>
                    </div>
                  </div>
                  <div className="course-des-card des">
                    Flash Photography #2
            </div>
                  <div className="course-cate-card category">
                    Art / Photography
            </div>
                  <div className="creator">
                    <div>
                      <div className="creator-ava">
                        <div>
                          <img src="./img/creator-avatar.jpg" alt="" />
                        </div>
                      </div>
                      <div className="creator-details">
                        <div className="creator-name">
                          Terry Richardson
                  </div>
                        <div className="creator-date">
                          2 weeks ago
                  </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="child">
                <div className="course-card">
                  <div className="course-pic-card container">
                    <img src="./img/photo-2.jpg" alt="" />
                    <div className="draft-card live-card">
                      <p>live</p>
                    </div>
                    <div className="middle">
                      <div className="child">
                        <span className="icon-edit"></span>
                      </div>
                      <div className="child"></div>
                      <div className="child">
                        <span className="icon-delete"></span>
                      </div>
                    </div>
                  </div>
                  <div className="course-des-card des">
                    Flash Photography
            </div>
                  <div className="course-cate-card category">
                    Art / Photography
            </div>
                  <div className="creator">
                    <div>
                      <div className="creator-ava">
                        <div>
                          <img src="./img/creator-avatar.jpg" alt="" />
                        </div>
                      </div>
                      <div className="creator-details">
                        <div className="creator-name">
                          Terry Richardson
                  </div>
                        <div className="creator-date">
                          2 weeks ago
                  </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="child">
                <div className="course-card">
                  <div className="course-pic-card container">
                    <img src="./img/photo-3.jpg" alt="" />
                    <div className="draft-card live-card">
                      <p>live</p>
                    </div>
                    <div className="middle">
                      <div className="child">
                        <span className="icon-edit"></span>
                      </div>
                      <div className="child"></div>
                      <div className="child">
                        <span className="icon-delete"></span>
                      </div>
                    </div>
                  </div>
                  <div className="course-des-card des">
                    How to film short stories
            </div>
                  <div className="course-cate-card category">
                    Art / Photography
            </div>
                  <div className="creator">
                    <div>
                      <div className="creator-ava">
                        <div>
                          <img src="./img/creator-avatar.jpg" alt="" />
                        </div>
                      </div>
                      <div className="creator-details">
                        <div className="creator-name">
                          Terry Richardson
                  </div>
                        <div className="creator-date">
                          2 weeks ago
                  </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="loading-wrapper">
          <div className="loading">
            <span className="icon-loading"></span> <span>Loading more Courses...</span>
          </div>
        </div>
      </div>
    )
  }
}


export default Cards;