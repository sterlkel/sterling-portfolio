import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

type BaseTimelineItemProps = {
  separatorText: string;
  timelineCard: React.ReactNode;
};
const BaseTimelineItem = ({
  separatorText,
  timelineCard,
}: BaseTimelineItemProps) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent className="text-white font-mulish">
        {separatorText}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>{timelineCard}</TimelineContent>
    </TimelineItem>
  );
};

export default BaseTimelineItem;
