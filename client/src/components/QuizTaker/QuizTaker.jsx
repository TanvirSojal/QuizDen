import React, { useState, useEffect } from "react";
import NavBar from "../Layout/NavBar";
import { Navigate, useNavigate } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import Emoji from "../Layout/Emoji";
import QuizService from "../../service/QuizService";

const QuizTaker = (props) => {
  const navigate = useNavigate();

  const { questions } = props.quiz;
  const initialAnswers = [];
  for (let i = 0; i < questions.length; i++) {
    initialAnswers.push({
      question_id: questions[i].id,
      answer: -1,
    });
  }

  const [quiz] = useState(props.quiz);
  const [user] = useState(props.user);
  const [answers, setAnswers] = useState(initialAnswers);

  useEffect(() => {
    sessionStorage.setItem("quiz-attending", quiz._id);
  }, [quiz._id]);

  const handleSelectAnswer = (q_id, opt_id) => {
    const index = answers.findIndex((answer) => answer.question_id === q_id);
    const newAnswers = [...answers];
    newAnswers[index].answer = opt_id;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const user_id = user._id;
    const quiz_id = quiz._id;
    const request = {
      user_id: user_id,
      quiz_id: quiz_id,
      answers: [...answers],
    };
    QuizService.submitAnswer(request).then((response) => {
      if (response === false) {
        console.log("FAILED!");
      } else {
        navigate("/quiz-taken", { state: { quiz: response } });
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
          <div className="col-sm-8 offset-sm-2 section">
            <div className="profile-name">{quiz.title}</div>
            <div className="profile-email">{quiz.description}</div>
            <div
              className="option-dropdown pt-4"
              style={{
                width: "max-content",
              }}
            >
              <span style={{ color: "var(--quizden-bg-dark)" }}>
                Quiz Type:{" "}
              </span>
              {quiz.type}
            </div>
          </div>
        </div>

        <div className="row mt-5">
          {quiz.questions.map((question) => (
            <QuizQuestion
              key={question.id}
              question={question}
              onSelectAnswer={handleSelectAnswer}
              //   onTitleChange={handleQuestionTitleChange}
              //   onRemove={handleRemoveQuestion}
              //   onAddOption={handleQuestionAddOption}
              //   onOptionChange={handleOptionChange}
              //   onOptionRemove={handleRemoveOption}
              //   onSelectAnswer={handleSelectAnswer}
            />
          ))}
        </div>
        <div className="row mt-4 mb-4">
          <div
            className="col-sm-12"
            style={{
              textAlign: "center",
            }}
          >
            <button className="tool-button" onClick={handleSubmit}>
              <Emoji emoji="💣" /> Submit
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizTaker;
