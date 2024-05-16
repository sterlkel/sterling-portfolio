import { newerExperiences, olderExperiences } from "@/constants";
import { ExperienceType } from "@/types";
import ExperienceCard from "./ExperienceCard";
import { BaseTimeline, BaseTimelineItem } from "@/components/ui";

type ExperienceTimelineItemProps = {
  experience: ExperienceType;
};

const ExperienceTimelineItem = ({
  experience,
}: ExperienceTimelineItemProps) => {
  const { date, details, title, company } = experience;
  return (
    <BaseTimelineItem
      separatorText={date}
      timelineCard={
        <ExperienceCard title={title} company={company} details={details} />
      }
    />
  );
};

type ExperienceTimelineProps = {
  isFirstPart: boolean;
};

const ExperienceTimeline = ({ isFirstPart }: ExperienceTimelineProps) => {
  const currExperiences = isFirstPart ? newerExperiences : olderExperiences;

  const renderExperiences = () =>
    currExperiences.map((experience, index) => (
      <ExperienceTimelineItem experience={experience} key={index} />
    ));
  return <BaseTimeline id="experienceTimeline" className="justify-content-evenly resumeTimeline">{renderExperiences()}</BaseTimeline>;
};

export default ExperienceTimeline;
