import React from "react";
import Emoji from "../Layout/Emoji";

const ToolTip = (props) => {
  return (
    <div className="tool-tip">
      <p
        style={{
          fontFamily: `"Roboto", sans-serif`,
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        <Emoji emoji={props.emoji} /> {props.title}
      </p>
      <hr />
      <p
        style={{
          fontFamily: `"Roboto", sans-serif`,
          fontSize: "16px",
        }}
      >
        {props.description}
      </p>
    </div>
  );
};

export default ToolTip;
