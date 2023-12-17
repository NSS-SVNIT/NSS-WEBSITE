// import React from "react";
// import "./ButtonReadMore.css";

// function ButtonReadMore() {
//   return (
//     <div>
//       <a class="fancy" href="#">
//         <span class="top-key"></span>
//         <span class="text">Read More</span>
//         <span class="bottom-key-1"></span>
//         <span class="bottom-key-2"></span>
//       </a>
//     </div>
//   );
// }

// export default ButtonReadMore;
import React from "react";
import "./ButtonReadMore.css";

function ButtonReadMore({ onClick }) {
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
}

export default ButtonReadMore;
