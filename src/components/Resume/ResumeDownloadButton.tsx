"use client";

import { Button } from "@mui/material";
import Image from "next/image";

const ResumeDownloadButton = () => (
  <Button
    onClick={() =>
      window.open(
        "resume link", //paste the link to resume here
        "_blank"
      )
    }
    variant="contained"
    className="text-white font-mulish bg-secondary w-100"
  >
    MY RESUME
    <Image src="/download.png" alt="download" height={25} width={25} />
  </Button>
);

export default ResumeDownloadButton;
