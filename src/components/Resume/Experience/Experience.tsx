"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import Image from "next/image";
import { experiences } from "@/constants";
import ExperienceCard from "./ExperienceCard";
import { Button, Container } from "@mui/material";

const Experience = () => {
  return (
    <Container className="h-100">
      <VerticalTimeline className="vertical-timeline-custom-line">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
        <VerticalTimelineElement
          contentStyle={{
            background: "#eaeaec",
            color: "#292929",
          }}
          contentArrowStyle={{
            borderRight: "7px solid  #232631",
          }}
          icon={<Image src="/resume.png" height={50} width={50} alt="resume" />}
        >
          <Button
            onClick={() =>
              window.open(
                "resume link", //paste the link to resume here
                "_blank"
              )
            }
            variant="contained"
            className="text-primary"
          >
            MY RESUME
            <Image src="/download.png" alt="download" height={25} width={25} />
          </Button>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Container>
  );
};

export default Experience;
