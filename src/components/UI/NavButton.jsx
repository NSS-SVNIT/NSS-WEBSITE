import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export default function NavButton(props) {
  return (
    <NavLink to={props.to}>
      {({ isActive, isPending }) => (
        <Button
          sx={{
            textDecoration: "none",
            color: "black",
            borderBottom: isActive ? "1px  solid" : "",
            borderRadius: 0,
          }}
        >
          {props.children}
        </Button>
      )}
    </NavLink>
  );
}
