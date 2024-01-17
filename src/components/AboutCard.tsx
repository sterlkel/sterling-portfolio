"use client";

import { aboutText, githubUrl, linkedInUrl } from "@/constants";
import { Card, CardContent, Container, IconButton, Stack } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import LinkedIn from "@mui/icons-material/LinkedIn";

const AboutIconCards = () => {
  return ["github", "linkedIn"].map((icon, index) => (
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
};

const AboutCard = () => {
  return (
    <Card className="bg-secondary hasBgImage mt-5">
      <CardContent>
        <Container className="d-flex py-5">
          <Stack className="justify-content-center px-5" spacing={4}>
            <Stack className="mb-5">
              <h1 className="mb-3 text-white">About</h1>
              <p className="text-white lead">{aboutText}</p>
            </Stack>
            <Container>
              <h3 className="mb-4 text-white">Find me on:</h3>
              <Stack direction={"row"} spacing={2} justifyContent="center">
                <AboutIconCards />
              </Stack>
            </Container>
          </Stack>
        </Container>
      </CardContent>
    </Card>
  );
};

export default AboutCard;
