"use client";

import { Container } from "@mui/material";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import _ from "lodash";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavBar = () => {
  const tabs = ["resume", "projects", "contact"];
  const pathname = usePathname();
  const renderLinks = tabs.map((tab) => {
    if (["about", "resume", "projects", "contact"].includes(tab)) {
      return (
        <Link
          href={`/${tab}`}
          key={tab}
          className={`font-mont mr-5 ${
            pathname.includes(tab)
              ? "text-secondary"
              : "text-white hover:scale-110"
          }`}
        >
          {_.capitalize(tab)}
        </Link>
      );
    }
    return (
      <Nav.Link className={`text-white font-mont`} href={`#${tab}`} key={tab}>
        {_.capitalize(tab)}
      </Nav.Link>
    );
  });
  return (
    <Navbar id="mainNavBar" fixed="top" className={`bg-primary bg-gradient ${pathname == "/" ? 'shouldFade' : ''}`}>
      <Container className="d-flex">
        <Navbar.Brand href="/">
          <Image
            src="/stingray.png"
            height={48}
            width={48}
            alt="stingray"
            className="hover:scale-125"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end text-white">{renderLinks}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavBar;
