import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Education from "./Education";
import Skills from "./Skills";
import { useState } from "react";
import Experience from "./Experience";

const Resume = () => {
  const [currTab, setCurrTab] = useState("edu");
  return (
    <div>
      <h1>My Resume</h1>
      <ToggleButtonGroup
        onChange={(event, newValue) => {
          setCurrTab(newValue);
        }}
        value={currTab}
        exclusive
      >
        <ToggleButton value="exp">Experience</ToggleButton>
        <ToggleButton value="edu">Education</ToggleButton>
        <ToggleButton value="ski">Skills and Interests</ToggleButton>
      </ToggleButtonGroup>
      {currTab === "exp" && <Experience />}
      {currTab === "edu" && <Education />}
      {currTab === "ski" && <Skills />}
    </div>
  );
};

export default Resume;
