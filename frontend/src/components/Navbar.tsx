/* eslint-disable max-len */
import { Nav, NavDropdown } from 'react-bootstrap';
import { scroller } from 'react-scroll';
import { useViewportWidth } from '../hooks/useViewportWidth';
import { ReactComponent as NetherlandsFlag } from '../static/icons/netherlands-flag.svg';
import { ReactComponent as CanadaFlag } from '../static/icons/canada-flag.svg';
import { ReactComponent as FranceFlag } from '../static/icons/france-flag.svg';
import { ReactComponent as GermanyFlag } from '../static/icons/germany-flag.svg';
import { ReactComponent as SpainFlag } from '../static/icons/spain-flag.svg';
import { useLanguage } from '../context/languageContext';
import { ELanguage } from '../static/text';

export const scrollTo = (to: string, offset = 0) => {
  scroller.scrollTo(to, { smooth: true, spy: true, offset });
};

export const Navbar = () => {
  const { getText, language, setLanguage } = useLanguage();

  const width = useViewportWidth();
  const mobile = width < 579;

  const languageToFlagMap: Record<ELanguage, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
    [ELanguage.Dutch]: NetherlandsFlag,
    [ELanguage.English]: CanadaFlag,
    [ELanguage.French]: FranceFlag,
    [ELanguage.German]: GermanyFlag,
    [ELanguage.Spanish]: SpainFlag,
  };

  const CurrentFlag = languageToFlagMap[language];

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
        <NavDropdown
          title={
            <>
              {<CurrentFlag style={{ width: '2rem', height: '2rem' }} />}
              {getText('nav-language')}
            </>
          }
          id="language-dropdown"
          className="nav-languages"
        >
          {
            Object.keys(ELanguage)
              .map((key) => {
                const languageVariant = ELanguage[key as keyof typeof ELanguage];
                const Flag = languageToFlagMap[languageVariant];

                return (
                  <NavDropdown.Item onClick={() => setLanguage(languageVariant)}>
                    <Flag style={{ width: '2rem', height: '2rem' }} />
                    {getText(`nav-${languageVariant}`)}
                  </NavDropdown.Item>
                );
              })
          }
        </NavDropdown>
      </Nav>
    </div>
  );
};
