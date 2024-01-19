"use client";

import { Container } from "@mui/material";
import { useState } from "react";
import ExperienceExpandCollapse from "./ExperienceExpandCollapse";
import ExperienceTimeline from "./ExperienceTimeline";

// need some kind of animation to slide down the timeline when see more or see less is clicked
const Experience = () => {
  const [isFirstPart, setIsFirstPart] = useState(true);
  return (
    <Container className="bg-primary">
      {!isFirstPart && (
        <ExperienceExpandCollapse
          isFirstPart={isFirstPart}
          setIsFirstPart={setIsFirstPart}
        />
      )}
      {/* need to center the timeline in the screen */}
      <ExperienceTimeline isFirstPart={isFirstPart} />
      {isFirstPart && (
        <ExperienceExpandCollapse
          isFirstPart={isFirstPart}
          setIsFirstPart={setIsFirstPart}
        />
      )}
    </Container>
  );
};

export default Experience;
