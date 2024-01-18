export type ExperienceType = {
  title: string;
  company: string;
  iconSrc: string;
  date: string;
  details: string[];
};

export type EducationType = {
  school: string;
  gradYear: string;
  degree: string;
};

export type ResumeRouteTypes = "exp" | "edu" | "skills";
