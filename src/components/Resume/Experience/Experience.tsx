import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import Image from "next/image";
import { experiences } from "@/constants";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  return (
    <div>
      <VerticalTimeline className="vertical-timeline-custom-line">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
        <VerticalTimelineElement
          contentStyle={{
            background: "#eaeaec",
            color: "#292929",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          contentArrowStyle={{
            borderRight: "7px solid  #232631",
          }}
          iconStyle={{ background: "#333333" }}
          icon={
            <div className="flex justify-center items-center w-full h-full">
              <Image src="/resume.png" height={25} width={25} alt="resume" />
            </div>
          }
        >
          <button
            className="live-demo flex justify-between 
                sm:text-[18px] text-[14px] text-timberWolf 
                font-bold font-beckman items-center py-5 pl-3 pr-3 
                whitespace-nowrap gap-1 sm:w-[148px] sm:h-[58px] 
                w-[125px] h-[46px] rounded-[10px] bg-jetLight 
                sm:mt-[22px] mt-[16px] hover:bg-battleGray 
                hover:text-eerieBlack transition duration-[0.2s] 
                ease-in-out"
            onClick={() =>
              window.open(
                "resume link", //paste the link to resume here
                "_blank"
              )
            }
          >
            MY RESUME
            <Image src="/download.png" alt="download" height={25} width={25} />
          </button>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default Experience;
