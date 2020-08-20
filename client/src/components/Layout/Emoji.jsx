import React from "react";

const Emoji = (props) => {
  return (
    <span role="img" aria-label="emoji">
      {props.emoji}
    </span>
  );
};

export default Emoji;
