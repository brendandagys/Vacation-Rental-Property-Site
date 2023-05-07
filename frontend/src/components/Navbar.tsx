import { Nav } from 'react-bootstrap';

export const Navbar = () => (
  <div className="nav-container">
    <Nav className="navbar" justify>
      <Nav.Item>
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#book">Book</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#availability">Availability</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#information">Information</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#gallery">Gallery</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#testimonials">Testimonials</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#map">Map</Nav.Link>
      </Nav.Item>
    </Nav>
  </div>
);
