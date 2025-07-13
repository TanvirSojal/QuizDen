import { Component } from "react";
import "./App.css";
import Landing from "./components/Landing/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./components/Authentication/Registration";
import Login from "./components/Authentication/Login";
import RegistrationDone from "./components/Authentication/RegistrationDone";
import Dashboard from "./components/Dashboard/Dashboard";
import QuizBuilder from "./components/QuizBuilder/QuizBuilder";
import QuizDone from "./components/QuizBuilder/QuizDone";
import QuizFetcher from "./components/QuizTaker/QuizFetcher";
import QuizTaker from "./components/QuizTaker/QuizTaker";
import QuizTaken from "./components/QuizTaker/QuizTaken";

class App extends Component {
  constructor(props) {
    super(props);
    const loginStatus =
      sessionStorage.getItem("quizden-isLoggedIn") === "LOGGED_IN"
        ? "LOGGED_IN"
        : "NOT_LOGGED_IN";
    this.state = {
      isLoggedIn: loginStatus,
      user: {
        _id: "",
        name: "",
        email: "",
        quizCurated: 0,
        quizAttended: 0,
        quizFlawless: 0,
      },
      quizAttending: null,
      quizzes: [],
      authToken: "",
    };
  }

  checkLogin = () => {
    return sessionStorage.getItem("quizden-isLoggedIn") === "LOGGED_IN";
  };

  // updates the user data globally after Login is successful
  handleLogin = (response) => {
    this.setState({
      isLoggedIn: "LOGGED_IN",
      user: { ...response },
      authToken: sessionStorage.getItem("quizden-authToken"),
    });
    sessionStorage.setItem("quizden-isLoggedIn", "LOGGED_IN");
  };

  handleUserUpdate = (response) => {
    this.setState({
      user: { ...response },
    });
  };

  handleLogout = (event) => {
    this.setState({ isLoggedIn: "NOT_LOGGED_IN" });
    sessionStorage.setItem("quizden-isLoggedIn", "");
    sessionStorage.setItem("quizden-authToken", "");
  };

  handleQuizzesCurated = (quizzes) => {
    quizzes.reverse();
    this.setState({ quizzes: quizzes });
  };

  handleQuizFetch = (quiz) => {
    this.setState({ quizAttending: quiz });
  };

  render() {
    // if (this.checkLogin()) {
    //   return <Navigate to={{ pathname: "/dashboard" }} />;
    // }
    return (
      <Router>
        {/* <NavBar
          isLoggedIn={this.state.isLoggedIn}
          checkLogin={this.checkLogin}
          onLogout={this.handleLogout}
        /> */}
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
              />
            }
          />
          <Route
            path="/registration"
            element={
              <Registration
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                onLogin={this.handleLogin}
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
              />
            }
          />
          <Route
            path="/done"
            element={
              <RegistrationDone
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
                user={this.state.user}
                quizzes={this.state.quizzes}
                onQuizLoad={this.handleQuizzesCurated}
                onUserUpdate={this.handleUserUpdate}
              />
            }
          />
          <Route
            path="/quiz-builder"
            element={
              <QuizBuilder
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
                user={this.state.user}
              />
            }
          />
          <Route
            path="/quiz-done"
            element={
              <QuizDone
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
                user={this.state.user}
              />
            }
          />
          <Route
            path="/quiz-fetcher"
            element={
              <QuizFetcher
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
                onQuizFetch={this.handleQuizFetch}
              />
            }
          />
          <Route
            path="/quiz-taker"
            element={
              <QuizTaker
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
                quiz={this.state.quizAttending}
                user={this.state.user}
              />
            }
          />
          <Route
            path="/quiz-taken"
            element={
              <QuizTaken
                isLoggedIn={this.state.isLoggedIn}
                checkLogin={this.checkLogin}
                onLogout={this.handleLogout}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
