"use client";

import { Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Education from "./Education";
import Skills from "./Skills";
import { useState } from "react";
import Experience from "./Experience";

const ResumeToggleButton = ({
  value,
  children,
}: React.PropsWithChildren<{ value: string }>) => {
  return (
    <ToggleButton value={value} className="text-white border-white">
      {children}
    </ToggleButton>
  );
};

const Resume = () => {
  const [currTab, setCurrTab] = useState("exp");
  const tabs = ["exp", "edu"];

  return (
    <div className="d-flex flex-column bg-primary" id="resume">
      <Container className="d-flex flex-column">
        <h1 className="text-center text-white pt-5 mt-5">My Resume</h1>
        <ToggleButtonGroup
          onChange={(event, newValue) => {
            setCurrTab(newValue);
          }}
          value={currTab}
          exclusive
          className="align-self-center text-white my-3"
        >
          <ResumeToggleButton value="exp">Experience</ResumeToggleButton>
          <ToggleButton value="edu">Education</ToggleButton>
          <ToggleButton value="ski">Skills and Interests</ToggleButton>
        </ToggleButtonGroup>
        {currTab === "exp" && <Experience />}
        {currTab === "edu" && <Education />}
        {currTab === "ski" && <Skills />}
      </Container>
    </div>
  );
};

export default Resume;
