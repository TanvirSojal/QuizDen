import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import Profile from "./Profile";
import Tools from "./Tools";
import CuratedQuizList from "./CuratedQuizList";
import QuizService from "../../service/QuizService";
import QuizzerService from "../../service/QuizzerService";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
    this.getQuizzes();
  }

  componentDidMount() {
    const authToken = sessionStorage.getItem("quizden-authToken");
    const user_id = sessionStorage.getItem("quizden-user-id");

    // get Quizzer profile
    QuizzerService.getQuizzer(user_id, authToken).then((response) => {
      if (response === false) {
      } else {
        this.setState({ user: response });
        this.props.onUserUpdate(response);
      }
    });
  }

  getQuizzes = () => {
    const user_id = sessionStorage.getItem("quizden-user-id");
    QuizService.findByUser(user_id).then((response) => {
      if (response === false) {
      } else {
        this.props.onQuizLoad(response);
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
            <Profile
              classes="col-sm-4 offset-sm-1 mr-4 section"
              name={this.state.user.name}
              email={this.state.user.email}
              curated={this.state.user.quizCurated}
              attended={this.state.user.quizAttended}
              flawless={this.state.user.quizFlawless}
            />

            {/* Tools section  */}
            <Tools
              classes="col-sm-6 ml-4 section tools"
              title="Quizzer Tools"
              subtitle="Some tools may only be available in Pro License"
            />
            {/* Tools section  end*/}
          </div>
          <div
            className="row mt-5 mb-5"
            // very important code
            // to (roughly) algin this with upper sections
          >
            <CuratedQuizList
              // use this class only if you're desperate: curated-quiz-section
              classes="curated-quiz-section section"
              quizzes={this.props.quizzes}
            />

            {/* Tools section  end*/}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
