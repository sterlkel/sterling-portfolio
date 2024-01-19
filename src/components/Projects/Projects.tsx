"use client";
import { Container, Grid, Stack } from "@mui/material";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <Grid
      container
      id="projects"
      className="h-screen bg-secondary"
      justifyContent={"center"}
      direction={"column"}
    >
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <h1 className="text-white text-center">My Projects</h1>
        </Stack>
        <Stack direction={"row"} justifyContent="space-around" className="mt-4">
          <ProjectCard
            isSwing
            linkUrl="https://www.amazon.com/Jato-Lee-Chronicles-Book-One/dp/1602648085"
          />
          <ProjectCard
            isSwing={false}
            linkUrl="https://www.instagram.com/swingcampaign/"
          />
        </Stack>
      </Container>
    </Grid>
  );
};

export default Projects;
