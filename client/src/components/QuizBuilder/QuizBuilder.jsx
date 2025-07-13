import React, { useState } from "react";
import NavBar from "../Layout/NavBar";
import Question from "./Question";
import Emoji from "../Layout/Emoji";
import QuizService from "../../service/QuizService";
import { Navigate, useNavigate } from "react-router-dom";

const QuizBuilder = (props) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleResetAll = (e) => {
    setTitle("");
    setDescription("");
    setType("");
    setQuestions([]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleAddQuestion = (e) => {
    const id =
      questions.length === 0 ? 0 : questions[questions.length - 1].id + 1;
    const newTitle = "";
    const options = [];
    const answer = Number(0);
    const newQuestions = [...questions, { id, title: newTitle, options, answer }];
    setQuestions(newQuestions);
  };

  const copyQuestion = (question) => {
    const { id, title, answer } = question;
    const options = [...question.options];
    return { id, title, answer, options };
  };

  // question form control
  const handleQuestionTitleChange = (id, value) => {
    const index = questions.findIndex((question) => question.id === id);
    const newQuestions = [...questions];
    newQuestions[index].title = value;
    setQuestions(newQuestions);
  };

  const handleQuestionAnswerChange = (id, value) => {};

  const handleRemoveQuestion = (id) => {
    const newQuestions = questions.filter(
      (question) => question.id !== id
    );
    setQuestions(newQuestions);
  };

  const handleQuestionAddOption = (q_id) => {
    const index = questions.findIndex((question) => question.id === q_id);
    const newQuestions = [...questions];
    const question = { ...newQuestions[index] };
    const { options } = question;
    const opt_id =
      options.length === 0 ? 0 : options[options.length - 1].id + 1;
    const option = { id: opt_id, value: "" };
    const newOptions = [...options, option];
    question.options = newOptions;
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (q_id, opt_id, value) => {
    // console.log(q_id, opt_id, value);
    const index = questions.findIndex((question) => question.id === q_id);
    const newQuestions = [...questions];
    const question = { ...newQuestions[index] };
    const { options } = question;
    const option_index = options.findIndex((option) => option.id === opt_id);
    const newOptions = [...options];
    newOptions[option_index].value = value;
    question.options = newOptions;
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (q_id, opt_id) => {
    // console.log("Question", q_id, "Option", opt_id);
    const index = questions.findIndex((question) => question.id === q_id);
    const newQuestions = [...questions];
    const question = { ...newQuestions[index] };
    const { options } = question;
    // const newOptions = options.filter((option) => option.id !== opt_id);
    const newOptions = [];
    let counter = 0;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.id === opt_id) continue;
      option.id = counter++;
      newOptions.push(option);
    }
    question.options = newOptions;
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const handleSelectAnswer = (q_id, opt_id) => {
    const index = questions.findIndex((question) => question.id === q_id);
    const newQuestions = [...questions];
    const question = { ...newQuestions[index] };
    question.answer = opt_id;
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const handleSubmitQuiz = () => {
    const quizData = { title, description, type, questions };
    QuizService.submit(quizData).then((response) => {
      if (response === false) {
        // if the quiz is invalid
      } else {
        const { _id } = response;
        navigate("/quiz-done", { state: { quiz_id: _id } });
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
            <input
              className="profile-name input-quiz-title"
              placeholder="Legendary Quiz Title"
              value={title}
              onChange={handleTitleChange}
            />
            <input
              className="profile-email input-quiz-desc mt-1"
              placeholder="Legendary Quiz Description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <div className="row mt-5 pl-3">
              <select
                className="option-dropdown"
                value={type}
                onChange={handleTypeChange}
              >
                <option value="" disabled hidden>
                  Quiz Type
                </option>
                <option value="AMATEUR">Amateur</option>
                <option value="TIME_TRIAL" disabled>
                  Time Trial (Pro)
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              onTitleChange={handleQuestionTitleChange}
              onRemove={handleRemoveQuestion}
              onAddOption={handleQuestionAddOption}
              onOptionChange={handleOptionChange}
              onOptionRemove={handleRemoveOption}
              onSelectAnswer={handleSelectAnswer}
            />
          ))}
        </div>

        {/* add quiz button  */}
        <div className="row mt-4 mb-4">
          <div
            className="col-sm-12"
            style={{
              textAlign: "center",
            }}
          >
            <button className="tool-button" onClick={handleAddQuestion}>
              <Emoji emoji="💣" /> Add Question
            </button>
            <button className="tool-button" onClick={handleResetAll}>
              <Emoji emoji="✂️" /> Reset Quiz
            </button>
            <button className="tool-button" onClick={handleSubmitQuiz}>
              <Emoji emoji="🔨" /> Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizBuilder;
