import { technologies } from "@/constants";
import { Container } from "@mui/material";
import Image from "next/image";

const Skills = () => {
  return (
    <div>
      <h1 className="text-white">Skills and Interests</h1>
      <div>
        <h3 className="text-white">Computer Languages</h3>
        <div className="d-flex flex-row bg-secondary justify-content-between px-4 rounded">
          {technologies.map((tech, index) => (
            <div key={index} className="mx-2 mt-2 mb-4 font-mulish text-white">
              {tech.name}
              <Image
                src={tech.icon}
                height={25}
                width={25}
                alt={tech.name}
                className="mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-white mt-3">Other Interests</h3>
        <Container className="bg-secondary rounded py-2 mt-4">
          <p className="text-white">
            Sterling is an intermediate Spanish speaker, and recollects some
            introductory Japanese from his time studying the language during his
            freshman year of college. He is also a major Celtics fan, likes to
            get in the gym from the time, and enjoys reminiscing on his time
            competing in Track & Field. Travel is a love of his as well, and
            nothing accompanies a long flight like a fantastic film!
          </p>
        </Container>
      </div>
    </div>
  );
};

export default Skills;
