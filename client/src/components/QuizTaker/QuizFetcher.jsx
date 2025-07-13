import React, { useState } from "react";
import NavBar from "../Layout/NavBar";
import { Link, Navigate } from "react-router-dom";
import Emoji from "../Layout/Emoji";
import QuizService from "../../service/QuizService";
import QuizHeader from "./QuizHeader";
import ToolTip from "../Dashboard/ToolTip";

const QuizFetcher = (props) => {
  const [quizCode, setQuizCode] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(false);

  const handleQuizCodeInput = (e) => {
    setQuizCode(e.target.value);
    setError(false);
  };

  const handleFindQuiz = () => {
    if (quizCode.length === 0) {
      setError(true);
      return;
    }
    QuizService.findById(quizCode).then((response) => {
      if (response === false) {
        setError(true);
      } else {
        setQuiz(response);
        props.onQuizFetch(response);
      }
    });
  };

  if (!props.checkLogin()) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={props.isLoggedIn}
        checkLogin={props.checkLogin}
        onLogout={props.onLogout}
      />
      <div className="container-fluid">
        <div className="row mt-5">
          <div
            className="col-sm-6 offset-sm-3 section"
            style={{
              textAlign: "center",
            }}
          >
            <div className="profile-name">Enter Quiz Code</div>
            <div className="profile-email pb-3">
              There is still time, run away! You don't have to do this!
            </div>
            <input
              className="quiz-code-input"
              type="text"
              spellCheck="false"
              value={quizCode}
              onChange={handleQuizCodeInput}
            />
            <button className="tool-button" onClick={handleFindQuiz}>
              <Emoji emoji="🔎" /> Find Quiz
            </button>
            {error && (
              <div className="profile-email pb-3" style={{}}>
                No quiz found, good for you!
              </div>
            )}
            {!error && quiz && (
              <>
                <QuizHeader
                  title={quiz.title}
                  description={quiz.description}
                />
                <div className="tooltip-wrapper">
                  <Link to="/quiz-taker">
                    <button className="tool-button">
                      <Emoji emoji="⚔️" /> Proceed To Battle
                    </button>
                  </Link>
                  <ToolTip
                    emoji="🪓"
                    title="There is no turning back!"
                    description="No mercy will be shown unto you. You shall receive the questions!"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizFetcher;
