import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Box } from "@mui/material";

export default function Layout(props) {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
}
