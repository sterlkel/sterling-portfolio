import { EducationType } from "@/types";
import { Card, CardHeader } from "@mui/material";
import Link from "next/link";

type EducationCardProps = Pick<EducationType, "degree" | "school">;
const EducationCard = ({ degree, school }: EducationCardProps) => {
  const linkUrl = school.includes("Cornell")
    ? "https://www.cornell.edu/"
    : school.includes("Advanced")
    ? "https://www.amsacs.org/"
    : "";
  return (
    <Link href={linkUrl} className="text-decoration-none" target="_blank">
      <Card className="bg-secondary hover:scale-105 resumeCard">
        <CardHeader
          title={school}
          subheader={degree}
          className="font-mulish text-start text-decoration-none text-primary"
        />
      </Card>
    </Link>
  );
};

export default EducationCard;
