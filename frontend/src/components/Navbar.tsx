import { Nav } from 'react-bootstrap';
import { scroller } from 'react-scroll';

const scrollTo = (to: string, offset = 0) => {
  scroller.scrollTo(to, { smooth: true, spy: true, offset });
};

export const Navbar = () => (
  <div className="nav-container">
    <Nav className="navbar">
      <div>
        <p className="nav-link" onClick={() => scrollTo('home')}>Home</p>
      </div>
      <div>
        <p className="nav-link" onClick={() => scrollTo('tour', -50)}>Tour</p>
      </div>
      <div>
        <p className="nav-link" onClick={() => scrollTo('calendar', -80)}>Calendar</p>
      </div>
      <div>
        <p className="nav-link" onClick={() => scrollTo('information', -35)}>Information</p>
      </div>
      <div>
        <p className="nav-link" onClick={() => scrollTo('gallery', -50)}>Gallery</p>
      </div>
      <div>
        <p className="nav-link" onClick={() => scrollTo('testimonials', -50)}>Testimonials</p>
      </div>
      <div>
        <p className="nav-link" onClick={() => scrollTo('map')}>Map</p>
      </div>
    </Nav>
  </div>
);
