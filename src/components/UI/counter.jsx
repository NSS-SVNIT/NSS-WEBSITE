import React, { useState, memo } from "react";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";

const Counter = memo((props) => {
  const [counterOn, setCounter] = useState(false);

  return (
    <ScrollTrigger
      onEnter={() => setCounter(true)}
      onExit={() => setCounter(false)}
    >
      <div
        style={{
          ...props.style,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          {counterOn && (
            <CountUp
              start={props.start}
              end={props.end}
              duration={props.duration}
              delay={0}
            ></CountUp>
          )}
          +
        </div>
        <p
          style={{
            fontFamily: "Poppins",
            fontSize: "1.8rem",
            fontWeight: "300",
          }}
        >
          {props.title}
        </p>
      </div>
    </ScrollTrigger>
  );
});

export default Counter;
