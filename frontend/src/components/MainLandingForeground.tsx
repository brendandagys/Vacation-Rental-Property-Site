import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as WhatsAppLogo } from "../static/icons/whatsapp.svg";
import { useLanguage } from "../context/languageContext";

interface IMainLandingProps {
  setShowBookingInquiryModal: Dispatch<SetStateAction<boolean>>;
  width: number;
}

export const MainLandingForeground = ({
  setShowBookingInquiryModal,
  width,
}: IMainLandingProps) => {
  const { getText } = useLanguage();

  return (
    <Container fluid="md">
      <Row
        className="flex-column justify-content-between pt-5"
        style={{ minHeight: 700 }}
      >
        <Col xs={12} className="d-flex justify-content-center">
          <div className="main-landing__titles text-center">
            <h1 className="slide-in-up delay-1">
              Calaceite FRONTLINE Vistamar
            </h1>
            {width >= 1100 && (
              <h2 className="slide-in-up delay-2">
                {getText("main-landing-subtitle")}
              </h2>
            )}
          </div>
        </Col>

        <Col
          xs={12}
          className="text-center mb-auto"
          style={{ marginTop: "4rem" }}
        >
          <button
            onClick={() => setShowBookingInquiryModal(true)}
            className="button button--shadow slide-in-up delay-3"
          >
            {getText("main-landing-button")}
          </button>
        </Col>

        <Col xs={12} className="d-flex mb-5 justify-content-center">
          <div className="main-landing__contact-information slide-in-right delay-4">
            <h4>{getText("main-landing-call-to-action")}</h4>

            <h5 className="mt-3">
              <Row className="justify-content-between">
                <Col sm={6} className="align-items-center text-center mt-3">
                  <FontAwesomeIcon
                    className="text-white"
                    icon={faEnvelope}
                    size="lg"
                  />
                  <span style={{ marginLeft: 10 }}>
                    <b>Email: </b>spainfrontline@gmail.com
                  </span>
                </Col>

                <Col sm={6} className="text-center mt-3">
                  <WhatsAppLogo style={{ width: "2rem", height: "2rem" }} />
                  <span style={{ marginLeft: 5 }}>
                    <b>WhatsApp: </b>+1 (416) 779-6411
                  </span>
                </Col>
              </Row>
            </h5>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
