import { Col, Row } from "react-bootstrap";

import { TextContainer } from "./TextContainer";
import { MoreDetailsText } from "./MoreDetailsText";
import {
  secondaryImage,
  tertiaryImage,
  upperPoolAtNightCropped,
} from "../static/images";
import { Amenities } from "./Amenities";
import { AttractionsText } from "./AttractionsText";
import { useLanguage } from "../context/languageContext";
import { FadeInSection } from "./FadeInSection";

export const ContentTiles = () => {
  const { getText } = useLanguage();

  return (
    <div style={{ marginTop: "5rem", paddingBottom: "3rem" }}>
      <FadeInSection>
        <Row
          id="information"
          className="mx-4 content-tiles-row justify-content-evenly"
        >
          <Col
            xs={12}
            md={6}
            className="d-flex align-items-center
          pb-4 pt-4 px-4 px-sm-5 px-md-3 px-lg-4 px-xl-5 my-4
          content-tiles-row__details-list"
          >
            <div className="text-black py-3 py-sm-0">
              <Col xs={12} className="mb-5 text-center">
                <h1>{getText("details-title")}</h1>
              </Col>

              <TextContainer buttonColor="yellow">
                <MoreDetailsText />
              </TextContainer>
            </div>
          </Col>

          <Col
            xs={12}
            md={5}
            className="p-0 d-flex align-items-center bg-transparent my-4"
            style={{ background: "#2a2d38", objectFit: "cover" }}
          >
            <img
              src={secondaryImage.src}
              width="100%"
              alt={secondaryImage.alt}
            />
          </Col>
        </Row>
      </FadeInSection>

      <FadeInSection>
        <Row className="mx-4 justify-content-evenly flex-md-row content-tiles-row">
          <Col
            xs={12}
            md={6}
            className="d-flex align-items-center justify-content-center
          pb-4 pt-4 px-4 px-sm-5 px-md-3 px-lg-5 my-4
          content-tiles-row__amenities"
          >
            <div className="py-3 py-sm-0">
              <Amenities />
            </div>
          </Col>

          <Col
            xs={12}
            md={5}
            className="p-0 d-flex align-items-center bg-transparent my-4"
            style={{ background: "#2a2d38", objectFit: "cover" }}
          >
            <img src={tertiaryImage.src} width="100%" alt={tertiaryImage.alt} />
          </Col>
        </Row>
      </FadeInSection>

      <FadeInSection>
        <Row
          id="information"
          className="mx-4 content-tiles-row justify-content-evenly"
        >
          <Col
            xs={12}
            md={6}
            className="d-flex align-items-center
          pb-4 pt-4 px-4 px-sm-5 px-md-4 px-lg-5 my-4
          content-tiles-row__attractions"
          >
            <div className="text-black py-3 py-sm-0 w-100">
              <Col xs={12} className="mb-5 text-center">
                <h1>{getText("attractions-title")}</h1>
              </Col>

              {/* <TextContainer
              buttonColor='yellow'
              buttonText={(getText('attractions-more-attractions-button') || '').toString()}
            > */}
              <AttractionsText />
              {/* </TextContainer> */}
            </div>
          </Col>

          <Col
            xs={12}
            md={5}
            className="p-0 d-flex align-items-center bg-transparent my-4"
            style={{ background: "#2a2d38", objectFit: "cover" }}
          >
            <img
              src={upperPoolAtNightCropped.src}
              width="100%"
              alt={upperPoolAtNightCropped.alt}
            />
          </Col>
        </Row>
      </FadeInSection>
    </div>
  );
};
