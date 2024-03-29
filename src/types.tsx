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

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFieldTypes = "message" | "email" | "name";
export type ResumeRouteTypes = "exp" | "edu" | "skills";

export type ProjectDataType = {
  image: string;
  title: string;
  body: string;
  url: string;
};
