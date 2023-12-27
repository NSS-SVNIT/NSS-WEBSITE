import React from "react";
import "./ButtonReadMore.css";

const ButtonReadMore = React.memo(({ onClick }) => {
  return (
    <div>
      <button className="fancy" onClick={onClick}>
        <span className="top-key"></span>
        <span className="text">Read More</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </button>
    </div>
  );
});

export default ButtonReadMore;
