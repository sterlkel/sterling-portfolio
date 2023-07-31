import { githubUrl, linkedInUrl } from "@/constants";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>
        Sterling Kelly is a full stack software engineer with a strong passion
        for entrepreneurship. He has extensive experience with a variety of
        popular coding frameworks and languages, such as React, Django, and C#.
        After his time leading Swing Campaign, he is focused on improving both
        his technical and soft skills as he eyes his future ventures.
      </p>
      <div>
        <h2 className="text-base uppercase font-titleFont mb-4">Find me on</h2>
        <div className="flex gap-4">
          <span className="bannerIcon">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <SiGithub height={126} width={126} />
            </a>
          </span>
          <span className="bannerIcon">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn height={126} width={126} />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
