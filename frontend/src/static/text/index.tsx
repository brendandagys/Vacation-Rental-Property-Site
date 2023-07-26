/* eslint-disable quotes */
/* eslint-disable max-len */
import { ReactElement } from 'react';

enum ELanguage {
  Dutch = 'dutch',
  English = 'english',
  French = 'french',
  German = 'german',
  Spanish = 'spanish',
}

type TextData = Record<string, Record<ELanguage, string | ReactElement>>;

const language = ELanguage.English;

/** Returns either a `string` or a `ReactNode` based on the current `language`. */
export const getText = (name: string): string | ReactElement => (
  data[name]?.[language] || data[name]?.[ELanguage.English]
);

const data: TextData = {
  'nav-home': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Home',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'nav-tour': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Tour',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'nav-calendar': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Calendar',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'nav-information': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Information',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'nav-gallery': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Gallery',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'nav-testimonials': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Testimonials',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'nav-map': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Map',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'main-landing-title': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Calaceite FRONTLINE Vistamar',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'main-landing-subtitle': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Luxury Holiday on the Sea',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'main-landing-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Reserve Now',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'main-landing-call-to-action': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Contact us for more information about your next Spain holiday!',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'main-details-text': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: (
      <>
        <p>
          Indulge in luxury and serenity at this exquisite coastal retreat
          located near Nerja and Torrox-Costa in the <b>Costa del Sol, Spain</b>.
          This property offers a spectacular <b>180° FIRSTLINE southwest-facing
            sea view</b> of the Alboran Sea and mountains. <b>Walk to
              the sandy El Penoncillo Beach</b> and enjoy lunch at one of the many
          chiringuitos. Enjoy this well-maintained modern <b>2-bedroom, 2-bathroom
            apartment</b> with a gourmet fully-equipped kitchen with new Bosch
          appliances. Relax by one of the <b>TWO beautiful large outdoor
            pools</b> surrounded by lush green gardens. <b>Watch the waves</b> all
          day from the sunny terrace with its fabulous view overlooking the sea,
          and then sleep to their soothing sound at night.
        </p>

        <p>
          This property offers <b>FREE central air conditioning and heating,
            100% cotton luxury linens packages</b>, and modern amenities such as
          a <b>washing machine</b>, <b>dryer</b>, <b>dishwasher</b>, <b>FREE fast Wi-Fi</b>, and
          a <b>65" 4K Smart Television with Netflix</b>. <b>Private
            parking</b> very close to the entrance elevator, in a sheltered garage,
          is also included.
        </p>

        <p>
          Explore the exciting tourist attractions in the area and enjoy the
          guaranteed Spanish sunshine all year round! Only a 40-minute drive
          from Malaga airport, this spot is perfect for romantic, retirement,
          or family holidays. <b>Long-term rentals are welcome</b>, allowing you
          to enjoy the sun during the winter months. Check-in is fast and easy.
          Experience a truly remarkable getaway!
        </p>
      </>
    ),
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'calendar-title': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Calendar',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'calendar-subtitle': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Select a date range below to begin an inquiry',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'calendar-show-more-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Show more months',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'calendar-show-fewer-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Show fewer months',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'details-title': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Details',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'details-content': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: (
      <>
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
      </>
    ),
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'text-container-read-more-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Read more',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'text-container-close-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Close',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-title': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Amenities',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-terrace': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Sunny south terrace',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-pools': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: '2 outdoor pools',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-parking': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Private parking',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-smart-tv': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: '65" 4K smart TV',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-beach': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Beach access',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-internet': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Fast Wi-Fi Internet',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-air-conditioning': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Air conditioning',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-central-heating': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Central heating',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-washing-machine': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Washing machine',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-drying-machine': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Drying machine',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-kitchen': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Fully stocked kitchen',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-bosch-appliances': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Bosch appliances',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-nespresso': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Nespresso machine',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-coffee': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Drip coffee machine',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-reading-materials': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Reading materials',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'amenities-dishes-and-cutlery': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Dishes & cutlery',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'attractions-title': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Attractions',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'attractions-content': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: (
      <div className="attractions-text">
        <p>There are plenty of nearby attractions to explore during your stay!</p>
        <p>
          The breathtaking town of <b>Nerja</b> and its famous <b>Balcony of Europe</b> offer stunning
          views that will leave you in awe. Don't miss the chance to visit the <b>Nerja Crystal
            Caves</b>, a must-see.
        </p>
        <p>
          Take a leisurely stroll along the <b>Torrox-Costa Paseo</b>, a lovely promenade lined with
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
        <p>
          If you're up for a longer drive to the west, make a visit to <b>Marbella</b>
          , <b>Puerto Banus</b>, <b>Cordoba</b>, <b>Seville</b>, and <b>Gibraltar</b>,
          each offering its own distinct charm and attractions.
        </p>
      </div>
    ),
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'attractions-more-attractions-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'More attractions',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'gallery-title': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Gallery',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'testimonials-title': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Testimonials',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'testimonials-1': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Fantastic apartment with an unparalleled view. A pleasure every time to sit on the balcony and enjoy the beautiful sea view. Centrally located near Nerja and Torrox and Torrox Costa but also perfect place to explore the area and explore the nice little villages.',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'testimonials-2': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'We were extremely happy with this property. It is everything that the advertising says. From the views of the sea and hills to the interior and furnishings we were happy with it all. A car is handy to get easy access to the shopping in Torrox Costa and Nerja. The A7 highway is within easy reach and from there you can roam to Granada, Ronda (a must see), Seville and Malaga. Dawn-Ava is an excellent hostess and made sure everything went smoothly from her end. It would be great to come back for another visit.',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'testimonials-3': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Honestly the best holiday yet! We enjoyed over a month in this apartment and we did not want to go home. The location is wonderful and the view was beyond amazing. The communication before arrival was exceptional as all details and directions were explained completely. Everyday, watching the waves from the terrace as we enjoyed our meals was lovely. Sleeping at night to the sound of the waves was an unexpected bonus too. The kitchen is well-equipped and the apartment was very clean. We will return soon. Thank you Dawn-Ava!',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'testimonials-4': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Listing description was completely accurate. Unit was very clean, as was the complex. Easy 45 minute drive from the Malaga airport. Wonderful drives to Nerja, Torrox, Granada, Almuñécar, Mijas, Seville, and the Sierra Nevada Mtns (to ski!), etc. Central location to spend time in all these fantastic places. Nerja in particular is very close and has great restaurants, the caves, and the views from the Balcón de Europa are stunning. Ocean views amazing from the unit as well. The owner provided great customer service. Immediate replies to any questions we had. Very available on line to ensure our check-in was easy. Would highly recommend this property.',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'testimonials-read-more': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Read more reviews on',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'testimonials-read-more-and': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'and',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'back-to-top-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Back to top',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'trademark': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: '2023 All rights reserved',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-title': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Submit an Inquiry',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-email-label': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Email',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-email-helper-text': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: "We'll never share your information with anyone else.",
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-last-label': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Last',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-first-label': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'First',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-phone-label': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Phone',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-adults-label': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Adults',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-children-label': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Children',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-message-label': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Message',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-message-placeholder-1': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'I am interested in booking this property',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-message-placeholder-2': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Please contact me with some additional information.',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-message-placeholder-from': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'from',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-message-placeholder-to': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'to',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-cancel-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Cancel',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-send-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Send',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-booking-fees': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Booking Fees',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-item': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Item',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-fee': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Fee',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-day': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'day',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-days': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'days',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-additional-linen-package': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'additional linen package',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-additional-linen-packages': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'additional linen packages',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'inquiry-modal-linens-disclaimer': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Two linen packages are included free with every stay.',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'post-submission-modal-1': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Thank you for your interest!',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'post-submission-modal-2': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'We will contact you shortly with more details about your reservation.',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'post-submission-modal-3': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'You can also reach us any time at',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'post-submission-modal-4': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Have a great day!',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
  'post-submission-modal-close-button': {
    [ELanguage.Dutch]: '',
    [ELanguage.English]: 'Close',
    [ELanguage.French]: '',
    [ELanguage.German]: '',
    [ELanguage.Spanish]: '',
  },
};
