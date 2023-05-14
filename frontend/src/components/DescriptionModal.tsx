/* eslint-disable max-len */
import { Dispatch, SetStateAction } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';

interface IDescriptionModalProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

export const DescriptionModal = ({ show, setShow }: IDescriptionModalProps) => (
  <Modal size='xl' show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton style={{ background: '#f0f0f0', paddingLeft: 22 }}>
      <Modal.Title>More Information</Modal.Title>
    </Modal.Header>

    <Modal.Body style={{ background: '#fcfcfc' }}>
      <Container className="rounded px-4 description-modal">
        <Row>
          <div className='pl-2'>
            <p><b>Welcome to Fuerte Calaceite FRONTLINE Vistamar! Luxury Holiday on the Sea!</b></p>
            <ul>
              <li>Torrox Costa - Nerja - located in the Costa del Sol near Malaga airport</li>
              <li>Beautiful newer build frontline 2 bedrooms, 2 bathrooms apartment located in a lovely Resort</li>
              <li>Walk to the beach. Amazing FRONTLINE frontal sea views</li>
              <li>Exciting TOURIST ATTRACTIONS to visit daily in every direction</li>
              <li>Sunbathe at the two luxurious outdoor pools</li>
              <li>Watch the waves from the sunny terrace, sleep to the sound of rolling waves, walk to a sandy beach or swim in the 2 luxurious pools</li>
              <li>LOCATION, LOCATION, LOCATION - Nerja, Torrox-Costa, Costa del Sol, Spain</li>
              <li>AMAZING 180° firstline south-facing sea view of the Alboran Sea and Mountains</li>
              <li>WALK to the sandy EL PENONCILLO BEACH which has many popular Chiringuitos (beach). The El Penoncillo Playa is 200 meters away and offers fresh fish and seafood cuisine daily</li>
              <li>Guaranteed that you will get the EXACT apartment in the pictures with FULL FRONTAL SEA VIEWS</li>
              <li>This is a very well-maintained and FULLY equipped property. It has everything a guest could ever need to ensure a wonderful holiday</li>
              <li>Newly built RESORT Complex with granite, polished marble floors, quality fittings and Bosch appliances. The apartment has 2 bedrooms, 2 bathrooms, and a fully stocked kitchen. It is on a top floor (with a lift)</li>
              <li>TWO large luxurious OUTDOOR POOLS with beautiful lush green gardens. There are Sun loungers, sunshade, and two shallow pools for children. Pools are gated and monitored with a security card pass system to ensure privacy and exclusivity</li>
              <li>LARGE SUNNY TERRACE. Watch the waves during the day and sleep to the sound of the waves at night</li>
              <li>FREE CENTRAL AIR CONDITIONING and HEATING (NO coin machine)</li>
              <li>Linen packages are 100% LUXURY COTTON beds sheets, bath towels and beach towels. Beds will be made for you upon arrival. 2 packages are included</li>
              <li>You will enjoy your holidays in the SAME apartment you see featured in the pictures on the website - Not EAST seaview, not SIDE seaview, not 2nd LINE seaview</li>
              <li>WASHING MACHINE AND DRYER are inside the apartment for your convenience</li>
              <li>FREE FAST Wi-Fi</li>
              <li>FLAT SCREEN 65" SMART television with streaming services & 100's of channels</li>
              <li>Private PARKING for your car in a covered garage belonging to the apartment with a lift 10 meters away to take you directly up to your apartment in minutes</li>
              <li>40-minute drive from the Malaga airport</li>
              <li>Perfect for a romantic, retirement, or family holiday vacation. Guaranteed Spanish sunshine all year</li>
              <li>Long Term Rentals are welcome. Enjoy your winter months in the Sun</li>
              <li>High-season rentals check-in is Saturday/Sunday. No more than one day between rentals. Some exceptions will be considered. Please contact us</li>
            </ul>

            <div className='text-center font-sm pt-5 pb-3'>
              <p><i>Any other questions? Please contact us and we'd be happy to help.</i></p>
            </div>
          </div>
        </Row>
      </Container>
    </Modal.Body>

    <Modal.Footer style={{ background: '#f9f9f9' }}>
      <Button className='font-lg' variant="primary" size='lg' onClick={() => setShow(false)}>Close</Button>
    </Modal.Footer>
  </Modal>
);
