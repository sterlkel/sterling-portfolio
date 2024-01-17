"use client";

import { educationData } from "@/constants";
import { EducationType } from "@/types";
import { Card, CardHeader } from "@mui/material";
import BaseTimelineItem from "../ui/BaseTimelineItem";
import { BaseTimeline } from "../ui";

type EducationCardProps = Pick<EducationType, "degree" | "school">;
// enlarge on hover
// link to each school website on click
const EducationCard = ({ degree, school }: EducationCardProps) => {
  return (
    <Card>
      <CardHeader
        title={school}
        subheader={degree}
        className="font-mulish text-start"
      />
    </Card>
  );
};

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
    <BaseTimeline>
      {educationData.map((item, index) => (
        <EducationTimelineItem education={item} key={index} />
      ))}
    </BaseTimeline>
  );
};

export default EducationTimeline;
