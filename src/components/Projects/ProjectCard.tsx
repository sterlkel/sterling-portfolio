import { swingImgPath } from "@/constants";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import Link from "next/link";

const ProjectCard = ({
  isSwing,
  linkUrl,
}: {
  isSwing: boolean;
  linkUrl: string;
}) => {
  const unknownImg = "/unknown.png";
  const swingData = {
    image: swingImgPath,
    title: "Swing Campaign",
    body: "A platform that was designed to raise political awareness",
  };

  const unknownData = {
    image: unknownImg,
    title: "The Unknown",
    body: `Sterling's only published fantasy novel! Check it out on Amazon!`,
  };

  const currData = isSwing ? swingData : unknownData;

  return (
    <Link
      className="d-flex justify-content-center flex-column w-25"
      href={linkUrl}
    >
      <Card className="bg-primary d-flex justify-content-center flex-column">
        <CardHeader
          title={currData["title"]}
          className="text-white font-mont text-center"
        />
        <CardMedia
          image={currData["image"]}
          component={"img"}
          className={`w-50 py-${isSwing ? "5" : "3"} align-self-center`}
        />
        <CardContent>
          <p className="text-white">{currData["body"]}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
