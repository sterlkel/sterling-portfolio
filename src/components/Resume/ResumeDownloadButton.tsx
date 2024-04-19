"use client";

import { Button } from "@mui/material";
import Image from "next/image";

const ResumeDownloadButton = () => (
  <Button
    variant="contained"
    className="text-white font-mulish bg-secondary w-100 hover:scale-105"
    download
    href="/resume.pdf"
  >
    MY RESUME
    <Image src="/download.png" alt="download" height={25} width={25} className="ml-3" />
  </Button>
);

export default ResumeDownloadButton;
