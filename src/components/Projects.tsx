import Image from "next/image";
const Projects = () => {
  return (
    <div>
      <h1>My Projects</h1>
      <div>
        <div>
          <Image
            src={"/swingIcon1.png"}
            height={25}
            width={25}
            alt="Swing Campaign"
          />
          <h3>Swing Campaign</h3>
        </div>
        <div>
          <Image src="/unknown.png" height="200" width="125" alt="unknown" />
          <h3>The Unknown</h3>
          <p>Sterlng's only published fantasy novel! Check it out on Amazon!</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
