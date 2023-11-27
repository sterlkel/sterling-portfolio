import { Container, Stack } from "@mui/material";
// import { Cursor, useTypewriter } from "react-simple-typewriter";
import Image from "next/image";
import BannerText from "./BannerText";

const Banner = () => {
  return (
    <div className="blurCorners">
      <Container id="home">
        <Stack
          direction={"row"}
          className="d-flex justify-content-between h-screen"
        >
          <BannerText />
          <div className="my-auto">
            <Image
              src="/bannerImage.png"
              width={433}
              height={323}
              alt="desktop"
              className="rounded"
            />
          </div>
        </Stack>
      </Container>
    </div>
  );
};

export default Banner;
