"use client";

import { Container } from "@mui/material";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import _ from "lodash";

const CustomNavBar = () => {
  const tabs = ["about", "resume", "projects", "contact"];
  const renderLinks = tabs.map((tab) => {
    return (
      <Nav.Link className={`text-white font-mont`} href={`#${tab}`} key={tab}>
        {_.capitalize(tab)}
      </Nav.Link>
    );
  });
  return (
    <Navbar fixed="top" className={`bg-blue-800 bg-gradient`}>
      <Container className="d-flex">
        <Navbar.Brand href="#home">
          <Image src="/stingray.png" height={48} width={48} alt="stingray" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end text-white">{renderLinks}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavBar;
