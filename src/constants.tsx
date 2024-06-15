import { EducationType, ExperienceType, ProjectDataType } from "./types";

export const githubUrl = "https://github.com/sterlkel";

export const linkedInUrl =
  "https://www.linkedin.com/in/sterling-kelly-2970241b0/";

export const swingImgPath = "/swingIcon1.png";

export const unknownImgPath = "/unknown.png";

export const newerExperiences: ExperienceType[] = [
  {
    title: "Full Stack Software Engineer",
    company: "Bonterra",
    iconSrc: "/bonterraIcon1.png",
    date: "Sep 2021 - Present",
    details: [
      "Utilized C#, React, and SQL to develop new features for the Mobile Messaging and Process Automation applications of the NGP VAN Action Platform CRM and API as part of an Agile Development Team.",
      `Orchestrated refactoring projects to streamline the flow of stateful information for both applications through the implementation of suggested patterns within Redux including slices and selectors.`,
      `Produced automated tests using the Selenium framework that simulate a normal user workflow to ensure that the Mobile Messaging application behaves as expected.`,
      `Collaborated to plan and release an integration with a new payment system on an expedited timeline, while developing the onboarding segment of the work.`,
    ],
  },
  {
    title: "Co-Founder & CEO",
    company: "Swing Campaign",
    iconSrc: swingImgPath,
    date: "Mar 2020 - Jan 2022",
    details: [
      `Founded Swing Campaign, where we developed an app that raised awareness around one’s representatives and gave an idea of who best represented the user. `,
      `Employed React Native and the Django Framework to write most of the code and lead the design team.`,
      `Held user interviews to gauge feedback on the app and coordinated meetings for the Marketing, Political Outreach, and Dev Teams.`,
    ],
  },
];

export const olderExperiences: ExperienceType[] = [
  {
    title: "Research Analyst",
    company: "Cornell Communicative and Collaborative Technologies Lab",
    iconSrc: "/cornellIcon1.png",
    date: "June 2019 - Dec 2019",
    details: [
      `Collaborated on a Google Chrome web extension that analyzes a reddit thread and provides a toxicity report on the comments.`,
      `Conducted research to discover what words would be most likely to lead to an argument.`,
      `Analyzed the results of the research to direct the algorithm of the extension.`,
    ],
  },
  {
    title: "Full Stack Software Engineer Intern",
    company: "Cobu (Formerly Doorbell.Me)",
    iconSrc: "/cobuIcon1.png",
    date: "Sep 2022 - Present",
    details: [
      `Improved Doorbell’s Admin Application, creating functions that the operations team requested. `,
      `Questioned residents on what could make the app and their experience better in the future.  `,
      `Hosted a variety of different events for our residents and analyzed various company processes in regards to scalability.`,
    ],
  },
];

export const experiences = newerExperiences.concat(olderExperiences);

type TechnologyType = {
  name: string;
  icon: string;
}

export const technologies: TechnologyType[] = [
  {
    name: "React JS",
    icon: "/reactjs.png",
  },
  {
    name: "C#",
    icon: "/csharp.png"
  },
  {
    name: "Python",
    icon: "/python.svg"
  },
  {
    name:"Django",
    icon:"/django_short.png"
  },
  {
    name: "JavaScript",
    icon: "/javascript.png",
  },
  {
    name: "TypeScript",
    icon: "/typescript.png",
  },
  {
    name: "HTML",
    icon: "/html.png",
  },
  {
    name: "CSS",
    icon: "/css.png",
  },
  {
    name: "SQL Server",
    icon: "/sqlserver.svg"
  },
  {
    name: "Redux Toolkit",
    icon: "/redux.png",
  },
  {
    name: "Bootstrap",
    icon: "/bootstrap.svg"
  },
  // {
  //   name: "TailwindCSS",
  //   icon: "/tailwind.png"
  // },
  {
    name: "Java",
    icon: "/java.svg"
  }
];

export const educationData: EducationType[] = [
  {
    school: "Cornell University",
    gradYear: "2020",
    degree: "B.A. in Information Science",
  },
  {
    school: "Advanced Math & Science Academy",
    gradYear: "2016",
    degree: "High School Diploma",
  },
];

export const aboutText = `Sterling Kelly is a full stack software engineer with a strong passion
for entrepreneurship. He has extensive experience with a variety of
popular coding frameworks and languages, such as React, Django, and
C#. After his time leading Swing Campaign, he is focused on improving
both his technical and soft skills as he eyes his future ventures.`;

const swingData: ProjectDataType = {
  image: swingImgPath,
  title: "Swing Campaign",
  body: "A platform that was designed to raise political awareness",
  url: "https://www.instagram.com/swingcampaign/",
};

const unknownData: ProjectDataType = {
  image: unknownImgPath,
  title: "The Unknown",
  body: `Sterling's only published fantasy novel! Check it out on Amazon!`,
  url: "https://www.amazon.com/Jato-Lee-Chronicles-Book-One/dp/1602648085",
};

export const projectData = [swingData, unknownData];
