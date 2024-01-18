import { Timeline } from "@mui/lab";
type BaseTimelineProps = {
  children: React.ReactNode;
};
const BaseTimeline = ({ children }: BaseTimelineProps) => {
  return <Timeline position="alternate">{children}</Timeline>;
};

export default BaseTimeline;
