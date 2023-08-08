"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import { Nav, Navbar } from "react-bootstrap";
import "../scss/custom.scss";
import { About, Contact, Projects, Resume } from "@/components";
import Banner from "@/components/Banner";

const CustomNavBar = () => {
  return (
    <Navbar fixed="top" className="bg-success">
      <Container className="d-flex">
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
      </Container>
    </Navbar>
  );
};

export default function Home() {
  return (
    <div className="bg-primary bg-gradient">
      <div>
        <CustomNavBar />
        <Banner />
        <About />
        <Resume />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}
