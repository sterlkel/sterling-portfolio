"use client";
import { About, Contact, Projects, Resume } from "@/components";
import Banner from "@/components/Banner";
import CustomNavBar from "@/components/ui/CustomNavBar";

export default function Home() {
  return (
    <>
      <CustomNavBar />
      <Banner />
      <About />
      <Resume />
      <Projects />
      <Contact />
    </>
  );
}
