import React from "react";
import Emoji from "../Layout/Emoji";

const DemoButton = () => {
  return (
    <React.Fragment>
      <button
        className="button demo-button mb-5"
        style={{
          fill: "blue",
        }}
      >
        <Emoji emoji="💻" /> Watch Demo
      </button>
    </React.Fragment>
  );
};

export default DemoButton;
