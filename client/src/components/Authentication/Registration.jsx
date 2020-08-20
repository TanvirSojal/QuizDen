import React, { Component } from "react";
import NavBar from "../Layout/NavBar";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../service/AuthService";
import AuthError from "../Layout/AuthError";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: false,
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value, error: false });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value, error: false });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value, error: false });
  };

  handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    AuthService.register({ name, email, password }).then((response) => {
      if (response === false) {
        this.setState({ error: true });
      } else {
        this.props.history.push("/done");
      }
    });
  };

  render() {
    // console.log("register", sessionStorage.getItem("isLoggedIn"));
    if (this.props.checkLogin()) {
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }
    // if (sessionStorage.getItem("isLoggedIn") === "true") {
    //   return <Redirect to={{ pathname: "/dashboard" }} />;
    // }
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.props.isLoggedIn}
          checkLogin={this.props.checkLogin}
          onLogout={this.props.onLogout}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-8 offset-sm-4 mt-5">
              <Link to="/">
                <span className="back-to-home ">
                  <span role="img" aria-label="man-walking">
                    🚶
                  </span>{" "}
                  Back to Home
                </span>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 offset-sm-4">
              <div className="auth-title mt-1">Register for a New Account</div>
            </div>
          </div>
          <form onSubmit={this.handleRegistrationSubmit}>
            <div className="form-group">
              {/* name */}
              <div className="row mt-4">
                <div className="col-sm-4 offset-sm-4">
                  <label className="input-label" htmlFor="inputName">
                    Name
                  </label>
                  <input
                    required="required"
                    type="text"
                    className="form-control input-field"
                    aria-describedby="emailInput"
                    placeholder="John Doe"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </div>
              </div>

              {/* email */}
              <div className="row mt-4">
                <div className="col-sm-4 offset-sm-4">
                  <label className="input-label" htmlFor="inputEmail">
                    Email address
                  </label>
                  <input
                    required="required"
                    type="email"
                    className="form-control input-field"
                    aria-describedby="emailInput"
                    placeholder="johndoe@email.com"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                </div>
              </div>

              {/* password */}
              <div className="row mt-4">
                <div
                  className="col-sm-4 offset-sm-4"
                  //   style={{ backgroundColor: "red" }}
                >
                  <label className="input-label" htmlFor="inputPassword">
                    Password
                  </label>
                  <input
                    required="required"
                    type="password"
                    className="form-control input-field"
                    aria-describedby="passwordInput"
                    placeholder="strong password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-sm-2 offset-sm-4">
                  <button
                    type="submit"
                    className="button register-button"
                    style={{
                      width: "100%",
                      height: "42px",
                    }}
                    onClick={this.handleRegistration}
                  >
                    Register
                  </button>
                </div>
                <div className="col-sm-2">
                  <Link to="/login">
                    <div className="back-to-home mt-2">
                      <span role="img" aria-label="man-walking">
                        🚶
                      </span>{" "}
                      Already Registered? Login
                    </div>
                  </Link>
                </div>
              </div>
              {this.state.error && (
                <AuthError text="Looks like you made a mistake. The email is probably taken." />
              )}
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Registration;
