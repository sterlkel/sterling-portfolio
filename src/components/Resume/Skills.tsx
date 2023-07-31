import { technologies } from "@/constants";
import Image from "next/image";

const Skills = () => {
  return (
    <div>
      <h1>Skills and Interests</h1>
      <div>
        <h3>Computer Languages</h3>
        <div>
          {technologies.map((tech) => (
            <div>
              {tech.name}
              <Image src={tech.icon} height={25} width={25} alt={tech.name} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Other Interests</h3>
        <div>
          <p>
            Sterling is an intermediate Spanish speaker, and recollects some
            introductory Japanese from his time studying the language during his
            freshman year of college. He is also a major Celtics fan, likes to
            get in the gym from the time, and enjoys reminiscing on his time
            competing in Track & Field. Travel is a love of his as well, and
            nothing accompanies a long flight like fantastic film!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
