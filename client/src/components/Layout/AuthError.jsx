import React from "react";

const AuthError = (props) => {
  return (
    <div className="row mt-4">
      <div className="col-sm-4 offset-sm-4">
        <span role="img" aria-label="grin-face">
          😬
        </span>{" "}
        <span
          className="input-label"
          style={{
            color: "hotpink",
          }}
        >
          {props.text}
        </span>
      </div>
    </div>
  );
};

export default AuthError;
