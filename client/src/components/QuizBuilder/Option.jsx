import React, { useCallback, memo } from "react";
import Emoji from "../Layout/Emoji";

const Option = memo((props) => {
  const { onChange, onDelete, id, value } = props;

  const handleOptionChange = useCallback(
    (e) => {
      onChange(id, e.target.value);
    },
    [onChange, id]
  );

  const handleOptionRemove = useCallback(() => {
    onDelete(id);
  }, [onDelete, id]);

  return (
    <div className="col-sm-12">
      <div className="row">
        <div className="col-sm-12">
          <div className="row option-section">
            <div className="card">
              <label className="option-label">{id + 1}</label>
            </div>
            <div className="card">
              <input
                className="option-input"
                type="text"
                value={value}
                onChange={handleOptionChange}
              />
            </div>
            <div className="card">
              <button
                className="remove-option-button"
                onClick={handleOptionRemove}
              >
                <Emoji emoji="⛔️" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Option.displayName = "Option";

export default Option;
