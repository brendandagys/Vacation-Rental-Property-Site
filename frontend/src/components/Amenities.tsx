import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCoffee,
  faFire,
  faFireBurner,
  faParking,
  faSnowflake,
  faSoap,
  faSpoon,
  faSun,
  faTv,
  faUmbrellaBeach,
  faWaterLadder,
  faWifi,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/languageContext";

export const Amenities = () => {
  const { getText } = useLanguage();

  const amenities = [
    // Terrace / Sun
    {
      icon: faSun,
      label: getText("amenities-terrace"),
      color: "linear-gradient(135deg, #ff851b 0%, #ffd157 100%)",
    },
    // Pools
    {
      icon: faWaterLadder,
      label: getText("amenities-pools"),
      color: "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)",
    },
    // Private Parking (dark slate gradient)
    {
      icon: faParking,
      label: getText("amenities-parking"),
      color: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    },
    // 65" 4K Smart TV (indigo/violet)
    {
      icon: faTv,
      label: getText("amenities-smart-tv"),
      color: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    },
    // Beach
    {
      icon: faUmbrellaBeach,
      label: getText("amenities-beach"),
      color: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    },
    // Internet / Wi‑Fi
    {
      icon: faWifi,
      label: getText("amenities-internet"),
      color: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    },
    // Air Conditioning (cool blue)
    {
      icon: faSnowflake,
      label: getText("amenities-air-conditioning"),
      color: "linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)",
    },
    // Central Heating (warm red)
    {
      icon: faFire,
      label: getText("amenities-central-heating"),
      color: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
    },
    // Washing Machine (green)
    {
      icon: faSoap,
      label: getText("amenities-washing-machine"),
      color: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
    },
    // Drying Machine (slate/blue)
    {
      icon: faWind,
      label: getText("amenities-drying-machine"),
      color: "linear-gradient(135deg, #314755 0%, #26a0da 100%)",
    },
    // Fully Stocked Kitchen (teal)
    {
      icon: faSpoon,
      label: getText("amenities-kitchen"),
      color: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
    },
    // Bosch Appliances (red)
    {
      icon: faFireBurner,
      label: getText("amenities-bosch-appliances"),
      color: "linear-gradient(135deg, #cb2d3e 0%, #ef473a 100%)",
    },
    // Nespresso (coffee tones)
    {
      icon: faCoffee,
      label: getText("amenities-nespresso"),
      color: "linear-gradient(135deg, #603813 0%, #b29f94 100%)",
    },
    // Coffee (slightly different roast)
    {
      icon: faCoffee,
      label: getText("amenities-coffee"),
      color: "linear-gradient(135deg, #4b2b20 0%, #a67b5b 100%)",
    },
    // Reading Materials (navy)
    {
      icon: faBook,
      label: getText("amenities-reading-materials"),
      color: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    },
  ];

  return (
    <Container>
      <Col xs={12} className="text-center text-white mb-5">
        <h1>{getText("amenities-title")}</h1>
      </Col>
      <Row className="justify-content-start">
        {amenities.map(({ color, icon, label }, index) => (
          <Col key={index} xs={6} sm={4} md={6} lg={4} xxl={3} className="mb-4">
            <Card className="amenity-card">
              <Card.Body className="d-flex align-items-center">
                <span
                  className="amenity-card__icon"
                  style={{ background: `${color || "#f3f3f3"}` }}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    size="lg"
                    className="amenity-icon"
                    style={{ color: "#ffffff" }}
                  />
                </span>
                <span className="amenity-card__label">{label}</span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
