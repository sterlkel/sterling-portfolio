"use client";

import { educationData } from "@/constants";
import { EducationType } from "@/types";
import EducationCard from "./EducationCard";
import { BaseTimeline, BaseTimelineItem } from "@/components/ui";

type EducationTimelineItemProps = {
  education: EducationType;
};

const EducationTimelineItem = ({ education }: EducationTimelineItemProps) => {
  const { gradYear, degree, school } = education;
  return (
    <BaseTimelineItem
      separatorText={`Class of ${gradYear}`}
      timelineCard={<EducationCard degree={degree} school={school} />}
    />
  );
};

const EducationTimeline = () => {
  return (
    <BaseTimeline id="educationTimeline" className="justify-content-evenly resumeTimeline">
      {educationData.map((item, index) => (
        <EducationTimelineItem education={item} key={index} />
      ))}
    </BaseTimeline>
  );
};

export default EducationTimeline;
