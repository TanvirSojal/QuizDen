import React from "react";
import QuizDenLogo from "../../assets/Logo.svg";

const Icon = (props) => {
  return (
    <React.Fragment>
      <img
        src={QuizDenLogo}
        style={{
          width: props.size,
        }}
        alt="QuizDen Logo"
      />
    </React.Fragment>
  );
};

export default Icon;
