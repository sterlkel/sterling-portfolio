import { swingImgPath } from "@/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <Grid
      container
      id="projects"
      className="h-screen"
      justifyContent={"center"}
      direction={"column"}
    >
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <h1 className="text-white text-center font-mont">My Projects</h1>
        </Stack>
        <Stack direction={"row"} justifyContent="space-around" className="mt-4">
          <ProjectCard isSwing />
          <ProjectCard isSwing={false} />
        </Stack>
      </Container>
    </Grid>
  );
};

export default Projects;
