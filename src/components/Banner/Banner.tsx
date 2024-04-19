import { Card, CardContent, Container, Stack } from "@mui/material";
import Image from "next/image";
import BannerText from "./BannerText";

const BannerCard = () => {
  return (
    <Card id="bannerCard" className="bg-secondary mx-auto my-auto py-4 px-5 w-5/6" raised>
      <CardContent className="">
        <Stack
          direction={"row"}
          className="d-flex justify-content-between py-3"
        >
          <BannerText />
          <div className="my-auto ml-5">
            <Image
              src="/Sterling.jpg"
              width={350}
              height={283}
              alt="desktop"
              className="rounded my-auto ml-5"
            />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Banner = () => {
  return (
    <div className="bg-primary h-screen">
      <Container id="home" className="h-screen d-flex justify-content-center">
        <BannerCard />
      </Container>
    </div>
  );
};

export default Banner;
