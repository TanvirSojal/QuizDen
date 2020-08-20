import React from "react";

const CountBox = (props) => {
  return (
    <React.Fragment>
      <div className="count-title">{props.title}</div>
      <div className="count-number">{props.number}</div>
    </React.Fragment>
  );
};

export default CountBox;
