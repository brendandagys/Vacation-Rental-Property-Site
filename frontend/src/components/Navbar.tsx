import { Nav } from 'react-bootstrap';
import { scroller } from 'react-scroll';
import { useViewportWidth } from '../hooks/useViewportWidth';

export const scrollTo = (to: string, offset = 0) => {
  scroller.scrollTo(to, { smooth: true, spy: true, offset });
};

export const Navbar = () => {
  const width = useViewportWidth();
  const mobile = width < 579;

  return (
    <div className="nav-container">
      <Nav className="navbar">
        <div>
          <p className="nav-link" onClick={() => scrollTo('home')}>Home</p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('tour', mobile ? -80 : -50)}>Tour</p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('calendar', mobile ? -110 : -80)}>Calendar</p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('information', mobile ? -80 : -50)}>Information</p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('gallery', mobile ? -80 : -50)}>Gallery</p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('testimonials', mobile ? -80 : -50)}>
            Testimonials
          </p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('map')}>Map</p>
        </div>
      </Nav>
    </div>
  );
};
