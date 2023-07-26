import { Nav } from 'react-bootstrap';
import { scroller } from 'react-scroll';
import { useViewportWidth } from '../hooks/useViewportWidth';
import { getText } from '../static/text';

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
          <p className="nav-link" onClick={() => scrollTo('home')}>{getText('nav-home')}</p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('tour', mobile ? -80 : -50)}>
            {getText('nav-tour')}
          </p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('calendar', mobile ? -110 : -80)}>
            {getText('nav-calendar')}
          </p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('information', mobile ? -80 : -50)}>
            {getText('nav-information')}
          </p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('gallery', mobile ? -80 : -50)}>
            {getText('nav-gallery')}
          </p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('testimonials', mobile ? -80 : -50)}>
            {getText('nav-testimonials')}
          </p>
        </div>
        <div>
          <p className="nav-link" onClick={() => scrollTo('map')}>{getText('nav-map')}</p>
        </div>
      </Nav>
    </div>
  );
};
