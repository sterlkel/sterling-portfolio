import ResumeButtonGroup from "@/components/Resume/ResumeButtonGroup";
import ResumeDownloadButton from "@/components/Resume/ResumeDownloadButton";
import { Container } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-primary" id="resume">
      <Container className="d-flex flex-column">
        <h1 className="text-center text-white pt-5 mt-5">My Resume</h1>
        <ResumeButtonGroup />
        <ResumeDownloadButton />
        <Container>{children}</Container>
      </Container>
    </div>
  );
}
