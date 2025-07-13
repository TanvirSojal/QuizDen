import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import Profile from "./Profile";
import Tools from "./Tools";
import CuratedQuizList from "./CuratedQuizList";
import QuizService from "../../service/QuizService";
import QuizzerService from "../../service/QuizzerService";

const Dashboard = (props) => {
  const [user, setUser] = useState(props.user);

  const getQuizzes = () => {
    const user_id = sessionStorage.getItem("quizden-user-id");
    QuizService.findByUser(user_id).then((response) => {
      if (response === false) {
      } else {
        props.onQuizLoad(response);
      }
    });
  };

  useEffect(() => {
    getQuizzes();
    
    const authToken = sessionStorage.getItem("quizden-authToken");
    const user_id = sessionStorage.getItem("quizden-user-id");

    // get Quizzer profile
    QuizzerService.getQuizzer(user_id, authToken).then((response) => {
      if (response === false) {
      } else {
        setUser(response);
        props.onUserUpdate(response);
      }
    });
  }, []);

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
          <Profile
            classes="col-sm-4 offset-sm-1 mr-4 section"
            name={user.name}
            email={user.email}
            curated={user.quizCurated}
            attended={user.quizAttended}
            flawless={user.quizFlawless}
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
            quizzes={props.quizzes}
          />

          {/* Tools section  end*/}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
