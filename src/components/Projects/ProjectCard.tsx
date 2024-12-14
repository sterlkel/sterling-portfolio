import { ProjectDataType } from "@/types";
import { Launch } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import Link from "next/link";
import { Tilt } from "react-tilt";

type ProjectCardProps = {
  data: ProjectDataType;
};

const defaultOptions = {
  reverse: false,  // reverse the tilt direction
  max: 35,     // max tilt rotation (degrees)
  perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1,    // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000,   // Speed of the enter/exit transition
  transition: true,   // Set a transition on enter/exit.
  axis: null,   // What axis should be disabled. Can be X or Y.
  reset: true,    // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const ProjectCard = ({ data }: ProjectCardProps) => {
  const { image, title, body, url } = data;
  const isSwing = title === "Swing Campaign";

  return (
    <Link
      className="d-flex justify-content-center flex-column w-25 hover:scale-105"
      href={url}
    >
      <Tilt options={defaultOptions} >
        <Card className="bg-primary d-flex justify-content-center flex-column shouldFade" style={{ minHeight: '420px' }}>
          <CardHeader
            title={title}
            className="text-white font-mont text-center"
          />
          <CardMedia
            image={image}
            component={"img"}
            className={`w-50 py-${isSwing ? "5" : "3"} align-self-center`}
          />
          <CardContent>
            <p className="text-white">
              {body}
              <Launch className="ml-1" />
            </p>
          </CardContent>
        </Card>
      </Tilt>
    </Link>
  );
};

export default ProjectCard;
