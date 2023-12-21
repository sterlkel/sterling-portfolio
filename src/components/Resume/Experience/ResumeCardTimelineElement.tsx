import { Button } from "@mui/material";
import Image from "next/image";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

const ResumeCardTimelineElement = () => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#eaeaec",
        color: "#292929",
      }}
      contentArrowStyle={{
        borderRight: "7px solid  #232631",
      }}
      icon={<Image src="/resume.png" height={75} width={75} alt="resume" />}
      iconStyle={{ background: "#0c2d48" }}
    >
      <Button
        onClick={() =>
          window.open(
            "resume link", //paste the link to resume here
            "_blank"
          )
        }
        variant="contained"
        className="text-primary font-mulish"
      >
        MY RESUME
        <Image src="/download.png" alt="download" height={25} width={25} />
      </Button>
    </VerticalTimelineElement>
  );
};

export default ResumeCardTimelineElement;
