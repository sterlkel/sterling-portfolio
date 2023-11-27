"use client";
import { aboutText, githubUrl, linkedInUrl } from "@/constants";
import { Card, CardContent, Container, IconButton, Stack } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import LinkedIn from "@mui/icons-material/LinkedIn";

const About = () => {
  const iconButtons = ["github", "linkedIn"].map((icon, index) => (
    <Card key={index}>
      <CardContent>
        <IconButton
          href={icon === "github" ? githubUrl : linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          size="large"
        >
          {icon === "github" ? (
            <GitHub fontSize="large" />
          ) : (
            <LinkedIn fontSize="large" />
          )}
        </IconButton>
      </CardContent>
    </Card>
  ));
  return (
    <div className="bg-secondary d-flex h-screen" id="about">
      <Container className="d-flex">
        <Stack className="justify-content-center px-5" spacing={4}>
          <Stack className="mb-5">
            <h1 className="mb-3 text-white font-mont">About</h1>
            <p className="text-white bodyText font-mulish">{aboutText}</p>
          </Stack>
          <Container>
            <h3 className="mb-4 text-white font-mont">Find me on:</h3>
            <Stack direction={"row"} spacing={2} justifyContent="center">
              {iconButtons}
            </Stack>
          </Container>
        </Stack>
      </Container>
    </div>
  );
};

export default About;
