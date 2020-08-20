import React from "react";
import Emoji from "../Layout/Emoji";
import ToolTip from "./ToolTip";
import { Link } from "react-router-dom";

const Tools = (props) => {
  return (
    <div className={props.classes}>
      <div className="profile-name">{props.title}</div>
      <div className="profile-email">{props.subtitle}</div>
      <div className="row mt-4">
        <div className="card">
          <div className="tooltip-wrapper">
            <Link to="/quiz-builder">
              <button className="tool-button">
                <Emoji emoji="💀" /> Build Quiz
              </button>
            </Link>
            <ToolTip
              emoji="🪓"
              title="Make them suffer!"
              description="Unleash thou wrath unto them poor souls!"
            />
          </div>
        </div>
        <div className="card">
          <div className="tooltip-wrapper">
            <Link to="/quiz-fetcher">
              <button className="tool-button">
                <Emoji emoji="⚔️" /> Attend Quiz
              </button>
            </Link>
            <ToolTip
              emoji="⚰️"
              title="You will not survive!"
              description="Some fates are worse than death!"
            />
          </div>
        </div>
        <div className="card">
          <div className="tooltip-wrapper">
            <button disabled="disabled" className="tool-button grayed">
              <Emoji emoji="🔥" /> Survival (Pro)
            </button>
          </div>
        </div>
        <div className="card">
          <div className="tooltip-wrapper">
            <button disabled="disabled" className="tool-button grayed">
              <Emoji emoji="🩸" /> Slay 'em (Pro)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
