import React from "react";
import Emoji from "../Layout/Emoji";
import Option from "./Option";

const Question = (props) => {
  const handleTitleChange = (e) => {
    props.onTitleChange(props.question.id, e.target.value);
  };

  const handleOptionChange = (opt_id, value) => {
    props.onOptionChange(props.question.id, opt_id, value);
  };

  const handleOptionRemove = (opt_id) => {
    props.onOptionRemove(props.question.id, opt_id);
  };

  const handleSelectAnswer = (e) => {
    props.onSelectAnswer(props.question.id, parseInt(e.target.value));
  };

  const { question } = props;
  return (
    <div className="col-sm-8 offset-sm-2 section mt-4">
      <div className="row">
        <div className="col-sm-10">
          <input
            type="text"
            className="profile-name input-question-title"
            placeholder="Question ?"
            value={question.title}
            onChange={handleTitleChange}
          />
          <div className="row pt-3">
            {question.options.map((option) => (
              <Option
                key={option.id}
                id={option.id}
                value={option.value}
                onChange={handleOptionChange}
                onDelete={handleOptionRemove}
              />
            ))}
          </div>
          <div className="row pt-3">
            <div className="col-sm-12">
              <label className="option-label">[Answer]</label>
              <select
                defaultValue=""
                className="option-dropdown"
                style={{
                  width: "max-content",
                  marginTop: ".2em",
                  marginLeft: ".5em",
                  color: "var(--quizden-bg-dark)",
                }}
                onChange={handleSelectAnswer}
              >
                <option value="" disabled hidden>
                  Select Answer
                </option>
                {question.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id + 1 + ": " + option.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <button
            className="remove-button"
            onClick={() => props.onRemove(question.id)}
          >
            <Emoji emoji="🗑️" /> Remove
          </button>
          <button
            className="add-button"
            onClick={() => props.onAddOption(question.id)}
          >
            <Emoji emoji="✍️" /> Add Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
