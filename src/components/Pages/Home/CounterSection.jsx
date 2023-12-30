import React from "react";
import { Stack, Divider } from "@mui/material";
import Counter from "../../UI/counter";
// import useMediaQuery from "@mui/material/useMediaQuery";

const CounterSection = React.memo(() => {
  const isPhone = false;
  // const isPhone = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Stack
      direction={isPhone ? "column" : "row"}
      justifyContent={"space-around"}
      sx={{
        fontFamily: "Poppins",
        fontWeight: "100",
        fontSize: "4rem",
        bgcolor: "#E1F0EE",
        px: 30,
        py: 5,
      }}
      alignItems={"center"}
    >
      <Counter start={0} end={250} duration={2} title="Volunteers" />
      <Divider orientation="vertical" variant="middle" flexItem />

      <Counter start={0} end={3} duration={2} title="Camps" />
      <Divider orientation="vertical" variant="middle" flexItem />

      <Counter start={0} end={15} duration={2} title="Activities" />
    </Stack>
  );
});

export default CounterSection;
