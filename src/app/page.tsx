"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { About, Contact, Projects, Resume } from "@/components";
import Banner from "@/components/Banner";

const CustomNavBar = () => {
  return (
    <Navbar>
      <Navbar.Brand href="#home">
        <Image src="/stingray.png" height={48} width={48} alt="stingray" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#resume">Resume</Nav.Link>
          <Nav.Link href="#projects">Projects</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default function Home() {
  return (
    <div className="bg-primary bg-gradient">
      <Container>
        <CustomNavBar />
        <Banner />
        <About />
        <Resume />
        <Projects />
        <Contact />
      </Container>
    </div>
  );
}
