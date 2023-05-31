/* eslint-disable max-len */
import { Dispatch, SetStateAction } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';

interface IPointsOfInterestModalProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

export const PointsOfInterestModal = ({ show, setShow }: IPointsOfInterestModalProps) => (
  <Modal size='xl' show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton style={{ background: '#f0f0f0', paddingLeft: 22 }}>
      <Modal.Title><span className="text-black">Points of Interest</span></Modal.Title>
    </Modal.Header>

    <Modal.Body style={{ background: '#fcfcfc' }}>
      <Container className="rounded px-4 description-modal">
        <Row>
          <div className='pl-2'>
            <p>There are plenty of nearby attractions to explore during your stay!</p>
            <p>
              The breathtaking town of <b>Nerja</b> and its famous <b>Balcony of Europe</b> offer stunning
              views that will leave you in awe. Don't miss the chance to visit the <b>Nerja Crystal
                Caves</b>, a must-see.
            </p>
            <p>
              Take a leisurely stroll along the <b>Torrox-Costa Passeo</b>, a lovely promenade lined with
              beach shops, bars, and restaurants. Experience the vibrant atmosphere of the <b>outdoor
                street markets</b>, held in different villages every morning from 10am to 2pm. Torrox
              hosts the market on Mondays, while Nerja is the place to be on Tuesdays.
            </p>
            <p>
              For beach lovers, the best <b>sandy beaches stretch right in front of the complex</b>, from
              Nerja to Torrox-Costa. <b>Burriana Beach in Nerja</b> is particularly popular and bustling
              with tourists.
            </p>
            <p>
              Adventurous souls can embark on the thrilling <b>Rio Chillar river walk</b> near Nerja. This
              athletic and enjoyable activity is recommended with water-safe shoes and a walking stick,
              although it can be done with rugged sandals or running shoes.
            </p>
            <p>
              Take a short drive to <b>Torrox-Pueblo</b>, a unique old village nestled in the mountains.
              For more picturesque beauty, head north to the stunning white-washed mountain village
              of <b>Frigiliana</b>.
            </p>
            <p>
              If you're up for a day trip, visit the <b>Alhambra Castle in Granada</b>, one of Spain's
              main attractions. Make sure to order your tickets online in advance. For winter sports
              enthusiasts, the <b>Sierra Nevada Mountain Ski Station</b> is a 90-minute drive north,
              and offers excellent opportunities for winter sports. Visit the beach and mountain
              on the same day!
            </p>
            <p>
              <b>Ronda</b>, another charming mountain village to the north, boasts breathtaking views
              from its iconic bridge spanning a deep gorge.
            </p>
            <p>
              Explore <b>Malaga City</b>, where you'll find a combination of shopping opportunities
              and the chance to hike the stunning <b>Caminito del Rey</b>. Remember to secure your
              tickets online beforehand.
            </p>
            <p>
              Nearby, you can enjoy family-friendly attractions such as the <b>Bioparc
                Zoo</b>, <b>Aqualand</b>, <b>Tivoli World</b>, and <b>Aquavelis Water Parks</b>,
              all conveniently located near Malaga.
            </p>
            <p id="gallery">
              If you're up for a longer drive to the west, make a visit to <b>Marbella</b>
              , <b>Puerto Banus</b>, <b>Cordoba</b>, <b>Seville</b>, and <b>Gibraltar</b>,
              each offering its own distinct charm and attractions.
            </p>

          </div>
        </Row>
      </Container>
    </Modal.Body>

    <Modal.Footer style={{ background: '#f9f9f9' }}>
      <Button className='font-lg py-2 px-4' variant="primary" onClick={() => setShow(false)}>Close</Button>
    </Modal.Footer>
  </Modal>
);
