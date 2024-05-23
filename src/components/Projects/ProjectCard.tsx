import { ProjectDataType } from "@/types";
import { Launch } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import Link from "next/link";

type ProjectCardProps = {
  data: ProjectDataType;
};

const ProjectCard = ({ data }: ProjectCardProps) => {
  const { image, title, body, url } = data;
  const isSwing = title === "Swing Campaign";

  return (
    <Link
      className="d-flex justify-content-center flex-column w-25 hover:scale-105"
      href={url}
    >
      <Card className="bg-primary d-flex justify-content-center flex-column shouldFade">
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
    </Link>
  );
};

export default ProjectCard;
