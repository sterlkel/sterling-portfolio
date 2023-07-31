"use client";
import { Container, Stack } from "@mui/material";
import Image from "next/image";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { About, Contact, Projects, Resume } from "@/components";

const CustomNavBar = () => {
  return (
    <Navbar>
      <Navbar.Brand href="#home">
        <Image src="/stingray.png" height={48} width={48} alt="stingray" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

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
    <div>
      <h1>Hi, I'm Sterling Kelly</h1>
      <h2 className="text-4xl font-bold">
        a{text.charAt(0) === "E" ? "n" : ""} <span>{text}</span>
        <Cursor cursorBlinking={false} cursorStyle="|" cursorColor="#ff014f" />
      </h2>
    </div>
  );
};

const CustomBanner = () => {
  return (
    <Stack direction={"row"}>
      <BannerText />
      <Image src="/bannerImage.png" width={533} height={403} alt="desktop" />
    </Stack>
  );
};

export default function Home() {
  return (
    <div>
      <Container>
        <CustomNavBar />
        <CustomBanner />
        <About />
        <Resume />
        <Projects />
        <Contact />
      </Container>
    </div>
  );
}
