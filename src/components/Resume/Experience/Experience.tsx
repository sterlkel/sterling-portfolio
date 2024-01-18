"use client";

import { VerticalTimeline } from "react-vertical-timeline-component";
import { experiences } from "@/constants";
import ExperienceCard from "./ExperienceCard";
import { Container } from "@mui/material";
import ResumeCardTimelineElement from "./ResumeCardTimelineElement";

const Experience = () => {
  return (
    <Container className="h-100">
      <VerticalTimeline className="vertical-timeline-custom-line">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
        <ResumeCardTimelineElement />
      </VerticalTimeline>
    </Container>
  );
};

export default Experience;
