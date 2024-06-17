import { EducationType } from "@/types";
import { Card, CardContent, CardHeader, Collapse, Container, Stack } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import CollapseButton from "@/components/ui/CollapseButton";

type EducationCardProps = Pick<EducationType, "degree" | "school"> & {
  showYear: () => void;
  hideYear: () => void;
};

const EducationCard = ({ degree, school, showYear, hideYear }: EducationCardProps) => {
  const isCornell = school.includes("Cornell");
  const isAMSA = school.includes("Advanced");
  const linkUrl = isCornell
    ? "https://www.cornell.edu/"
    : isAMSA
      ? "https://www.amsacs.org/"
      : "";

  const [isExpanded, setIsExpanded] = useState(false);

  const renderCornellCourseList = () => {
    const courseList = [
      "Java Programming and Data Structures",
      "Advanced Web Design",
      "Computer Science: Discrete Structures",
      "Business Law",
      "Engineering Probability and Statistics",
      "Networks II: Market Design",
      "Intro to Game Theory",
      "Privacy and Security in the Data Economy",
      "Good Tech Bad Tech: The Ethics of Emerging Technologies",
      "Information Ethics Law and Policy",
      "Design for Social Impact"
    ];
    const splitIndex = 5
    const firstHalf = courseList.slice(0, splitIndex);
    const secondHalf = courseList.slice(splitIndex);
    const renderListFromArray = (list: string[]) => {
      return (
        <ul>
          {list.map((name, index) => (<li className="my-2" key={index}>{name}</li>))}
        </ul>
      )
    }
    return (
      <Stack direction={"row"}>
        <div>
          {renderListFromArray(firstHalf)}
        </div>
        <div>
          {renderListFromArray(secondHalf)}
        </div>
      </Stack>
    )
  }
  return (
    <div onMouseEnter={() => showYear()} onMouseLeave={() => hideYear()}>
      <Card className="bg-secondary hover:scale-105 resumeCard">
        <Link href={linkUrl} className="text-decoration-none" target="_blank">
          <CardHeader
            title={school}
            subheader={degree}
            className="font-mulish text-start text-decoration-none text-white"
          />
        </Link>
        {isCornell && <CardContent>
          <div>
            <Stack direction="row">
              <h5 className="text-primary">
                Classes
              </h5>
              <CollapseButton isExpanded={isExpanded} toggleIsExpanded={() => setIsExpanded(!isExpanded)} />
            </Stack>
            <Collapse in={isExpanded} timeout={"auto"} unmountOnExit>
              <Container className="bg-primary rounded">
                {renderCornellCourseList()}
              </ Container>
            </Collapse>
          </div>
        </CardContent>}
      </Card>
    </div>
  );
};

export default EducationCard;
