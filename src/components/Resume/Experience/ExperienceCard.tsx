"use client";

import { ExperienceType } from "@/types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  CardActions,
  Container,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useRef, useState } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import useOutsideAlerter from "@/hooks";

const ExperienceCard = ({ experience }: { experience: ExperienceType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setIsExpanded(false);
  });
  return (
    <VerticalTimelineElement
      contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
      date={experience.date}
      icon={
        <Image
          src={experience.iconSrc}
          alt={experience.company}
          height={50}
          width={50}
        />
      }
      iconStyle={{ height: "45px", width: "45px" }}
      dateClassName="text-white"
    >
      <div ref={wrapperRef}>
        <Card className="bg-gray-300">
          <CardHeader title={experience.title} subheader={experience.company} />
          <CardActions className="justify-content-end">
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </CardActions>
          <Collapse in={isExpanded} timeout={"auto"} unmountOnExit>
            <CardContent>
              <Carousel interval={null}>
                {experience.details.map((detail, index) => (
                  <CarouselItem key={index}>
                    <Container className="px-5 pb-5">
                      <p>{detail}</p>
                    </Container>
                  </CarouselItem>
                ))}
              </Carousel>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
