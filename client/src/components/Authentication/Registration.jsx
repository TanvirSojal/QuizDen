import React, { useState } from "react";
import NavBar from "../Layout/NavBar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";
import AuthError from "../Layout/AuthError";

const Registration = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    AuthService.register({ name, email, password }).then((response) => {
      if (response === false) {
        setError(true);
      } else {
        navigate("/done");
      }
    });
  };

  // console.log("register", sessionStorage.getItem("isLoggedIn"));
  if (props.checkLogin()) {
    return <Navigate to={{ pathname: "/dashboard" }} />;
  }
  // if (sessionStorage.getItem("isLoggedIn") === "true") {
  //   return <Navigate to={{ pathname: "/dashboard" }} />;
  // }
  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={props.isLoggedIn}
        checkLogin={props.checkLogin}
        onLogout={props.onLogout}
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
        <form onSubmit={handleRegistrationSubmit}>
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
                  value={name}
                  onChange={handleNameChange}
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
                  value={email}
                  onChange={handleEmailChange}
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
                  value={password}
                  onChange={handlePasswordChange}
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
            {error && (
              <AuthError text="Looks like you made a mistake. The email is probably taken." />
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Registration;
