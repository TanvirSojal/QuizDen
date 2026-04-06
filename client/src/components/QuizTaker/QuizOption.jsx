import React, { memo } from "react";

const QuizOption = memo((props) => {
  return (
    <div className="col-sm-12">
      <div className="row">
        <div className="col-sm-12">
          <div className="row option-section">
            <div className="card">
              <label className="option-label">{props.id + 1}</label>
            </div>
            <div className="card">
              <input
                className="option-input"
                type="text"
                value={props.value}
                disabled
              />
            </div>
            {/* <div className="card">
              <button
                className="remove-option-button"
                onClick={handleOptionRemove}
              >
                <Emoji emoji="⛔️" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
});

QuizOption.displayName = "QuizOption";

export default QuizOption;
