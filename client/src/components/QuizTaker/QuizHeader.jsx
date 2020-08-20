import React from "react";

const QuizHeader = (props) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-12">
          <div className="profile-name">{props.title}</div>
          <div className="profile-email">{props.description}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizHeader;
