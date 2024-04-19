"use client";
import { Cursor, useTypewriter } from "react-simple-typewriter";
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
    <div className="d-flex justify-content-center flex-column mb-4 font-mont pr-5 mr-5 w-2/3">
      <p className="text-white h1">
        I'm <span className="text-primary font-bold">Sterling Kelly</span>,
      </p>
      <h3 className="md:text-4xl font-bold text-white">
        a{text.charAt(0) === "E" ? "n" : ""} <span>{text}</span>
        <Cursor cursorBlinking={false} cursorStyle="|" cursorColor="#ff014f" />
      </h3>
    </div>
  );
};

export default BannerText;
