import { ExperienceType } from "@/types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Image from "next/image";

const ExperienceCard = ({ experience }: { experience: ExperienceType }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#eaeaec",
        color: "#292929",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid  #232631",
      }}
      date={experience.date}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <Image
            src={experience.iconSrc}
            alt={experience.company}
            height={25}
            width={25}
          />
        </div>
      }
    >
      <div>
        <h3 className="text-jetLight text-[24px] font-bold font-beckman tracking-[2px]">
          {experience.title}
        </h3>
        <p
          className="text-taupe text-[22px] font-semibold font-overcameBold tracking-[1px]"
          style={{ margin: 0 }}
        >
          {experience.company}
        </p>
      </div>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
