import { Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Education from "./Education";
import Skills from "./Skills";
import { useState } from "react";
import Experience from "./Experience";

const Resume = () => {
  const [currTab, setCurrTab] = useState("exp");
  return (
    <div className="d-flex flex-column hasBgImage h-screen" id="resume">
      <Container className="my-auto d-flex flex-column">
        <h1 className="text-center text-white">My Resume</h1>
        <ToggleButtonGroup
          onChange={(event, newValue) => {
            setCurrTab(newValue);
          }}
          value={currTab}
          exclusive
          className="align-self-center"
        >
          <ToggleButton value="exp">Experience</ToggleButton>
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
