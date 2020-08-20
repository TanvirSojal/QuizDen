import React from "react";
import NavBar from "../Layout/NavBar";
import { Link } from "react-router-dom";

const QuizDone = (props) => {
  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={props.isLoggedIn}
        checkLogin={props.checkLogin}
        onLogout={props.onLogout}
      />
      <div className="container fluid">
        <div className="row">
          <div
            className="col-sm-12"
            style={{
              fontFamily: `'Lexend Deca', sans-serif`,
              fontSize: "36px",
              color: "var(--quizden-light)",
              marginTop: "30vh",
              textAlign: "center",
            }}
          >
            Your Quiz is Created,{" "}
            <span
              style={{
                color: "var(--quizden-dark-purple)",
              }}
            >
              Quizzer
            </span>
            !
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-12"
            style={{
              fontFamily: `'Roboto', sans-serif`,
              fontSize: "18px",
              color: "var(--quizden-light-purple)",
              textAlign: "center",
            }}
          >
            Copy the Quiz ID and share.
          </div>
        </div>
        <div className="row mt-5">
          <div
            className="col-sm-12"
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: `'Lexend Deca', sans-serif`,
                fontSize: "22px",
                color: "var(--quizden-deep-purple)",
                padding: "1.4em",
                border: "2px solid var(--quizden-dark-purple)",
                borderRadius: "12px",
                margin: "auto",
                width: "fit-content",
                backgroundColor: "var(--quizden-light)",
              }}
            >
              {props.location.state.quiz_id}
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-12 mt-5"
            style={{
              textAlign: "center",
            }}
          >
            <Link to="/dashboard">
              <span className="back-to-home ">
                <span role="img" aria-label="man-walking">
                  🚶
                </span>{" "}
                Go to Dashboard
              </span>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizDone;
