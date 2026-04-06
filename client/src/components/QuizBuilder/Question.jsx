import React, { useCallback, memo } from "react";
import Emoji from "../Layout/Emoji";
import Option from "./Option";

const Question = memo((props) => {
  const {
    onTitleChange,
    onOptionChange,
    onOptionRemove,
    onSelectAnswer,
    onRemove,
    onAddOption,
    question,
  } = props;

  const handleTitleChange = useCallback(
    (e) => {
      onTitleChange(question.id, e.target.value);
    },
    [onTitleChange, question.id]
  );

  const handleOptionChange = useCallback(
    (opt_id, value) => {
      onOptionChange(question.id, opt_id, value);
    },
    [onOptionChange, question.id]
  );

  const handleOptionRemove = useCallback(
    (opt_id) => {
      onOptionRemove(question.id, opt_id);
    },
    [onOptionRemove, question.id]
  );

  const handleSelectAnswer = useCallback(
    (e) => {
      onSelectAnswer(question.id, parseInt(e.target.value));
    },
    [onSelectAnswer, question.id]
  );

  const handleRemove = useCallback(() => {
    onRemove(question.id);
  }, [onRemove, question.id]);

  const handleAddOption = useCallback(() => {
    onAddOption(question.id);
  }, [onAddOption, question.id]);

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
            onClick={handleRemove}
          >
            <Emoji emoji="🗑️" /> Remove
          </button>
          <button
            className="add-button"
            onClick={handleAddOption}
          >
            <Emoji emoji="✍️" /> Add Option
          </button>
        </div>
      </div>
    </div>
  );
});

Question.displayName = "Question";

export default Question;
