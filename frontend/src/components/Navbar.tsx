import { scrollTo } from "../utils/scroll";
import { Nav, NavDropdown } from "react-bootstrap";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { ReactComponent as NetherlandsFlag } from "../static/icons/netherlands-flag.svg";
import { ReactComponent as UnitedKingdomFlag } from "../static/icons/united-kingdom-flag.svg";
import { ReactComponent as FranceFlag } from "../static/icons/france-flag.svg";
import { ReactComponent as GermanyFlag } from "../static/icons/germany-flag.svg";
import { ReactComponent as SpainFlag } from "../static/icons/spain-flag.svg";
import { useLanguage } from "../context/languageContext";
import { ELanguage } from "../static/text";

export const Navbar = () => {
  const { getText, language, setLanguage } = useLanguage();

  const { mobile } = useViewportWidth();

  const languageToFlagMap: Record<
    ELanguage,
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  > = {
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
        {!mobile && (
          <>
            <div className="nav-item" onClick={() => scrollTo("home")}>
              <p className="nav-link">{getText("nav-home")}</p>
            </div>
            <div
              className="nav-item"
              onClick={() => scrollTo("tour", mobile ? -115 : -50)}
            >
              <p className="nav-link">{getText("nav-tour")}</p>
            </div>
            <div
              className="nav-item"
              onClick={() => scrollTo("calendar", mobile ? -145 : -80)}
            >
              <p className="nav-link">{getText("nav-calendar")}</p>
            </div>
            <div
              className="nav-item"
              onClick={() => scrollTo("information", mobile ? -115 : -50)}
            >
              <p className="nav-link">{getText("nav-information")}</p>
            </div>
            <div
              className="nav-item"
              onClick={() => scrollTo("gallery", mobile ? -115 : -50)}
            >
              <p className="nav-link">{getText("nav-gallery")}</p>
            </div>
            <div
              className="nav-item"
              onClick={() => scrollTo("testimonials", mobile ? -115 : -50)}
            >
              <p className="nav-link">{getText("nav-testimonials")}</p>
            </div>
            <div className="nav-item" onClick={() => scrollTo("map")}>
              <p className="nav-link">{getText("nav-map")}</p>
            </div>
          </>
        )}
        <NavDropdown
          title={
            <>
              {
                <CurrentFlag
                  style={{ height: "2rem", marginBottom: 2.4, width: "2rem" }}
                />
              }
              {getText("nav-language")}
            </>
          }
          id="language-dropdown"
          className="nav-languages"
        >
          {Object.keys(ELanguage).map((key) => {
            const languageVariant = ELanguage[key as keyof typeof ELanguage];
            const Flag = languageToFlagMap[languageVariant];

            return (
              <NavDropdown.Item
                key={key}
                onClick={() => setLanguage(languageVariant)}
              >
                <Flag
                  style={{ width: "2rem", marginBottom: 2, height: "2rem" }}
                />
                {getText(`nav-${languageVariant}`)}
              </NavDropdown.Item>
            );
          })}
        </NavDropdown>
      </Nav>
    </div>
  );
};
