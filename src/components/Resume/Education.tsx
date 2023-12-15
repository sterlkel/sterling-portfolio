"use client";

import { educationData } from "@/constants";
import { EducationType } from "@/types";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

const EducationCard = ({ education }: { education: EducationType }) => {
  return (
    <VerticalTimelineElement>
      <div>
        <h5 className="font-mulish">{education.school}</h5>
        <h3 className="font-mulish">{education.degree}</h3>
        <h4 className="font-mulish">Class of {education.gradYear}</h4>
      </div>
    </VerticalTimelineElement>
  );
};

const Education = () => {
  return (
    <VerticalTimeline className="h-screen">
      {educationData.map((item, index) => (
        <EducationCard education={item} key={index} />
      ))}
    </VerticalTimeline>
  );
};

export default Education;
