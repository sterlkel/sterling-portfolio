import { Stack } from "@mui/material";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import Image from "next/image";

const BannerText = () => {
  const [text] = useTypewriter({
    words: [
      "Professional Coder.",
      "Entrepreneur.",
      "Software Engineer.",
      "Novelist.",
      "Dreamer.",
    ],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });
  return (
    <div className="d-flex justify-content-center flex-column mb-4">
      <h1>
        Hi, I'm <span className="text-success">Sterling Kelly</span>
      </h1>
      <h2 className="text-4xl font-bold text-white">
        a{text.charAt(0) === "E" ? "n" : ""} <span>{text}</span>
        <Cursor cursorBlinking={false} cursorStyle="|" cursorColor="#ff014f" />
      </h2>
    </div>
  );
};

const Banner = () => {
  return (
    <Stack direction={"row"} className="d-flex justify-content-between my-5">
      <BannerText />
      <Image
        src="/bannerImage.png"
        width={533}
        height={403}
        alt="desktop"
        className="rounded"
      />
    </Stack>
  );
};

export default Banner;
