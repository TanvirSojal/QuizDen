import React, { useState, useCallback } from "react";
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

  const handleResetAll = useCallback(() => {
    setTitle("");
    setDescription("");
    setType("");
    setQuestions([]);
  }, []);

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleTypeChange = useCallback((e) => {
    setType(e.target.value);
  }, []);

  const handleAddQuestion = useCallback(() => {
    setQuestions((prev) => {
      const id = prev.length === 0 ? 0 : prev[prev.length - 1].id + 1;
      return [...prev, { id, title: "", options: [], answer: 0 }];
    });
  }, []);

  // question form control
  const handleQuestionTitleChange = useCallback((id, value) => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === id);
      const newQuestions = [...prev];
      newQuestions[index] = { ...newQuestions[index], title: value };
      return newQuestions;
    });
  }, []);

  const handleRemoveQuestion = useCallback((id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const handleQuestionAddOption = useCallback((q_id) => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === q_id);
      const question = { ...prev[index] };
      const { options } = question;
      const opt_id =
        options.length === 0 ? 0 : options[options.length - 1].id + 1;
      question.options = [...options, { id: opt_id, value: "" }];
      const newQuestions = [...prev];
      newQuestions[index] = question;
      return newQuestions;
    });
  }, []);

  const handleOptionChange = useCallback((q_id, opt_id, value) => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === q_id);
      const question = { ...prev[index] };
      const newOptions = [...question.options];
      const optionIndex = newOptions.findIndex((o) => o.id === opt_id);
      newOptions[optionIndex] = { ...newOptions[optionIndex], value };
      question.options = newOptions;
      const newQuestions = [...prev];
      newQuestions[index] = question;
      return newQuestions;
    });
  }, []);

  const handleRemoveOption = useCallback((q_id, opt_id) => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === q_id);
      const question = { ...prev[index] };
      const newOptions = [];
      let counter = 0;
      for (const option of question.options) {
        if (option.id === opt_id) continue;
        newOptions.push({ ...option, id: counter++ });
      }
      question.options = newOptions;
      const newQuestions = [...prev];
      newQuestions[index] = question;
      return newQuestions;
    });
  }, []);

  const handleSelectAnswer = useCallback((q_id, opt_id) => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === q_id);
      const newQuestions = [...prev];
      newQuestions[index] = { ...newQuestions[index], answer: opt_id };
      return newQuestions;
    });
  }, []);

  const handleSubmitQuiz = useCallback(() => {
    const quizData = { title, description, type, questions };
    QuizService.submit(quizData).then((response) => {
      if (response === false) {
        // if the quiz is invalid
      } else {
        const { _id } = response;
        navigate("/quiz-done", { state: { quiz_id: _id } });
      }
    });
  }, [title, description, type, questions, navigate]);

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
