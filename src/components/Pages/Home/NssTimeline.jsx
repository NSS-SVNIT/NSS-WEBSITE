import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const NssTimeline = React.memo(() => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent>2018</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>We Start as Self Financed Unit (SFU)</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>2018</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>First Recruitment</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>September 2022</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Received Funding from Government.</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>2022</TimelineOppositeContent>
        <TimelineDot />
        <TimelineContent>200 Members</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
});

export default NssTimeline;
