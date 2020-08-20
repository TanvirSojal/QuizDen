import React, { Component } from "react";
import NavBar from "../Layout/NavBar";
import { Link, Redirect } from "react-router-dom";
import Emoji from "../Layout/Emoji";
import QuizService from "../../service/QuizService";
import QuizHeader from "./QuizHeader";
import ToolTip from "../Dashboard/ToolTip";

class QuizFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizCode: "",
      quiz: null,
      error: false,
    };
  }

  handleQuizCodeInput = (e) => {
    this.setState({ quizCode: e.target.value, error: false });
  };

  handleFindQuiz = () => {
    if (this.state.quizCode.length === 0) {
      this.setState({ error: true });
      return;
    }
    QuizService.findById(this.state.quizCode).then((response) => {
      if (response === false) {
        this.setState({ error: true });
      } else {
        this.setState({ quiz: response });
        this.props.onQuizFetch(response);
      }
    });
  };

  render() {
    if (!this.props.checkLogin()) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.props.isLoggedIn}
          checkLogin={this.props.checkLogin}
          onLogout={this.props.onLogout}
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
                value={this.state.quizCode}
                onChange={this.handleQuizCodeInput}
              />
              <button className="tool-button" onClick={this.handleFindQuiz}>
                <Emoji emoji="🔎" /> Find Quiz
              </button>
              {this.state.error && (
                <div className="profile-email pb-3" style={{}}>
                  No quiz found, good for you!
                </div>
              )}
              {!this.state.error && this.state.quiz && (
                <>
                  <QuizHeader
                    title={this.state.quiz.title}
                    description={this.state.quiz.description}
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
  }
}

export default QuizFetcher;
