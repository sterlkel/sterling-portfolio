import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
} from "@mui/material";

const Projects = () => {
  return (
    <div className="h-screen d-flex" id="projects">
      <Container className="d-flex flex-column justify-content-center">
        <h1 className="text-white text-center">My Projects</h1>
        <div className="d-flex justify-content-around">
          <Card>
            <CardHeader title="Swing Campaign" />
            <CardMedia
              image="/swingIcon1.png"
              component="img"
              height="35"
              width="35"
            />
          </Card>
          <Card>
            <CardHeader
              title="The Unknown"
              className="justify-content-center"
            />
            <CardContent className="w-50">
              <p>
                Sterling's only published fantasy novel! Check it out on Amazon!
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Projects;
