import ResumeButtonGroup from "@/components/Resume/ResumeButtonGroup";
import ResumeDownloadButton from "@/components/Resume/ResumeDownloadButton";
import { Container } from "@mui/material";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-primary" id="resume">
      <Container className="d-flex flex-column">
        <Link href="/resume">
          <h1 className="text-center text-white pt-5 mt-5 hover:scale-110">My Resume</h1>
        </Link>
        <ResumeButtonGroup />
        <ResumeDownloadButton />
        <Container>{children}</Container>
      </Container>
    </div>
  );
}
