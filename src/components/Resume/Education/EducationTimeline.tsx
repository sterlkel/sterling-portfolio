"use client";

import { educationData } from "@/constants";
import { EducationType } from "@/types";
import EducationCard from "./EducationCard";
import { BaseTimeline, BaseTimelineItem } from "@/components/ui";
import { useState } from "react";

type EducationTimelineItemProps = {
  education: EducationType;
  showYear: boolean;
};

const EducationTimelineItem = ({ education }: EducationTimelineItemProps) => {
  const { gradYear, degree, school } = education;
  const [isYearShown, setIsYearShown] = useState(false);
  const showYear = () => setIsYearShown(true);
  const hideYear = () => setIsYearShown(false);
  return (
    <BaseTimelineItem
      separatorText={isYearShown ? `Class of ${gradYear}` : ''}
      timelineCard={<EducationCard degree={degree} school={school} showYear={showYear} hideYear={hideYear} />}
    />
  );
};

const EducationTimeline = () => {
  return (
    <BaseTimeline id="educationTimeline" className="justify-content-evenly resumeTimeline">
      {educationData.map((item, index) => (
        <EducationTimelineItem education={item} key={index} showYear />
      ))}
    </BaseTimeline>
  );
};

export default EducationTimeline;
