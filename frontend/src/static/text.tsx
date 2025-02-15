/* eslint-disable quotes */
/* eslint-disable max-len */
import { ReactElement } from 'react';
import { TextStar } from '../components/TextStar';

export enum ELanguage {
  Dutch = 'dutch',
  English = 'english',
  French = 'french',
  German = 'german',
  Spanish = 'spanish',
}

type TextData = Record<string, Record<ELanguage, string | ReactElement>>;

export const textData: TextData = {
  'nav-home': {
    [ELanguage.Dutch]: 'Thuis',
    [ELanguage.English]: 'Home',
    [ELanguage.French]: 'Maison',
    [ELanguage.German]: 'Heim',
    [ELanguage.Spanish]: 'Hogar',
  },
  'nav-tour': {
    [ELanguage.Dutch]: 'Tour',
    [ELanguage.English]: 'Tour',
    [ELanguage.French]: 'Visite',
    [ELanguage.German]: 'Tour',
    [ELanguage.Spanish]: 'Recorrido',
  },
  'nav-calendar': {
    [ELanguage.Dutch]: 'Kalender',
    [ELanguage.English]: 'Calendar',
    [ELanguage.French]: 'Calendrier',
    [ELanguage.German]: 'Kalender',
    [ELanguage.Spanish]: 'Calendario',
  },
  'nav-information': {
    [ELanguage.Dutch]: 'Informatie',
    [ELanguage.English]: 'Information',
    [ELanguage.French]: 'Information',
    [ELanguage.German]: 'Information',
    [ELanguage.Spanish]: 'Información',
  },
  'nav-gallery': {
    [ELanguage.Dutch]: 'Galerij',
    [ELanguage.English]: 'Gallery',
    [ELanguage.French]: 'Galerie',
    [ELanguage.German]: 'Galerie',
    [ELanguage.Spanish]: 'Galería',
  },
  'nav-testimonials': {
    [ELanguage.Dutch]: 'Getuigenissen',
    [ELanguage.English]: 'Testimonials',
    [ELanguage.French]: 'Témoignages',
    [ELanguage.German]: 'Referenzen',
    [ELanguage.Spanish]: 'Testimonios',
  },
  'nav-map': {
    [ELanguage.Dutch]: 'Kaart',
    [ELanguage.English]: 'Map',
    [ELanguage.French]: 'Carte',
    [ELanguage.German]: 'Karte',
    [ELanguage.Spanish]: 'Mapa',
  },
  'nav-language': {
    [ELanguage.Dutch]: 'Taal',
    [ELanguage.English]: 'Language',
    [ELanguage.French]: 'Langue',
    [ELanguage.German]: 'Sprache',
    [ELanguage.Spanish]: 'Idioma',
  },
  'nav-dutch': {
    [ELanguage.Dutch]: 'Nederlands',
    [ELanguage.English]: 'Dutch',
    [ELanguage.French]: 'Néerlandais',
    [ELanguage.German]: 'Niederländisch',
    [ELanguage.Spanish]: 'Holandés',
  },
  'nav-english': {
    [ELanguage.Dutch]: 'Engels',
    [ELanguage.English]: 'English',
    [ELanguage.French]: 'Anglais',
    [ELanguage.German]: 'Englisch',
    [ELanguage.Spanish]: 'Inglés',
  },
  'nav-french': {
    [ELanguage.Dutch]: 'Frans',
    [ELanguage.English]: 'French',
    [ELanguage.French]: 'Français',
    [ELanguage.German]: 'Französisch',
    [ELanguage.Spanish]: 'Francés',
  },
  'nav-german': {
    [ELanguage.Dutch]: 'Duits',
    [ELanguage.English]: 'German',
    [ELanguage.French]: 'Allemand',
    [ELanguage.German]: 'Deutsch',
    [ELanguage.Spanish]: 'Alemán',
  },
  'nav-spanish': {
    [ELanguage.Dutch]: 'Spaans',
    [ELanguage.English]: 'Spanish',
    [ELanguage.French]: 'Espagnol',
    [ELanguage.German]: 'Spanisch',
    [ELanguage.Spanish]: 'Español',
  },
  'main-landing-subtitle': {
    [ELanguage.Dutch]: 'Luxe vakantie aan zee',
    [ELanguage.English]: 'Luxury Holiday on the Sea',
    [ELanguage.French]: 'Vacances de luxe sur la mer',
    [ELanguage.German]: 'Luxusurlaub am Meer',
    [ELanguage.Spanish]: 'Vacaciones de lujo en el mar',
  },
  'main-landing-button': {
    [ELanguage.Dutch]: 'Reserveer nu',
    [ELanguage.English]: 'Reserve Now',
    [ELanguage.French]: 'Réservez maintenant',
    [ELanguage.German]: 'Jetzt reservieren',
    [ELanguage.Spanish]: 'Reservar ahora',
  },
  'main-landing-call-to-action': {
    [ELanguage.Dutch]: 'Neem contact met ons op voor meer informatie over uw volgende vakantie in Spanje!',
    [ELanguage.English]: 'Contact us for more information about your next Spain holiday!',
    [ELanguage.French]: "Contactez-nous pour plus d'informations sur vos prochaines vacances en Espagne !",
    [ELanguage.German]: 'Kontaktieren Sie uns für weitere Informationen zu Ihrem nächsten Spanienurlaub!',
    [ELanguage.Spanish]: '¡Contáctenos para obtener más información sobre sus próximas vacaciones en España!',
  },
  'main-details-text': {
    [ELanguage.Dutch]: (
      <>
        <p><TextStar /> Welkom op de website van Calaceite FRONTLINE Vistamar! <TextStar /></p>
        <p><TextStar /> LOCATIE, LOCATIE, LOCATIE - Nerja en Torrox-Costa in de Costa <TextStar /></p>
        <p><TextStar /> Dit is appartement #6132 in het eerste blok van het strand met een VOLLEDIG FRONTAAL 180° zuid/west gericht uitzicht op de Alboran Zee <TextStar /></p>
        <p><TextStar /> KIJK DE GOLVEN overdag vanaf het grote zonnige terras en slaap 's nachts met het geluid van de golven <TextStar /></p>
      </>
    ),
    [ELanguage.English]: (
      <>
        <p><TextStar /> Welcome to the Calaceite FRONTLINE Vistamar website! <TextStar /></p>
        <p><TextStar /> LOCATION, LOCATION, LOCATION - Nerja and Torrox-Costa in the Costa del Sol <TextStar /></p>
        <p><TextStar /> This is Apartment #6132 in the first block to the beach with a FULLY FRONTAL 180° south/west facing seaview of the Alboran Sea <TextStar /></p>
        <p><TextStar /> WATCH THE WAVES during the day from the large sunny terrace and sleep to the sound of the waves at night <TextStar /></p>
      </>
    ),
    [ELanguage.French]: (
      <>
        <p><TextStar /> Bienvenue sur le site Web de Calaceite FRONTLINE Vistamar ! <TextStar /></p>
        <p><TextStar /> EMPLACEMENT, EMPLACEMENT, EMPLACEMENT - Nerja et Torrox-Costa sur la Costa <TextStar /></p>
        <p><TextStar /> Il s'agit de l'appartement n° 6132 dans le premier bloc de la plage avec une vue frontale à 180° sud/ouest sur la mer d'Alboran <TextStar /></p>
        <p><TextStar /> REGARDEZ LES VAGUES pendant la journée depuis la grande terrasse ensoleillée et dormez au son des vagues la nuit <TextStar /></p>
      </>
    ),
    [ELanguage.German]: (
      <>
        <p><TextStar /> Willkommen auf der Calaceite FRONTLINE Vistamar-Website! <TextStar /></p>
        <p><TextStar /> LAGE, LAGE, LAGE – Nerja und Torrox-Costa an der Costa <TextStar /></p>
        <p><TextStar /> Dies ist Apartment Nr. 6132 im ersten Block zum Strand mit VOLLSTÄNDIGEM FRONTALEN 180°-Meerblick nach Süd/West auf das Alboran-Meer <TextStar /></p>
        <p><TextStar /> Beobachten Sie tagsüber die Wellen von der großen, sonnigen Terrasse aus und schlafen Sie nachts beim Rauschen der Wellen ein <TextStar /></p>
      </>
    ),
    [ELanguage.Spanish]: (
      <>
        <p><TextStar /> ¡Bienvenidos al sitio web de Vistamar en PRIMERA LÍNEA de Calaceite! <TextStar /></p>
        <p><TextStar /> UBICACIÓN, UBICACIÓN, UBICACIÓN - Nerja y Torrox-Costa en la Costa <TextStar /></p>
        <p><TextStar /> Este es el apartamento n.° 6132 en el primer bloque de la playa con una vista frontal de 180° al mar de Alborán orientada al sur/oeste <TextStar /></p>
        <p><TextStar /> OBSERVE LAS OLAS durante el día desde la gran terraza soleada y duerma con el sonido de las olas por la noche <TextStar /></p>
      </>
    ),
  },
  'calendar-title': {
    [ELanguage.Dutch]: 'Kalender',
    [ELanguage.English]: 'Calendar',
    [ELanguage.French]: 'Calendrier',
    [ELanguage.German]: 'Kalender',
    [ELanguage.Spanish]: 'Calendario',
  },
  'calendar-subtitle': {
    [ELanguage.Dutch]: 'Selecteer hieronder een datumbereik om een onderzoek te starten',
    [ELanguage.English]: 'Select a date range below to begin an inquiry',
    [ELanguage.French]: 'Sélectionnez une plage de dates ci-dessous pour commencer une enquête',
    [ELanguage.German]: 'Wählen Sie unten einen Datumsbereich aus, um eine Anfrage zu starten',
    [ELanguage.Spanish]: 'Seleccione un rango de fechas a continuación para comenzar una consulta',
  },
  'calendar-month-1': {
    [ELanguage.Dutch]: 'januari',
    [ELanguage.English]: 'January',
    [ELanguage.French]: 'janvier',
    [ELanguage.German]: 'Januar',
    [ELanguage.Spanish]: 'enero',
  },
  'calendar-month-2': {
    [ELanguage.Dutch]: 'februari',
    [ELanguage.English]: 'February',
    [ELanguage.French]: 'février',
    [ELanguage.German]: 'Februar',
    [ELanguage.Spanish]: 'febrero',
  },
  'calendar-month-3': {
    [ELanguage.Dutch]: 'maart',
    [ELanguage.English]: 'March',
    [ELanguage.French]: 'mars',
    [ELanguage.German]: 'März',
    [ELanguage.Spanish]: 'marzo',
  },
  'calendar-month-4': {
    [ELanguage.Dutch]: 'april',
    [ELanguage.English]: 'April',
    [ELanguage.French]: 'avril',
    [ELanguage.German]: 'April',
    [ELanguage.Spanish]: 'abril',
  },
  'calendar-month-5': {
    [ELanguage.Dutch]: 'mei',
    [ELanguage.English]: 'May',
    [ELanguage.French]: 'mai',
    [ELanguage.German]: 'Mai',
    [ELanguage.Spanish]: 'mayo',
  },
  'calendar-month-6': {
    [ELanguage.Dutch]: 'juni',
    [ELanguage.English]: 'June',
    [ELanguage.French]: 'juin',
    [ELanguage.German]: 'Juni',
    [ELanguage.Spanish]: 'junio',
  },
  'calendar-month-7': {
    [ELanguage.Dutch]: 'juli',
    [ELanguage.English]: 'July',
    [ELanguage.French]: 'juillet',
    [ELanguage.German]: 'Juli',
    [ELanguage.Spanish]: 'julio',
  },
  'calendar-month-8': {
    [ELanguage.Dutch]: 'augustus',
    [ELanguage.English]: 'August',
    [ELanguage.French]: 'août',
    [ELanguage.German]: 'August',
    [ELanguage.Spanish]: 'agosto',
  },
  'calendar-month-9': {
    [ELanguage.Dutch]: 'september',
    [ELanguage.English]: 'September',
    [ELanguage.French]: 'septembre',
    [ELanguage.German]: 'September',
    [ELanguage.Spanish]: 'septiembre',
  },
  'calendar-month-10': {
    [ELanguage.Dutch]: 'oktober',
    [ELanguage.English]: 'October',
    [ELanguage.French]: 'octobre',
    [ELanguage.German]: 'Oktober',
    [ELanguage.Spanish]: 'octubre',
  },
  'calendar-month-11': {
    [ELanguage.Dutch]: 'november',
    [ELanguage.English]: 'November',
    [ELanguage.French]: 'novembre',
    [ELanguage.German]: 'November',
    [ELanguage.Spanish]: 'noviembre',
  },
  'calendar-month-12': {
    [ELanguage.Dutch]: 'december',
    [ELanguage.English]: 'December',
    [ELanguage.French]: 'décembre',
    [ELanguage.German]: 'Dezember',
    [ELanguage.Spanish]: 'diciembre',
  },
  'calendar-weekday-1': {
    [ELanguage.Dutch]: 'zon',
    [ELanguage.English]: 'Sun',
    [ELanguage.French]: 'dim',
    [ELanguage.German]: 'Son',
    [ELanguage.Spanish]: 'dom',
  },
  'calendar-weekday-2': {
    [ELanguage.Dutch]: 'maa',
    [ELanguage.English]: 'Mon',
    [ELanguage.French]: 'lun',
    [ELanguage.German]: 'Mon',
    [ELanguage.Spanish]: 'lun',
  },
  'calendar-weekday-3': {
    [ELanguage.Dutch]: 'din',
    [ELanguage.English]: 'Tue',
    [ELanguage.French]: 'mar',
    [ELanguage.German]: 'Die',
    [ELanguage.Spanish]: 'mar',
  },
  'calendar-weekday-4': {
    [ELanguage.Dutch]: 'woe',
    [ELanguage.English]: 'Wed',
    [ELanguage.French]: 'mer',
    [ELanguage.German]: 'Mit',
    [ELanguage.Spanish]: 'mié',
  },
  'calendar-weekday-5': {
    [ELanguage.Dutch]: 'don',
    [ELanguage.English]: 'Thu',
    [ELanguage.French]: 'jeu',
    [ELanguage.German]: 'Don',
    [ELanguage.Spanish]: 'jue',
  },
  'calendar-weekday-6': {
    [ELanguage.Dutch]: 'vri',
    [ELanguage.English]: 'Fri',
    [ELanguage.French]: 'ven',
    [ELanguage.German]: 'Fre',
    [ELanguage.Spanish]: 'vie',
  },
  'calendar-weekday-7': {
    [ELanguage.Dutch]: 'zat',
    [ELanguage.English]: 'Sat',
    [ELanguage.French]: 'sam',
    [ELanguage.German]: 'Sam',
    [ELanguage.Spanish]: 'sáb',
  },
  'calendar-booked': {
    [ELanguage.Dutch]: 'GEBOEKT',
    [ELanguage.English]: 'BOOKED',
    [ELanguage.French]: 'RÉSERVÉ',
    [ELanguage.German]: 'GEBUCHT',
    [ELanguage.Spanish]: 'RESERVADO',
  },
  'calendar-show-more-button': {
    [ELanguage.Dutch]: 'Toon meer maanden',
    [ELanguage.English]: 'Show more months',
    [ELanguage.French]: 'Afficher plus de mois',
    [ELanguage.German]: 'Weitere Monate anzeigen',
    [ELanguage.Spanish]: 'Mostrar más meses',
  },
  'calendar-show-fewer-button': {
    [ELanguage.Dutch]: 'Toon minder maanden',
    [ELanguage.English]: 'Show fewer months',
    [ELanguage.French]: 'Afficher moins de mois',
    [ELanguage.German]: 'Weniger Monate anzeigen',
    [ELanguage.Spanish]: 'Mostrar menos meses',
  },
  'details-title': {
    [ELanguage.Dutch]: 'Details',
    [ELanguage.English]: 'Details',
    [ELanguage.French]: 'Détails',
    [ELanguage.German]: 'Einzelheiten',
    [ELanguage.Spanish]: 'Detalles',
  },
  'details-content': {
    [ELanguage.Dutch]: (
      <>
        <ul>
          <li>Torrox Costa - Nerja - gelegen aan de Costa del Sol nabij de luchthaven van Malaga</li>
          <li>Mooi nieuw gebouwd eerstelijns appartement met 2 slaapkamers en 2 badkamers gelegen in een prachtig resort</li>
          <li>Loop naar het strand. Geweldig FRONTLINE frontaal zeezicht</li>
          <li>Spannende TOERISTISCHE ATTRACTIES om dagelijks in alle richtingen te bezoeken</li>
          <li>Ga zonnebaden bij de twee luxe buitenzwembaden</li>
          <li>Bekijk de golven vanaf het zonnige terras, slaap bij het geluid van rollende golven, loop naar een zandstrand of zwem in de 2 luxe zwembaden</li>
          <li>LOCATIE, LOCATIE, LOCATIE - Nerja, Torrox-Costa, Costa del Sol, Spanje</li>
          <li>GEWELDIG 180 ° eerstelijns zeezicht op het zuiden van de Alboranzee en de bergen</li>
          <li>WANDEL naar het zandstrand EL PENONCILLO met veel populaire Chiringuitos (strand). El Penoncillo Playa ligt op 200 meter afstand en biedt dagelijks verse vis en zeevruchten</li>
          <li>Gegarandeerd dat u het EXACTE appartement op de foto's krijgt met VOLLEDIG FRONTAAL UITZICHT OP ZEE</li>
          <li>Dit is een zeer goed onderhouden en VOLLEDIG uitgeruste woning. Het heeft alles wat een gast nodig heeft voor een heerlijke vakantie</li>
          <li>Nieuw gebouwd RESORT-complex met graniet, gepolijste marmeren vloeren, hoogwaardige armaturen en Bosch-apparaten. Het appartement heeft 2 slaapkamers, 2 badkamers en een volledig uitgeruste keuken. Het is op de bovenste verdieping (met lift)</li>
          <li>TWEE grote luxe BUITENBADEN met prachtige weelderige groene tuinen. Er zijn ligstoelen, parasol en twee ondiepe zwembaden voor kinderen. De zwembaden zijn omheind en worden bewaakt met een beveiligingskaartsysteem om privacy en exclusiviteit te garanderen</li>
          <li>GROOT ZONNIG TERRAS. Kijk overdag naar de golven en slaap 's nachts met het geluid van de golven</li>
          <li>GRATIS CENTRALE AIRCONDITIONING en VERWARMING (GEEN muntautomaat)</li>
          <li>Linnenpakketten zijn 100% LUXE KATOEN bedlakens, badlakens en strandlakens. Bij aankomst zijn de bedden voor u opgemaakt. Er zijn 2 pakketten inbegrepen</li>
          <li>U zult genieten van uw vakantie in HETZELFDE appartement dat u ziet op de foto's op de website - Geen OOST zeezicht, geen ZIJ-zeezicht, geen 2e LIJN zeezicht</li>
          <li>WASMACHINE EN DROGER bevinden zich voor uw gemak in het appartement</li>
          <li>GRATIS SNELLE wifi</li>
          <li>FLAT SCREEN 65-inch SMART-televisie met streamingdiensten en honderden kanalen</li>
          <li>Privé PARKEERPLAATS voor uw auto in een overdekte garage die bij het appartement hoort met een lift op 10 meter afstand die u binnen enkele minuten rechtstreeks naar uw appartement brengt</li>
          <li>40 minuten rijden van de luchthaven van Malaga</li>
          <li>Perfect voor een romantische vakantie, pensioen of vakantie met het gezin. Gegarandeerd het hele jaar door Spaanse zon</li>
          <li>Lange termijn verhuur is welkom. Geniet van je wintermaanden in de zon</li>
          <li>Inchecken voor hoogseizoen verhuur is zaterdag/zondag. Niet meer dan een dag tussen verhuur. Enkele uitzonderingen zullen worden overwogen. Contacteer ons alsjeblieft</li>
        </ul>

        <div className='text-center font-sm pt-5 pb-3'>
          <p><i>Nog andere vragen? Neem dan contact met ons op en we helpen u graag verder.</i></p>
        </div>
      </>
    ),
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
    [ELanguage.French]: (
      <>
        <ul>
          <li>Torrox Costa - Nerja - situé sur la Costa del Sol près de l'aéroport de Malaga</li>
          <li>Bel appartement de première ligne de construction récente de 2 chambres et 2 salles de bains situé dans un charmant complexe</li>
          <li>Marchez jusqu'à la plage. Vue imprenable sur la mer frontale FRONTLINE</li>
          <li>ATTRACTIONS TOURISTIQUES passionnantes à visiter quotidiennement dans toutes les directions</li>
          <li>Prenez un bain de soleil dans les deux luxueuses piscines extérieures</li>
          <li>Regardez les vagues depuis la terrasse ensoleillée, dormez au son des vagues, marchez jusqu'à une plage de sable ou nagez dans les 2 piscines luxueuses</li>
          <li>EMPLACEMENT, EMPLACEMENT, EMPLACEMENT - Nerja, Torrox-Costa, Costa del Sol, Espagne</li>
          <li>INCROYABLE vue à 180 ° sur la mer et les montagnes d'Alboran en première ligne, face au sud</li>
          <li>Marchez jusqu'à la plage de sable EL PENONCILLO qui compte de nombreux Chiringuitos (plage) populaires. Le El Penoncillo Playa est à 200 mètres et propose une cuisine de poisson frais et de fruits de mer tous les jours</li>
          <li>Garanti que vous obtiendrez l'appartement EXACT sur les photos avec PLEIN VUE SUR LA MER FRONTALE</li>
          <li>C'est une propriété très bien entretenue et entièrement équipée. Il a tout ce dont un client pourrait avoir besoin pour s'assurer de merveilleuses vacances</li>
          <li>Complexe RESORT nouvellement construit avec des sols en granit, en marbre poli, des installations de qualité et des appareils Bosch. L'appartement dispose de 2 chambres, de 2 salles de bains et d'une cuisine entièrement équipée. Il est au dernier étage (avec ascenseur)</li>
          <li>DEUX grandes PISCINES EXTÉRIEURES luxueuses avec de beaux jardins verdoyants. Il y a des chaises longues, un parasol et deux piscines peu profondes pour les enfants. Les piscines sont fermées et surveillées avec un système de carte de sécurité pour garantir la confidentialité et l'exclusivité</li>
          <li>GRANDE TERRASSE ENSOLEILLÉE. Observez les vagues pendant la journée et dormez au son des vagues la nuit</li>
          <li>CLIMATISATION CENTRALE et CHAUFFAGE GRATUITS (PAS de monnayeur)</li>
          <li>Les paquets de linge sont des draps 100% COTON DE LUXE, des serviettes de bain et des serviettes de plage. Les lits seront faits pour vous à votre arrivée. 2 forfaits sont inclus</li>
          <li>Vous profiterez de vos vacances dans le MÊME appartement que vous voyez sur les photos du site Web - Pas de vue sur la mer EST, pas de vue sur la mer LATÉRALE, pas de vue sur la mer 2ème LIGNE</li>
          <li>LAVE-LINGE ET SECHE-LINGE sont à l'intérieur de l'appartement pour votre confort</li>
          <li>Wi-Fi RAPIDE GRATUIT</li>
          <li>ÉCRAN PLAT 65" SMART TV avec services de diffusion en continu et 100 chaînes</li>
          <li>PARKING privé pour votre voiture dans un garage couvert appartenant à l'appartement avec un ascenseur à 10 mètres pour vous emmener directement à votre appartement en quelques minutes</li>
          <li>40 minutes en voiture de l'aéroport de Malaga</li>
          <li>Parfait pour des vacances romantiques, à la retraite ou en famille. Soleil espagnol garanti toute l'année</li>
          <li>Les locations à long terme sont les bienvenues. Profitez de vos mois d'hiver au soleil</li>
          <li>L'enregistrement des locations en haute saison s'effectue le samedi/dimanche. Pas plus d'un jour entre les locations. Certaines exceptions seront envisagées. Contactez nous s'il vous plait</li>
        </ul>

        <div className='text-center font-sm pt-5 pb-3'>
          <p><i>D'autres questions? Veuillez nous contacter et nous serons heureux de vous aider.</i></p>
        </div>
      </>
    ),
    [ELanguage.German]: (
      <>
        <ul>
          <li>Torrox Costa – Nerja – liegt an der Costa del Sol in der Nähe des Flughafens Malaga</li>
          <li>Schönes, neueres Apartment in erster Meereslinie mit 2 Schlafzimmern und 2 Bädern in einem schönen Resort</li>
          <li>Gehen Sie zum Strand. Erstaunlicher Frontalblick auf das Meer</li>
          <li>Spannende TOURISTISCHE ATTRAKTIONEN, die Sie täglich in alle Richtungen besuchen können</li>
          <li>Nehmen Sie ein Sonnenbad an den beiden luxuriösen Außenpools</li>
          <li>Beobachten Sie die Wellen von der sonnigen Terrasse aus, schlafen Sie beim Rauschen der Wellen, gehen Sie zu einem Sandstrand oder schwimmen Sie in den 2 luxuriösen Pools</li>
          <li>LAGE, LAGE, LAGE - Nerja, Torrox-Costa, Costa del Sol, Spanien</li>
          <li>FANTASTISCHER 180°-Blick in erster Meereslinie nach Süden auf das Alboran-Meer und die Berge</li>
          <li>Gehen Sie zum Sandstrand EL PENONCILLO, an dem sich viele beliebte Chiringuitos (Strände) befinden. Das El Penoncillo Playa liegt 200 m entfernt und bietet täglich frische Fisch- und Meeresfrüchteküche</li>
          <li>Garantiert, dass Sie GENAU die Wohnung auf den Bildern mit VOLLSTÄNDIGEM MEERBLICK erhalten</li>
          <li>Dies ist eine sehr gepflegte und KOMPLETT ausgestattete Immobilie. Es verfügt über alles, was ein Gast für einen wunderschönen Urlaub benötigen könnte</li>
          <li>Neu erbauter RESORT-Komplex mit Granit, polierten Marmorböden, hochwertiger Ausstattung und Bosch-Geräten. Das Apartment verfügt über 2 Schlafzimmer, 2 Badezimmer und eine voll ausgestattete Küche. Es befindet sich im obersten Stockwerk (mit Aufzug)</li>
          <li>ZWEI große, luxuriöse AUSSENPOOLS mit wunderschönen üppigen grünen Gärten. Es gibt Sonnenliegen, Sonnenschirm und zwei flache Pools für Kinder. Die Pools sind eingezäunt und werden mit einem Sicherheitskartensystem überwacht, um Privatsphäre und Exklusivität zu gewährleisten</li>
          <li>GROSSE SONNIGE TERRASSE. Beobachten Sie tagsüber die Wellen und schlafen Sie nachts beim Rauschen der Wellen</li>
          <li>KOSTENLOSE ZENTRALE KLIMAANLAGE und HEIZUNG (KEIN Münzautomat)</li>
          <li>Die Wäschepakete umfassen Bettwäsche, Badetücher und Strandtücher aus 100 % luxuriöser Baumwolle. Bei Ihrer Ankunft sind die Betten für Sie bezogen. Im Lieferumfang sind 2 Pakete enthalten</li>
          <li>Sie werden Ihren Urlaub im GLEICHEN Apartment genießen, das Sie auf den Bildern auf der Website sehen – nicht mit Meerblick nach Osten, nicht mit seitlichem Meerblick, nicht mit Meerblick in der 2. Reihe</li>
          <li>WASCHMASCHINE UND TROCKNER stehen Ihnen in der Wohnung zur Verfügung</li>
          <li>KOSTENLOSES SCHNELLES WLAN</li>
          <li>65-Zoll-SMART-Flachbildfernseher mit Streaming-Diensten und Hunderten von Kanälen</li>
          <li>Privater PARKPLATZ für Ihr Auto in einer überdachten Garage, die zur Wohnung gehört, mit einem Aufzug in 10 Metern Entfernung, der Sie in wenigen Minuten direkt zu Ihrer Wohnung bringt</li>
          <li>40-minütige Fahrt vom Flughafen Malaga entfernt</li>
          <li>Perfekt für einen romantischen Urlaub, einen Ruhestand oder einen Familienurlaub. Garantiert spanischer Sonnenschein das ganze Jahr über</li>
          <li>Langzeitmieten sind willkommen. Genießen Sie Ihre Wintermonate in der Sonne</li>
          <li>Der Check-in für Mietobjekte in der Hochsaison erfolgt am Samstag/Sonntag. Zwischen den Anmietungen darf nicht mehr als ein Tag liegen. Einige Ausnahmen werden berücksichtigt. Bitte kontaktieren Sie uns</li>
        </ul>

        <div className='text-center font-sm pt-5 pb-3'>
          <p><i>Weitere Fragen? Bitte kontaktieren Sie uns, wir helfen Ihnen gerne weiter.</i></p>
        </div>
      </>
    ),
    [ELanguage.Spanish]: (
      <>
        <ul>
          <li>Torrox Costa - Nerja - ubicado en la Costa del Sol cerca del aeropuerto de Málaga</li>
          <li>Hermoso apartamento de nueva construcción en primera línea de 2 dormitorios y 2 baños ubicado en un encantador Resort</li>
          <li>Camina hasta la playa. Impresionantes vistas frontales al mar en PRIMERA LINEA</li>
          <li>Emocionantes ATRACCIONES TURÍSTICAS para visitar diariamente en todas las direcciones</li>
          <li>Toma el sol en las dos lujosas piscinas al aire libre</li>
          <li>Contempla las olas desde la soleada terraza, duerme con el sonido de las olas, camina hasta una playa de arena o nada en las 2 lujosas piscinas</li>
          <li>UBICACIÓN, UBICACIÓN, UBICACIÓN - Nerja, Torrox-Costa, Costa del Sol, España</li>
          <li>INCREÍBLE vista al mar de 180 ° en primera línea orientada al sur del mar y las montañas de Alborán</li>
          <li>PASEO hasta la playa de arena EL PENONCILLO que tiene muchos Chiringuitos (playa) populares. El Penoncillo Playa está a 200 metros y ofrece cocina de pescado y marisco fresco todos los días.</li>
          <li>Garantizado que obtendrá el apartamento EXACTO en las fotos con VISTAS FRONTALES COMPLETAS AL MAR</li>
          <li>Esta es una propiedad muy bien mantenida y TOTALMENTE equipada. Tiene todo lo que un huésped pueda necesitar para garantizar unas vacaciones maravillosas.</li>
          <li>Complejo RESORT de nueva construcción con suelos de granito, mármol pulido, acabados de calidad y electrodomésticos Bosch. El apartamento tiene 2 dormitorios, 2 baños y una cocina completamente equipada. Está en una última planta (con ascensor)</li>
          <li>DOS grandes y lujosas PISCINAS AL AIRE LIBRE con hermosos y exuberantes jardines. Hay tumbonas, sombrilla y dos piscinas de poca profundidad para niños. Las piscinas están cerradas y monitoreadas con un sistema de pase de tarjeta de seguridad para garantizar la privacidad y la exclusividad.</li>
          <li>AMPLIA TERRAZA SOLEADA. Mira las olas durante el día y duerme con el sonido de las olas por la noche.</li>
          <li>AIRE ACONDICIONADO CENTRAL y CALEFACCIÓN GRATUITO (NO máquina de monedas)</li>
          <li>Los paquetes de ropa de cama son sábanas, toallas de baño y toallas de playa 100% ALGODÓN DE LUJO. Las camas estarán hechas para usted a su llegada. 2 paquetes están incluidos</li>
          <li>Disfrutará de sus vacaciones en el MISMO apartamento que ve en las imágenes del sitio web: no tiene vista al mar ESTE, no tiene vista al mar LATERAL, no tiene vista al mar en 2ª LÍNEA</li>
          <li>LAVADORA Y SECADORA están dentro del apartamento para su comodidad</li>
          <li>WIFI RÁPIDO GRATIS</li>
          <li>Televisor INTELIGENTE DE PANTALLA PLANA DE 65" con servicios de transmisión y cientos de canales</li>
          <li>PARKING privado para tu coche en un garaje cubierto propio del apartamento con ascensor a 10 metros para llevarte directamente a tu apartamento en minutos</li>
          <li>40 minutos en coche del aeropuerto de Málaga</li>
          <li>Perfecto para unas vacaciones románticas, de jubilación o familiares. Sol español garantizado todo el año</li>
          <li>Los alquileres a largo plazo son bienvenidos. Disfruta de tus meses de invierno al sol</li>
          <li>El check-in de alquileres de temporada alta es sábado/domingo. No más de un día entre alquileres. Se considerarán algunas excepciones. Por favor contáctenos</li>
        </ul>

        <div className='text-center font-sm pt-5 pb-3'>
          <p><i>¿Alguna otra pregunta? Póngase en contacto con nosotros y estaremos encantados de ayudarle.</i></p>
        </div>
      </>
    ),
  },
  'text-container-read-more-button': {
    [ELanguage.Dutch]: 'Lees verder',
    [ELanguage.English]: 'Read more',
    [ELanguage.French]: 'En savoir plus',
    [ELanguage.German]: 'Weiterlesen',
    [ELanguage.Spanish]: 'Leer más',
  },
  'text-container-close-button': {
    [ELanguage.Dutch]: 'Dichtbij',
    [ELanguage.English]: 'Close',
    [ELanguage.French]: 'Fermer',
    [ELanguage.German]: 'Schließen',
    [ELanguage.Spanish]: 'Cerca',
  },
  'amenities-title': {
    [ELanguage.Dutch]: 'Voorzieningen',
    [ELanguage.English]: 'Amenities',
    [ELanguage.French]: 'Agréments',
    [ELanguage.German]: 'Ausstattung',
    [ELanguage.Spanish]: 'Comodidades',
  },
  'amenities-terrace': {
    [ELanguage.Dutch]: 'Zonnig terras op het zuiden',
    [ELanguage.English]: 'Sunny south terrace',
    [ELanguage.French]: 'Terrasse sud ensoleillée',
    [ELanguage.German]: 'Sonnige Südterrasse',
    [ELanguage.Spanish]: 'Soleada terraza sur',
  },
  'amenities-pools': {
    [ELanguage.Dutch]: '2 buitenzwembaden',
    [ELanguage.English]: '2 outdoor pools',
    [ELanguage.French]: '2 piscines extérieures',
    [ELanguage.German]: '2 Außenpools',
    [ELanguage.Spanish]: '2 piscinas al aire libre',
  },
  'amenities-parking': {
    [ELanguage.Dutch]: 'Priveparkeren',
    [ELanguage.English]: 'Private parking',
    [ELanguage.French]: 'Parking privé',
    [ELanguage.German]: 'Privater Parkplatz',
    [ELanguage.Spanish]: 'Estacionamiento privado',
  },
  'amenities-smart-tv': {
    [ELanguage.Dutch]: '65-inch 4K smart-tv',
    [ELanguage.English]: '65" 4K smart TV',
    [ELanguage.French]: 'Téléviseur intelligent 4K de 65 po',
    [ELanguage.German]: '65-Zoll-4K-Smart-TV',
    [ELanguage.Spanish]: 'Televisor inteligente 4K de 65"',
  },
  'amenities-beach': {
    [ELanguage.Dutch]: 'Toegang tot het strand',
    [ELanguage.English]: 'Beach access',
    [ELanguage.French]: 'Accès à la plage',
    [ELanguage.German]: 'Zugang zum Strand',
    [ELanguage.Spanish]: 'Acceso a la playa',
  },
  'amenities-internet': {
    [ELanguage.Dutch]: 'Snel wifi-internet',
    [ELanguage.English]: 'Fast Wi-Fi Internet',
    [ELanguage.French]: 'Internet Wi-Fi rapide',
    [ELanguage.German]: 'Schnelles WLAN-Internet',
    [ELanguage.Spanish]: 'Internet WiFi rápido',
  },
  'amenities-air-conditioning': {
    [ELanguage.Dutch]: 'Airconditioning',
    [ELanguage.English]: 'Air conditioning',
    [ELanguage.French]: 'Climatisation',
    [ELanguage.German]: 'Klimaanlage',
    [ELanguage.Spanish]: 'Aire acondicionado',
  },
  'amenities-central-heating': {
    [ELanguage.Dutch]: 'Centrale verwarming',
    [ELanguage.English]: 'Central heating',
    [ELanguage.French]: 'Chauffage central',
    [ELanguage.German]: 'Zentralheizung',
    [ELanguage.Spanish]: 'Calefacción central',
  },
  'amenities-washing-machine': {
    [ELanguage.Dutch]: 'Wasmachine',
    [ELanguage.English]: 'Washing machine',
    [ELanguage.French]: 'Machine à laver',
    [ELanguage.German]: 'Waschmaschine',
    [ELanguage.Spanish]: 'Lavadora',
  },
  'amenities-drying-machine': {
    [ELanguage.Dutch]: 'Droger',
    [ELanguage.English]: 'Drying machine',
    [ELanguage.French]: 'Sèche-linge',
    [ELanguage.German]: 'Trockner',
    [ELanguage.Spanish]: 'Secadora',
  },
  'amenities-kitchen': {
    [ELanguage.Dutch]: 'Volledig gevulde keuken',
    [ELanguage.English]: 'Fully stocked kitchen',
    [ELanguage.French]: 'Cuisine entièrement équipée',
    [ELanguage.German]: 'Voll ausgestattete Küche',
    [ELanguage.Spanish]: 'Cocina completamente equipada',
  },
  'amenities-bosch-appliances': {
    [ELanguage.Dutch]: 'Bosch-apparaten',
    [ELanguage.English]: 'Bosch appliances',
    [ELanguage.French]: 'Appareils Bosch',
    [ELanguage.German]: 'Bosch-Geräte',
    [ELanguage.Spanish]: 'Electrodomésticos Bosch',
  },
  'amenities-nespresso': {
    [ELanguage.Dutch]: 'Nespresso-apparaat',
    [ELanguage.English]: 'Nespresso machine',
    [ELanguage.French]: 'Machine Nespresso',
    [ELanguage.German]: 'Nespresso-Maschine',
    [ELanguage.Spanish]: 'Cafetera Nespresso',
  },
  'amenities-coffee': {
    [ELanguage.Dutch]: 'Druppel koffiezetapparaat',
    [ELanguage.English]: 'Coffee machine',
    [ELanguage.French]: 'Machine à café filtre',
    [ELanguage.German]: 'Filterkaffeemaschine',
    [ELanguage.Spanish]: 'Cafetera de goteo',
  },
  'amenities-reading-materials': {
    [ELanguage.Dutch]: 'Lees materiaal',
    [ELanguage.English]: 'Reading materials',
    [ELanguage.French]: 'Matériel de lecture',
    [ELanguage.German]: 'Lesematerial',
    [ELanguage.Spanish]: 'Leyendo materiales',
  },
  'amenities-dishes-and-cutlery': {
    [ELanguage.Dutch]: 'Borden & bestek',
    [ELanguage.English]: 'Dishes & cutlery',
    [ELanguage.French]: 'Vaisselle & couverts',
    [ELanguage.German]: 'Geschirr und Besteck',
    [ELanguage.Spanish]: 'Platos y cubiertos',
  },
  'attractions-title': {
    [ELanguage.Dutch]: 'Bezienswaardigheden in de buurt',
    [ELanguage.English]: 'Nearby Attractions',
    [ELanguage.French]: 'Attractions à proximité',
    [ELanguage.German]: 'Sehenswürdigkeiten',
    [ELanguage.Spanish]: 'Atracciones cercanas',
  },
  'attractions-content': {
    [ELanguage.Dutch]: (
      <div className="attractions-text">
        <p><TextStar /> Het dorp Nerja en het beroemde Balkon van Europa <TextStar /></p>
        <p><TextStar /> De Nerja Kristalgrotten <TextStar /></p>
        <p><TextStar /> De Torrox-Costa Paseo <TextStar /></p>
        <p><TextStar /> De Buitenstraatmarkten - in verschillende dorpen elke ochtend van 10.00 tot 14.00 uur <TextStar /></p>
        <p><TextStar /> De Rio Chillar Rivierwandeling <TextStar /></p>
        <p><TextStar /> De dorpen Frigiliana en Competa <TextStar /></p>
        <p><TextStar /> Het Alhambra Kasteel in Granada en het Sierra Nevada Bergskistation <TextStar /></p>
        <p><TextStar /> De Oude Stad van Malaga en de Caminito del Rey Wandeling <TextStar /></p>
      </div>
    ),
    [ELanguage.English]: (
      <div className="attractions-text">
        <p><TextStar /> The <strong>Village</strong> of <strong>Nerja</strong> and the famous <strong>Balcony of Europe</strong> <TextStar /></p>
        <p><TextStar /> The <strong>Nerja Crystal Caves</strong> <TextStar /></p>
        <p><TextStar /> The <strong>Torrox-Costa Paseo</strong> <TextStar /></p>
        <p><TextStar /> The <strong>Outdoor Street Markets</strong> - in different villages every morning from 10am to 2pm <TextStar /></p>
        <p><TextStar /> The <strong>Rio Chillar River Walk</strong> <TextStar /></p>
        <p><TextStar /> The <strong>Villages</strong> of <strong>Frigiliana</strong> and <strong>Competa</strong> <TextStar /></p>
        <p><TextStar /> The <strong>Alhambra Castle in Granada</strong> and the <strong>Sierra Nevada Mountain Ski Station</strong> <TextStar /></p>
        <p><TextStar /> The <strong>Old City of Malaga</strong> and the <strong>Caminito del Rey Hike</strong> <TextStar /></p>
      </div>
    ),
    [ELanguage.French]: (
      <div className="attractions-text">
        <p><TextStar /> Le village de Nerja et le célèbre Balcon de l'Europe <TextStar /></p>
        <p><TextStar /> Les grottes de cristal de Nerja <TextStar /></p>
        <p><TextStar /> La promenade Torrox-Costa <TextStar /></p>
        <p><TextStar /> Les marchés de rue en plein air - dans différents villages chaque matin de 10h à 14h <TextStar /></p>
        <p><TextStar /> La promenade sur la rivière Rio Chillar <TextStar /></p>
        <p><TextStar /> Les villages de Frigiliana et Competa <TextStar /></p>
        <p><TextStar /> Le château de l'Alhambra à Grenade et la station de ski de la Sierra Nevada <TextStar /></p>
        <p><TextStar /> La vieille ville de Malaga et la randonnée du Caminito del Rey <TextStar /></p>
      </div>
    ),
    [ELanguage.German]: (
      <div className="attractions-text">
        <p><TextStar /> Das Dorf Nerja und der berühmte Balkon Europas <TextStar /></p>
        <p><TextStar /> Die Kristallhöhlen von Nerja <TextStar /></p>
        <p><TextStar /> Der Torrox-Costa Paseo <TextStar /></p>
        <p><TextStar /> Die Straßenmärkte im Freien – jeden Morgen von 10 bis 14 Uhr in verschiedenen Dörfern <TextStar /></p>
        <p><TextStar /> Der Spaziergang am Fluss Rio Chillar <TextStar /></p>
        <p><TextStar /> Die Dörfer Frigiliana und Competa <TextStar /></p>
        <p><TextStar /> Die Alhambra in Granada und die Skistation im Gebirge Sierra Nevada <TextStar /></p>
        <p><TextStar /> Die Altstadt von Malaga und die Wanderung auf dem Caminito del Rey <TextStar /></p>
      </div>
    ),
    [ELanguage.Spanish]: (
      <div className="attractions-text">
        <p><TextStar /> El pueblo de Nerja y el famoso Balcón de Europa <TextStar /></p>
        <p><TextStar /> Las cuevas de cristal de Nerja <TextStar /></p>
        <p><TextStar /> El paseo de Torrox-Costa <TextStar /></p>
        <p><TextStar /> Los mercadillos al aire libre, en diferentes pueblos todas las mañanas de 10:00 a 14:00 horas <TextStar /></p>
        <p><TextStar /> El paseo fluvial del río Chillar <TextStar /></p>
        <p><TextStar /> Los pueblos de Frigiliana y Cómpeta <TextStar /></p>
        <p><TextStar /> El castillo de la Alhambra en Granada y la estación de esquí de Sierra Nevada <TextStar /></p>
        <p><TextStar /> El casco antiguo de Málaga y la ruta de senderismo del Caminito del Rey <TextStar /></p>
      </div>
    ),
  },
  'attractions-more-attractions-button': {
    [ELanguage.Dutch]: 'Meer attracties',
    [ELanguage.English]: 'More attractions',
    [ELanguage.French]: "Plus d'attractions",
    [ELanguage.German]: 'Weitere Attraktionen',
    [ELanguage.Spanish]: 'Más atracciones',
  },
  'gallery-title': {
    [ELanguage.Dutch]: 'Galerij',
    [ELanguage.English]: 'Gallery',
    [ELanguage.French]: 'Galerie',
    [ELanguage.German]: 'Galerie',
    [ELanguage.Spanish]: 'Galería',
  },
  'testimonials-title': {
    [ELanguage.Dutch]: 'Getuigenissen',
    [ELanguage.English]: 'Testimonials',
    [ELanguage.French]: 'Témoignages',
    [ELanguage.German]: 'Referenzen',
    [ELanguage.Spanish]: 'Testimonios',
  },
  'testimonials-1': {
    [ELanguage.Dutch]: 'Fantastisch appartement met een ongeëvenaard uitzicht. Elke keer weer een genot om op het balkon te zitten en te genieten van het prachtige zeezicht. Centraal gelegen nabij Nerja en Torrox en Torrox Costa maar ook perfecte plek om de omgeving te verkennen en de leuke kleine dorpjes te verkennen.',
    [ELanguage.English]: 'Fantastic apartment with an unparalleled view. A pleasure every time to sit on the balcony and enjoy the beautiful sea view. Centrally located near Nerja and Torrox and Torrox Costa but also perfect place to explore the area and explore the nice little villages.',
    [ELanguage.French]: "Fantastique appartement avec une vue imprenable. Un plaisir à chaque fois de s'asseoir sur le balcon et de profiter de la belle vue mer. Idéalement situé près de Nerja et Torrox et Torrox Costa mais aussi un endroit parfait pour explorer la région et explorer les jolis petits villages.",
    [ELanguage.German]: 'Fantastische Wohnung mit unvergleichlicher Aussicht. Es ist jedes Mal ein Vergnügen, auf dem Balkon zu sitzen und den wunderschönen Meerblick zu genießen. Zentral gelegen in der Nähe von Nerja, Torrox und Torrox Costa, aber auch der perfekte Ort, um die Gegend zu erkunden und die schönen kleinen Dörfer zu erkunden.',
    [ELanguage.Spanish]: 'Fantástico apartamento con una vista inigualable. Un placer cada vez para sentarse en el balcón y disfrutar de la hermosa vista al mar. Situado en el centro cerca de Nerja y Torrox y Torrox Costa, pero también es un lugar perfecto para explorar la zona y explorar los bonitos pueblecitos.',
  },
  'testimonials-2': {
    [ELanguage.Dutch]: 'We waren erg blij met deze accommodatie. Het is alles wat de reclame zegt. Van het uitzicht op de zee en de heuvels tot het interieur en de inrichting, we waren er allemaal blij mee. Een auto is handig om gemakkelijk toegang te krijgen tot de winkels in Torrox Costa en Nerja. De snelweg A7 is gemakkelijk te bereiken en van daaruit kunt u naar Granada, Ronda (een must see), Sevilla en Malaga dwalen. Charmaine is een uitstekende gastvrouw en zorgde ervoor dat alles vanaf haar kant soepel verliep. Het zou geweldig zijn om terug te komen voor een volgend bezoek.',
    [ELanguage.English]: 'We were extremely happy with this property. It is everything that the advertising says. From the views of the sea and hills to the interior and furnishings we were happy with it all. A car is handy to get easy access to the shopping in Torrox Costa and Nerja. The A7 highway is within easy reach and from there you can roam to Granada, Ronda (a must see), Seville and Malaga. Charmaine is an excellent hostess and made sure everything went smoothly from her end. It would be great to come back for another visit.',
    [ELanguage.French]: "Nous avons été extrêmement satisfaits de cette propriété. C'est tout ce que dit la publicité. De la vue sur la mer et les collines à l'intérieur et au mobilier, nous étions satisfaits de tout. Une voiture est pratique pour accéder facilement aux magasins de Torrox Costa et Nerja. L'autoroute A7 est facilement accessible et de là, vous pourrez vous rendre à Grenade, Ronda (un must), Séville et Malaga. Charmaine est une excellente hôtesse et s'est assurée que tout se passait bien de son côté. Ce serait formidable de revenir pour une autre visite.",
    [ELanguage.German]: 'Wir waren äußerst zufrieden mit dieser Immobilie. Es ist alles, was die Werbung sagt. Von der Aussicht auf das Meer und die Hügel bis hin zur Inneneinrichtung und Einrichtung waren wir mit allem zufrieden. Ein Auto ist praktisch, um die Einkaufsmöglichkeiten in Torrox Costa und Nerja bequem zu erreichen. Die Autobahn A7 ist leicht zu erreichen und von dort aus können Sie nach Granada, Ronda (ein Muss), Sevilla und Malaga fahren. Charmaine ist eine ausgezeichnete Gastgeberin und hat dafür gesorgt, dass von Anfang an alles reibungslos verlief. Es wäre toll, für einen weiteren Besuch wiederzukommen.',
    [ELanguage.Spanish]: 'Estábamos extremadamente contentos con esta propiedad. Es todo lo que dice la publicidad. Desde las vistas del mar y las colinas hasta el interior y el mobiliario, quedamos satisfechos con todo. Un coche es útil para acceder fácilmente a las tiendas de Torrox Costa y Nerja. La autopista A7 es de fácil acceso y desde allí puede viajar a Granada, Ronda (una visita obligada), Sevilla y Málaga. Charmaine es una excelente anfitriona y se aseguró de que todo transcurriera sin problemas por su parte. Sería genial volver para otra visita.',
  },
  'testimonials-3': {
    [ELanguage.Dutch]: "Eerlijk gezegd de beste vakantie tot nu toe! We hebben ruim een maand genoten van dit appartement en wilden niet meer naar huis. De locatie is geweldig en het uitzicht was meer dan geweldig. De communicatie voor aankomst was uitzonderlijk omdat alle details en aanwijzingen volledig werden uitgelegd. Elke dag kijken naar de golven vanaf het terras terwijl we genoten van onze maaltijden was heerlijk. 'S Nachts slapen met het geluid van de golven was ook een onverwachte bonus. De keuken is goed uitgerust en het appartement was erg schoon. We zullen snel terugkeren. Bedankt!",
    [ELanguage.English]: 'Honestly the best holiday yet! We enjoyed over a month in this apartment and we did not want to go home. The location is wonderful and the view was beyond amazing. The communication before arrival was exceptional as all details and directions were explained completely. Everyday, watching the waves from the terrace as we enjoyed our meals was lovely. Sleeping at night to the sound of the waves was an unexpected bonus too. The kitchen is well-equipped and the apartment was very clean. We will return soon. Thank you!',
    [ELanguage.French]: "Honnêtement, les meilleures vacances à ce jour! Nous avons passé plus d'un mois dans cet appartement et nous ne voulions pas rentrer chez nous. L'emplacement est magnifique et la vue était incroyable. La communication avant l'arrivée était exceptionnelle car tous les détails et les directions étaient complètement expliqués. Chaque jour, regarder les vagues depuis la terrasse pendant que nous apprécions nos repas était charmant. Dormir la nuit au son des vagues était aussi un bonus inattendu. La cuisine est bien équipée et l'appartement était très propre. Nous reviendrons bientôt. Merci!",
    [ELanguage.German]: 'Ehrlich gesagt der beste Urlaub bisher! Wir haben über einen Monat in dieser Wohnung genossen und wollten nicht nach Hause. Die Lage ist wunderbar und die Aussicht war einfach unglaublich. Die Kommunikation vor der Ankunft war außergewöhnlich, da alle Details und Anweisungen vollständig erklärt wurden. Jeden Tag die Wellen von der Terrasse aus zu beobachten, während wir unsere Mahlzeiten genossen, war herrlich. Nachts zum Rauschen der Wellen zu schlafen war auch ein unerwarteter Bonus. Die Küche ist gut ausgestattet und die Wohnung war sehr sauber. Wir werden bald wiederkommen. Danke schön!',
    [ELanguage.Spanish]: 'Honestamente, ¡las mejores vacaciones hasta ahora! Disfrutamos más de un mes en este apartamento y no queríamos volver a casa. La ubicación es maravillosa y la vista era más que increíble. La comunicación antes de la llegada fue excepcional ya que todos los detalles e instrucciones se explicaron completamente. Todos los días, ver las olas desde la terraza mientras disfrutábamos de nuestras comidas fue encantador. Dormir por la noche con el sonido de las olas también fue una ventaja inesperada. La cocina está bien equipada y el apartamento estaba muy limpio. Volveremos pronto. ¡Gracias!',
  },
  'testimonials-4': {
    [ELanguage.Dutch]: 'De beschrijving van de aanbieding was volledig correct. Eenheid was erg schoon, net als het complex. Gemakkelijk 45 minuten rijden van de luchthaven van Malaga. Prachtige ritten naar Nerja, Torrox, Granada, Almuñécar, Mijas, Sevilla en de Sierra Nevada Mtns (om te skiën!), enz. Centrale locatie om tijd door te brengen op al deze fantastische plaatsen. Vooral Nerja is heel dichtbij en heeft geweldige restaurants, de grotten en het uitzicht vanaf het Balcón de Europa is adembenemend. Uitzicht op de oceaan is ook geweldig vanaf de unit. De eigenaar bood geweldige klantenservice. Onmiddellijke antwoorden op alle vragen die we hadden. Zeer online beschikbaar om ervoor te zorgen dat onze check-in eenvoudig was. Zou deze accommodatie ten zeerste aanbevelen.',
    [ELanguage.English]: 'Listing description was completely accurate. Unit was very clean, as was the complex. Easy 45 minute drive from the Malaga airport. Wonderful drives to Nerja, Torrox, Granada, Almuñécar, Mijas, Seville, and the Sierra Nevada Mtns (to ski!), etc. Central location to spend time in all these fantastic places. Nerja in particular is very close and has great restaurants, the caves, and the views from the Balcón de Europa are stunning. Ocean views amazing from the unit as well. The owner provided great customer service. Immediate replies to any questions we had. Very available on line to ensure our check-in was easy. Would highly recommend this property.',
    [ELanguage.French]: "La description de la liste était tout à fait exacte. L'unité était très propre, tout comme le complexe. Facile à 45 minutes en voiture de l'aéroport de Malaga. Merveilleuses routes vers Nerja, Torrox, Grenade, Almuñécar, Mijas, Séville et les montagnes de la Sierra Nevada (pour skier !), etc. Emplacement central pour passer du temps dans tous ces endroits fantastiques. Nerja en particulier est très proche et possède d'excellents restaurants, les grottes et les vues depuis le Balcón de Europa sont à couper le souffle. Vue sur l'océan incroyable depuis l'unité également. Le propriétaire a fourni un excellent service client. Des réponses immédiates à toutes les questions que nous avions. Très disponible en ligne pour s'assurer que notre enregistrement a été facile. Je recommande vivement cette propriété.",
    [ELanguage.German]: 'Die Beschreibung des Eintrags war völlig korrekt. Die Einheit war sehr sauber, ebenso wie die Anlage. Einfache 45-minütige Fahrt vom Flughafen Malaga entfernt. Wunderbare Fahrten nach Nerja, Torrox, Granada, Almuñécar, Mijas, Sevilla und in die Berge der Sierra Nevada (zum Skifahren!) usw. Zentrale Lage, um Zeit an all diesen fantastischen Orten zu verbringen. Insbesondere Nerja ist ganz in der Nähe und bietet tolle Restaurants, die Höhlen und die Aussicht vom Balcón de Europa sind atemberaubend. Auch die Aussicht auf das Meer ist von der Unterkunft aus atemberaubend. Der Besitzer bot einen tollen Kundenservice. Sofortige Antworten auf alle Fragen, die wir hatten. Sehr gut online verfügbar, um sicherzustellen, dass unser Check-in einfach war. Kann diese Unterkunft wärmstens empfehlen.',
    [ELanguage.Spanish]: 'La descripción de la lista era completamente precisa. La unidad estaba muy limpia, al igual que el complejo. Fácil 45 minutos en coche del aeropuerto de Málaga. Maravillosos viajes a Nerja, Torrox, Granada, Almuñécar, Mijas, Sevilla y Sierra Nevada Mtns (¡para esquiar!), etc. Ubicación central para pasar el tiempo en todos estos lugares fantásticos. Nerja en particular está muy cerca y tiene excelentes restaurantes, las cuevas y las vistas desde el Balcón de Europa son impresionantes. Vistas al mar increíbles desde la unidad también. El propietario brindó un excelente servicio al cliente. Respuestas inmediatas a cualquier duda que tuviéramos. Muy disponible en línea para garantizar que nuestro registro fuera fácil. Recomiendo encarecidamente esta propiedad.',
  },
  'testimonials-read-more': {
    [ELanguage.Dutch]: 'Lees meer recensies op',
    [ELanguage.English]: 'Read more reviews on',
    [ELanguage.French]: "Lire plus d'avis sur",
    [ELanguage.German]: 'Weitere Rezensionen lesen Sie auf',
    [ELanguage.Spanish]: 'Lea más reseñas en',
  },
  'testimonials-read-more-and': {
    [ELanguage.Dutch]: 'en',
    [ELanguage.English]: 'and',
    [ELanguage.French]: 'et',
    [ELanguage.German]: 'und',
    [ELanguage.Spanish]: 'y',
  },
  'back-to-top-button': {
    [ELanguage.Dutch]: 'Terug naar boven',
    [ELanguage.English]: 'Back to top',
    [ELanguage.French]: 'Retour au sommet',
    [ELanguage.German]: 'Zurück nach oben',
    [ELanguage.Spanish]: 'Volver arriba',
  },
  'trademark': {
    [ELanguage.Dutch]: `${new Date().getFullYear()} Alle rechten voorbehouden`,
    [ELanguage.English]: `${new Date().getFullYear()} All rights reserved`,
    [ELanguage.French]: `${new Date().getFullYear()} Tous droits réservés`,
    [ELanguage.German]: `${new Date().getFullYear()} Alle Rechte vorbehalten`,
    [ELanguage.Spanish]: `${new Date().getFullYear()} Todos los derechos reservados`,
  },
  'inquiry-modal-title': {
    [ELanguage.Dutch]: 'Dien een onderzoek in',
    [ELanguage.English]: 'Submit an Inquiry',
    [ELanguage.French]: 'Soumettre une demande',
    [ELanguage.German]: 'Senden Sie eine Anfrage',
    [ELanguage.Spanish]: 'Enviar una consulta',
  },
  'inquiry-modal-email-label': {
    [ELanguage.Dutch]: 'Email',
    [ELanguage.English]: 'Email',
    [ELanguage.French]: 'Email',
    [ELanguage.German]: 'Email',
    [ELanguage.Spanish]: 'Correo electrónico',
  },
  'inquiry-modal-email-helper-text': {
    [ELanguage.Dutch]: 'We zullen uw informatie nooit met iemand anders delen.',
    [ELanguage.English]: "We'll never share your information with anyone else.",
    [ELanguage.French]: "Nous ne partagerons jamais vos informations avec qui que ce soit d'autre.",
    [ELanguage.German]: 'Wir werden Ihre Daten niemals an Dritte weitergeben.',
    [ELanguage.Spanish]: 'Nunca compartiremos su información con nadie más.',
  },
  'inquiry-modal-first-label': {
    [ELanguage.Dutch]: 'Voornaam',
    [ELanguage.English]: 'First',
    [ELanguage.French]: 'Prénom',
    [ELanguage.German]: 'Vorname',
    [ELanguage.Spanish]: 'Nombre de pila',
  },
  'inquiry-modal-last-label': {
    [ELanguage.Dutch]: 'Achternaam',
    [ELanguage.English]: 'Last',
    [ELanguage.French]: "Nom de famille",
    [ELanguage.German]: 'Nachname',
    [ELanguage.Spanish]: 'Apellido',
  },
  'inquiry-modal-phone-label': {
    [ELanguage.Dutch]: 'Telefoon',
    [ELanguage.English]: 'Phone',
    [ELanguage.French]: 'Téléphone',
    [ELanguage.German]: 'Telefon',
    [ELanguage.Spanish]: 'Teléfono',
  },
  'inquiry-modal-adults-label': {
    [ELanguage.Dutch]: 'Volwassenen',
    [ELanguage.English]: 'Adults',
    [ELanguage.French]: 'Adultes',
    [ELanguage.German]: 'Erwachsene',
    [ELanguage.Spanish]: 'Adultos',
  },
  'inquiry-modal-children-label': {
    [ELanguage.Dutch]: 'Kinderen',
    [ELanguage.English]: 'Children',
    [ELanguage.French]: 'Enfants',
    [ELanguage.German]: 'Kinder',
    [ELanguage.Spanish]: 'Niños',
  },
  'inquiry-modal-message-label': {
    [ELanguage.Dutch]: 'Bericht',
    [ELanguage.English]: 'Message',
    [ELanguage.French]: 'Message',
    [ELanguage.German]: 'Nachricht',
    [ELanguage.Spanish]: 'Mensaje',
  },
  'inquiry-modal-message-placeholder-1': {
    [ELanguage.Dutch]: 'Ik ben geïnteresseerd in het boeken van deze accommodatie',
    [ELanguage.English]: 'I am interested in booking this property',
    [ELanguage.French]: 'Je suis intéressé par la réservation de cette propriété',
    [ELanguage.German]: 'Ich bin an der Buchung dieser Unterkunft interessiert',
    [ELanguage.Spanish]: 'Estoy interesado en reservar esta propiedad.',
  },
  'inquiry-modal-message-placeholder-2': {
    [ELanguage.Dutch]: 'Neem contact met mij op met wat aanvullende informatie.',
    [ELanguage.English]: 'Please contact me with some additional information.',
    [ELanguage.French]: "S'il vous plaît contactez-moi avec quelques informations supplémentaires.",
    [ELanguage.German]: 'Bitte kontaktieren Sie mich mit weiteren Informationen.',
    [ELanguage.Spanish]: 'Por favor, póngase en contacto conmigo con alguna información adicional.',
  },
  'inquiry-modal-message-placeholder-from': {
    [ELanguage.Dutch]: 'van',
    [ELanguage.English]: 'from',
    [ELanguage.French]: 'depuis',
    [ELanguage.German]: 'aus',
    [ELanguage.Spanish]: 'de',
  },
  'inquiry-modal-message-placeholder-to': {
    [ELanguage.Dutch]: 'naar',
    [ELanguage.English]: 'to',
    [ELanguage.French]: 'pour',
    [ELanguage.German]: 'zu',
    [ELanguage.Spanish]: 'a',
  },
  'inquiry-modal-cancel-button': {
    [ELanguage.Dutch]: 'Annuleren',
    [ELanguage.English]: 'Cancel',
    [ELanguage.French]: 'Annuler',
    [ELanguage.German]: 'Stornieren',
    [ELanguage.Spanish]: 'Cancelar',
  },
  'inquiry-modal-send-button': {
    [ELanguage.Dutch]: 'Versturen',
    [ELanguage.English]: 'Send',
    [ELanguage.French]: 'Envoyer',
    [ELanguage.German]: 'Schicken',
    [ELanguage.Spanish]: 'Enviar',
  },
  'inquiry-modal-booking-fees': {
    [ELanguage.Dutch]: 'Reserveringskosten',
    [ELanguage.English]: 'Booking Fees',
    [ELanguage.French]: 'Frais de reservation',
    [ELanguage.German]: 'Buchungsgebühren',
    [ELanguage.Spanish]: 'Costos de reserva',
  },
  'inquiry-modal-item': {
    [ELanguage.Dutch]: 'Item',
    [ELanguage.English]: 'Item',
    [ELanguage.French]: 'Article',
    [ELanguage.German]: 'Artikel',
    [ELanguage.Spanish]: 'Artículo',
  },
  'inquiry-modal-fee': {
    [ELanguage.Dutch]: 'Tarief',
    [ELanguage.English]: 'Fee',
    [ELanguage.French]: 'Frais',
    [ELanguage.German]: 'Gebühr',
    [ELanguage.Spanish]: 'Tarifa',
  },
  'inquiry-modal-day': {
    [ELanguage.Dutch]: 'dag',
    [ELanguage.English]: 'day',
    [ELanguage.French]: 'jour',
    [ELanguage.German]: 'tag',
    [ELanguage.Spanish]: 'día',
  },
  'inquiry-modal-days': {
    [ELanguage.Dutch]: 'dagen',
    [ELanguage.English]: 'days',
    [ELanguage.French]: 'jours',
    [ELanguage.German]: 'tage',
    [ELanguage.Spanish]: 'días',
  },
  'inquiry-modal-additional-linen-package': {
    [ELanguage.Dutch]: 'extra linnenpakket',
    [ELanguage.English]: 'additional linen package',
    [ELanguage.French]: 'paquet de linge supplémentaire',
    [ELanguage.German]: 'zusätzliches Wäschepaket',
    [ELanguage.Spanish]: 'paquete de ropa de cama adicional',
  },
  'inquiry-modal-additional-linen-packages': {
    [ELanguage.Dutch]: 'extra linnenpakketten',
    [ELanguage.English]: 'additional linen packages',
    [ELanguage.French]: 'paquets de linge supplémentaires',
    [ELanguage.German]: 'zusätzliche Wäschepakete',
    [ELanguage.Spanish]: 'paquetes de ropa de cama adicionales',
  },
  'inquiry-modal-linens-disclaimer': {
    [ELanguage.Dutch]: 'Bij elk verblijf zijn twee linnenpakketten gratis inbegrepen.',
    [ELanguage.English]: 'Two linen packages are included free with every stay.',
    [ELanguage.French]: 'Deux paquets de linge sont inclus gratuitement avec chaque séjour.',
    [ELanguage.German]: 'Bei jedem Aufenthalt sind zwei Wäschepakete kostenlos inbegriffen.',
    [ELanguage.Spanish]: 'Se incluyen dos paquetes de ropa de cama gratis con cada estadía.',
  },
  'post-submission-modal-1': {
    [ELanguage.Dutch]: 'Bedankt voor je interesse!',
    [ELanguage.English]: 'Thank you for your interest!',
    [ELanguage.French]: 'Merci pour ton intérêt!',
    [ELanguage.German]: 'Danke für dein Interesse!',
    [ELanguage.Spanish]: '¡Gracias por su interés!',
  },
  'post-submission-modal-2': {
    [ELanguage.Dutch]: 'We nemen spoedig contact met u op met meer details over uw reservering.',
    [ELanguage.English]: 'We will contact you shortly with more details about your reservation.',
    [ELanguage.French]: 'Nous vous contacterons sous peu avec plus de détails sur votre réservation.',
    [ELanguage.German]: 'Wir werden Sie in Kürze mit weiteren Einzelheiten zu Ihrer Reservierung kontaktieren.',
    [ELanguage.Spanish]: 'Nos pondremos en contacto con usted en breve con más detalles sobre su reserva.',
  },
  'post-submission-modal-3': {
    [ELanguage.Dutch]: 'U kunt ons ook altijd bereiken op',
    [ELanguage.English]: 'You can also reach us any time at',
    [ELanguage.French]: 'Vous pouvez également nous joindre à tout moment au',
    [ELanguage.German]: 'Sie können uns auch jederzeit unter erreichen',
    [ELanguage.Spanish]: 'También puede comunicarse con nosotros en cualquier momento en',
  },
  'post-submission-modal-4': {
    [ELanguage.Dutch]: 'Een fijne dag verder!',
    [ELanguage.English]: 'Have a great day!',
    [ELanguage.French]: 'Passe une bonne journée!',
    [ELanguage.German]: 'Ich wünsche ihnen einen wunderbaren Tag!',
    [ELanguage.Spanish]: '¡Qué tengas un lindo día!',
  },
  'post-submission-modal-close-button': {
    [ELanguage.Dutch]: 'Dichtbij',
    [ELanguage.English]: 'Close',
    [ELanguage.French]: 'Fermer',
    [ELanguage.German]: 'Schließen',
    [ELanguage.Spanish]: 'Cerca',
  },
};
