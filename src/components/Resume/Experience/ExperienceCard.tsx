"use client";

import { ExperienceType } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  CardActions,
  Container,
} from "@mui/material";
import { useRef, useState } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import useOutsideAlerter from "@/hooks";
import CollapseButton from "@/components/ui/CollapseButton";

type ExperienceCardProps = Pick<
  ExperienceType,
  "company" | "title" | "details"
>;

const ExperienceCard = ({ title, company, details }: ExperienceCardProps) => {
  const wrapperRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  useOutsideAlerter(wrapperRef, () => {
    setIsExpanded(false);
  });
  return (
    <div ref={wrapperRef}>
      <Card className="bg-secondary">
        <CardHeader
          title={title}
          subheader={company}
          className="text-start text-white resumeCard"
        />
        <Collapse in={isExpanded} timeout={"auto"} unmountOnExit>
          <CardContent>
            <Carousel interval={5000}>
              {details.map((detail, index) => (
                <CarouselItem key={index}>
                  <Container className="px-5 pb-4">
                    <p className="ml-3 text-start text-white">{detail}</p>
                  </Container>
                </CarouselItem>
              ))}
            </Carousel>
          </CardContent>
        </Collapse>
        <CardActions className="justify-content-end">
          <CollapseButton isExpanded={isExpanded} toggleIsExpanded={() => setIsExpanded(!isExpanded)} />
        </CardActions>
      </Card>
    </div>
  );
};

export default ExperienceCard;
