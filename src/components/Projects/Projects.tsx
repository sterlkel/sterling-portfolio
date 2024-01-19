"use client";
import { Container, Grid, Stack } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { projectData } from "@/constants";

const Projects = () => {
  const renderProjectCards = () => {
    return projectData.map((data) => {
      return <ProjectCard data={data} key={data.title} />;
    });
  };
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
          {renderProjectCards()}
        </Stack>
      </Container>
    </Grid>
  );
};

export default Projects;
