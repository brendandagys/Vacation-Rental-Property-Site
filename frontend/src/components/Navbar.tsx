import { scrollTo } from '../utils/scroll';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useViewportWidth } from '../hooks/useViewportWidth';
import { ReactComponent as NetherlandsFlag } from '../static/icons/netherlands-flag.svg';
import { ReactComponent as UnitedKingdomFlag } from '../static/icons/united-kingdom-flag.svg';
import { ReactComponent as FranceFlag } from '../static/icons/france-flag.svg';
import { ReactComponent as GermanyFlag } from '../static/icons/germany-flag.svg';
import { ReactComponent as SpainFlag } from '../static/icons/spain-flag.svg';
import { useLanguage } from '../context/languageContext';
import { ELanguage } from '../static/text';

export const Navbar = () => {
  const { getText, language, setLanguage } = useLanguage();

  const { mobile } = useViewportWidth();

  const languageToFlagMap: Record<ELanguage, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
    [ELanguage.Dutch]: NetherlandsFlag,
    [ELanguage.English]: UnitedKingdomFlag,
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
              {<CurrentFlag style={{ height: '2rem', marginBottom: 2.4, width: '2rem' }} />}
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
                  <NavDropdown.Item key={key} onClick={() => setLanguage(languageVariant)}>
                    <Flag style={{ width: '2rem', marginBottom: 2, height: '2rem' }} />
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
