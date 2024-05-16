import { Timeline } from "@mui/lab";
type BaseTimelineProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};
const BaseTimeline = ({ id, className, children }: BaseTimelineProps) => {
  return <Timeline position="alternate" id={id} className={className}>{children}</Timeline>;
};

export default BaseTimeline;
