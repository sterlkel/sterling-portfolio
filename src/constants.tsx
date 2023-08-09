import { EducationType, ExperienceType } from "./types";

export const githubUrl = "https://github.com/sterlkel";

export const linkedInUrl =
  "https://www.linkedin.com/in/sterling-kelly-2970241b0/";

export const experiences: ExperienceType[] = [
  {
    title: "Full Stack Software Engineer",
    company: "Bonterra",
    iconSrc: "/bonterraIcon1.png",
    date: "Sep 2021 - Present",
    details: [
      "Utilized C#, React, and SQL to develop new features for the Mobile Messaging and Process Automation applications of the NGP VAN Action Platform CRM and API as part of an Agile Development Team.",
      `Orchestrated front end refactoring projects to streamline the structure and flow of stateful information for both applications through the implementation of newer suggested patterns within Redux including slices and selectors.`,
      `Produced automated tests using the Selenium framework that simulate a normal user workflow to ensure that the Mobile Messaging application behaves as expected.`,
      `Collaborated to plan and release an integration with a new payment system on an expedited timeline, while developing the onboarding segment of the work.`,
    ],
  },
  {
    title: "Co-Founder & CEO",
    company: "Swing Campaign",
    iconSrc: "/swingIcon1.png",
    date: "Mar 2020 - Jan 2022",
    details: [
      `Founded Swing Campaign, where we developed an app that raised awareness around one’s representatives and gave an idea of who best represented the user. `,
      `Employed React Native and the Django Framework to write most of the code and lead the design team.`,
      `Held user interviews to gauge feedback on the app and coordinated meetings for the Marketing, Political Outreach, and Dev Teams.`,
    ],
  },
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

export const technologies = [
  {
    name: "HTML 5",
    icon: "/html.png",
  },
  {
    name: "CSS 3",
    icon: "/css.png",
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
    name: "React JS",
    icon: "/reactjs.png",
  },
  {
    name: "Redux Toolkit",
    icon: "/redux.png",
  },
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
