import { Container } from "@mui/material";
import Image from "next/image";
const Projects = () => {
  return (
    <div className="h-screen d-flex">
      <Container className="d-flex flex-column justify-content-center">
        <h1 className="text-white text-center" id="projects">
          My Projects
        </h1>
        <div className="d-flex justify-content-around">
          <div className="bg-secondary">
            <Image
              src={"/swingIcon1.png"}
              height={25}
              width={25}
              alt="Swing Campaign"
            />
            <h3>Swing Campaign</h3>
          </div>
          <div className="bg-secondary">
            <Image src="/unknown.png" height="200" width="125" alt="unknown" />
            <h3>The Unknown</h3>
            <p>
              Sterlng's only published fantasy novel! Check it out on Amazon!
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Projects;
