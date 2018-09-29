import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';


export default class LoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorLogin: false,
      showErrorRegister: false,
    }
  }

  onChangeClose(type) {
    if (type == 'regis') {
      document.getElementById("modal-register-wrapper").style.display = "none";
    } else {
      const { closeModal } = this.props;
      closeModal();
      document.getElementById("modal-login-wrapper").style.display = "none";
    }
  }

  onChangeToCreatePopup() {
    document.getElementById("modal-register-wrapper").style.display = "flex";
  }

  onLogin() {
    const txtUsername = document.getElementsByName("txtUsername")[0].value;
    const txtPassword = document.getElementsByName("txtPassword")[0].value;
    Meteor.loginWithPassword(txtUsername, txtPassword, (error) => {
      if (typeof error === 'undefined') {
        this.onChangeClose("login");
      } else {
        onLoginFail();
      }
    });
  }

  onCreateNewAccount() {
    const txtPassword = document.getElementsByName("txtPassword")[1].value;
    const txtRePassword = document.getElementsByName("txtRePassword")[0].value;
    if (txtPassword == txtRePassword && this.state.showErrorRegister == false) {
      const txtUsername = document.getElementsByName("txtUsername")[1].value;
      const txtEmail = document.getElementsByName("txtEmail")[0].value;
      const data = { username: txtUsername, password: txtPassword, email: txtEmail, roles: ["admin"] };
      console.log(data);
      Meteor.call('user.register', data, (err, result) => {
        console.log(err, result);
        this.onChangeClose('regis');
      });
    } else {
      console.log("Password and re-password not correct");
    }
  }

  render() {
    return (
      <Fragment>
        <div id="modal-login-wrapper" className="login-modal-wrapper">
          <div className="login-modal-outside">
            <span onClick={() => this.onChangeClose("login")} className="login-close">&times;</span>
            <div className="user-title">
              <i className="em em-lock"></i> Login
          </div>
            <div className="login-modal">
              <form>
                <div className="typein-field username-field">
                  <i className="em em-male-student"></i>
                  <input type="text" name="txtUsername"></input>
                </div>
                <div className="typein-field password-field">
                  <i className="em em-key"></i>
                  <input type="password" name="txtPassword"></input>
                </div>
              </form>
            </div>
            <div className="button-login-group">
              <button onClick={() => this.onLogin()} className="shiny-btn">
                let's rock <i style={{ height: 15 + 'px' }} className="em em-fire"></i>
              </button>
              <div className="create-new-acc">
                <span>Don't have an account? <a href="#" onClick={this.onChangeToCreatePopup}>Create one</a></span>
              </div>
            </div>
            <div className="random-gray-div">
            </div>
          </div>
        </div>
        <div id="modal-register-wrapper" className="modal-register-wrapper login-modal-wrapper">
          <div className="register-modal-outside login-modal-outside">
            <span onClick={() => this.onChangeClose("regis")} className="login-close">&times;</span>
            <div className="user-title">
              <i className="em em-shield"></i> New account
          </div>
            <div className="login-modal register-modal">
              <form>
                <div className="typein-field email-field">
                  <i className="em em-email"></i>
                  <input type="text" name="txtEmail"></input>
                </div>
                <div className="typein-field username-field">
                  <i className="em em-male-student"></i>
                  <input type="text" name="txtUsername"></input>
                </div>
                <div className="typein-field password-field">
                  <i className="em em-key"></i>
                  <input type="password" name="txtPassword"></input>
                </div>
                <div className="typein-field re-password-field">
                  <i className="em em-repeat"></i>
                  <input type="password" name="txtRePassword"></input>
                </div>
              </form>
            </div>
            <div className="button-register-group button-login-group">
              <button onClick={() => this.onCreateNewAccount()} className="shiny-btn">
                Join us <i style={{ height: 15 + 'px' }} className="em em-earth_asia"></i>
              </button>
              <div className="create-new-acc">
                <span>More than 200,000 courses are available. <br />
                  Established in 2018 by Zigvy Corp.</span>
              </div>
            </div>
            <div className="random-gray-div">
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}