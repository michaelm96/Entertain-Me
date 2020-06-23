import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function navbar() {
  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand>
          <Link to={"/"} className="brand">M96 Entertain(Me)nt</Link>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Link to={"/favourites"} className="brand">
            Go to Favourites
          </Link>
        </Nav>
        <Nav className="ml-auto">
          <Link to={"/add"} className="brand">
            Add Movie/Tv Series
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
}
