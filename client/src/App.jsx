import { useState } from "react";
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

const App = () => {
  const loginStatus =
    sessionStorage.getItem("quizden-isLoggedIn") === "LOGGED_IN"
      ? "LOGGED_IN"
      : "NOT_LOGGED_IN";

  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus);
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    quizCurated: 0,
    quizAttended: 0,
    quizFlawless: 0,
  });
  const [quizAttending, setQuizAttending] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [authToken, setAuthToken] = useState("");

  const checkLogin = () => {
    return sessionStorage.getItem("quizden-isLoggedIn") === "LOGGED_IN";
  };

  // updates the user data globally after Login is successful
  const handleLogin = (response) => {
    setIsLoggedIn("LOGGED_IN");
    setUser({ ...response });
    setAuthToken(sessionStorage.getItem("quizden-authToken"));
    sessionStorage.setItem("quizden-isLoggedIn", "LOGGED_IN");
  };

  const handleUserUpdate = (response) => {
    setUser({ ...response });
  };

  const handleLogout = (event) => {
    setIsLoggedIn("NOT_LOGGED_IN");
    sessionStorage.setItem("quizden-isLoggedIn", "");
    sessionStorage.setItem("quizden-authToken", "");
  };

  const handleQuizzesCurated = (quizzes) => {
    const reversedQuizzes = [...quizzes].reverse();
    setQuizzes(reversedQuizzes);
  };

  const handleQuizFetch = (quiz) => {
    setQuizAttending(quiz);
  };

  // if (checkLogin()) {
  //   return <Navigate to={{ pathname: "/dashboard" }} />;
  // }
  return (
    <Router>
      {/* <NavBar
        isLoggedIn={isLoggedIn}
        checkLogin={checkLogin}
        onLogout={handleLogout}
      /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/registration"
          element={
            <Registration
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/done"
          element={
            <RegistrationDone
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
              user={user}
              quizzes={quizzes}
              onQuizLoad={handleQuizzesCurated}
              onUserUpdate={handleUserUpdate}
            />
          }
        />
        <Route
          path="/quiz-builder"
          element={
            <QuizBuilder
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
              user={user}
            />
          }
        />
        <Route
          path="/quiz-done"
          element={
            <QuizDone
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
              user={user}
            />
          }
        />
        <Route
          path="/quiz-fetcher"
          element={
            <QuizFetcher
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
              onQuizFetch={handleQuizFetch}
            />
          }
        />
        <Route
          path="/quiz-taker"
          element={
            <QuizTaker
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
              quiz={quizAttending}
              user={user}
            />
          }
        />
        <Route
          path="/quiz-taken"
          element={
            <QuizTaken
              isLoggedIn={isLoggedIn}
              checkLogin={checkLogin}
              onLogout={handleLogout}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
