import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const NavButton = memo((props) => {
  const { to, scrolling, children } = props;

  return (
    <NavLink to={props.to}>
      {({ isActive }) => (
        <Button
          sx={{
            textDecoration: "none",
            color: scrolling ? "white" : "black",
            borderBottom: isActive ? "1px  solid" : "",
            borderRadius: 0,
          }}
        >
          {props.children}
        </Button>
      )}
    </NavLink>
  );
});

export default NavButton;
