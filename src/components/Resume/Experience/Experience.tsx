"use client";

import { Container } from "@mui/material";
import { useState } from "react";
import ExperienceExpandCollapse from "./ExperienceExpandCollapse";
import ExperienceTimeline from "./ExperienceTimeline";

// need some kind of animation to slide down the timeline when see more or see less is clicked
// should see if i can scale down and fade simultaneously
const Experience = () => {
  const [isRecentPart, setIsRecentPart] = useState(true);
  return (
    <Container className="bg-primary h-100">
      {!isRecentPart && (
        <ExperienceExpandCollapse
          isFirstPart={isRecentPart}
          setIsFirstPart={setIsRecentPart}
        />
      )}
      <ExperienceTimeline isFirstPart={isRecentPart} />
      {isRecentPart && (
        <ExperienceExpandCollapse
          isFirstPart={isRecentPart}
          setIsFirstPart={setIsRecentPart}
        />
      )}
    </Container>
  );
};

export default Experience;
