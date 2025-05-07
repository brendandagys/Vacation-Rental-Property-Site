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
      <div className="details-text">
        <p><TextStar /> GRATIS - Inbegrepen in de prijs:</p>
        <ul>
          <li>Koeling A/C & Verwarming - GEEN MUNTAUTOMAAT</li>
          <li>Internet & Snelle Wi-Fi</li>
          <li>100% Katoenen Luxe Beddengoed en Badhanddoeken (2 inbegrepen in de prijs - extra kosten 16 euro per stuk)</li>
          <li>Garagepark binnen de poort</li>
          <li>Beveiligingskaarttoegang tot 2 privézwembaden</li>
        </ul>

        <br />

        <p><TextStar /> 65" Flat SCREEN SMART-televisie met NETFLIX & 100's kanalen (Frans, Duits, Engels, Spaans) <TextStar /></p>
        <p><TextStar /> LOP 5 minuten naar het privézandstrand EL PENONCILLO. Het El Penoncillo Playa ligt op 200 meter afstand en heeft strandrestaurants die dagelijks verse vis en zeevruchten serveren <TextStar /></p>
        <p><TextStar /> TWEE grote luxe BUITENBADEN met prachtige groene tuinen. Er zijn ligstoelen, parasols en twee ondiepe zwembaden voor kinderen. Zwembaden zijn omheind en worden bewaakt met een beveiligingskaartsysteem om privacy en exclusiviteit te garanderen <TextStar /></p>
        <p><TextStar /> WASMACHINE en DROGER bevinden zich in het appartement voor uw gemak <TextStar /></p>
        <p><TextStar /> GRATIS Privé PARKEERPLAATS voor uw auto in een overdekte garage behorend bij het appartement met een lift op 10 meter afstand om u binnen enkele minuten rechtstreeks naar uw appartement te brengen <TextStar /></p>
        <p><TextStar /> 40 minuten van de luchthaven van Malaga <TextStar /></p>
        <p><TextStar /> Nieuw gebouwd RESORTcomplex met graniet, gepolijste marmeren vloeren, kwaliteitsfittingen en Bosch-apparatuur. Het appartement heeft 2 slaapkamers, 2 badkamers en een volledig uitgeruste keuken. Het bevindt zich op de bovenste verdieping (met lift) <TextStar /></p>
        <p><TextStar /> Spannende TOERISTISCHE ATTRACTIES om dagelijks in elke richting te bezoeken <TextStar /></p>
        <p><TextStar /> Dit is een zeer goed onderhouden en VOLLEDIG uitgeruste woning. Het heeft alles wat een gast ooit nodig zou kunnen hebben om een heerlijke vakantie te garanderen <TextStar /></p>
        <p><TextStar /> Gebruik van een grote parasol en strandmatten <TextStar /></p>
        <p><TextStar /> Perfect voor een romantische, pensioen- of familievakantie. Gegarandeerd het hele jaar door Spaanse zonneschijn <TextStar /></p>
        <p><TextStar /> Langetermijnverhuur is welkom. Geniet van uw wintermaanden in de zon <TextStar /></p>

        <div className='text-center font-sm pt-5 pb-3'>
          <p><i>Nog andere vragen? Neem contact met ons op en we helpen u graag verder.</i></p>
        </div>
      </div>
    ),
    [ELanguage.English]: (
      <div className="details-text">
        <p><TextStar /> FREE - Included In The Price:</p>
        <ul>
          <li>Cooling A/C & Heating - NO COIN MACHINE</li>
          <li>Internet & Fast Wi-Fi</li>
          <li>100% Cotton Luxury Bed linens and Bath Towels (2 included in price - extra are 16 euros each)</li>
          <li>Garage Parking inside gate</li>
          <li>Security card access to 2 private pools</li>
        </ul>

        <br />

        <p><TextStar /> 65" Flat SCREEN SMART television with NETFLIX & 100's of channels (French, German, English, Spanish) <TextStar /></p>
        <p><TextStar /> WALK 5 minutes to the private sandy EL PENONCILLO BEACH. The El Penoncillo Playa is 200 meters away and it has beach restaurants that offer fresh fish and seafood cuisine daily <TextStar /></p>
        <p><TextStar /> TWO large luxurious OUTDOOR POOLS with beautiful green gardens. There are sun loungers, sun shade and two shallow pools for children. Pools are gated and monitored with a security card pass system to ensure privacy and exclusivity <TextStar /></p>
        <p><TextStar /> WASHING MACHINE and DRYER are inside the apartment for your convenience <TextStar /></p>
        <p><TextStar /> FREE Private PARKING for your car in a covered garage belonging to the apartment with a lift 10 meters away to take you directly up to your apartment in minutes <TextStar /></p>
        <p><TextStar /> 40 minutes from the Malaga airport <TextStar /></p>
        <p><TextStar /> Newly built RESORT Complex with granite, polished marble floors, quality fittings and Bosch appliances. The apartment has 2 bedrooms, 2 bathrooms and a fully stocked kitchen. It is on a top floor (with a lift) <TextStar /></p>
        <p><TextStar /> Exciting TOURIST ATTRACTIONS to visit daily in every direction <TextStar /></p>
        <p><TextStar /> This is a very well maintained and FULLY equipped property. It has everything a guest could ever need to ensure a wonderful holiday <TextStar /></p>
        <p><TextStar /> Use of a large beach umbrella & beach mats <TextStar /></p>
        <p><TextStar /> Perfect for a romantic, retirement or family holiday vacation. Guaranteed Spanish sunshine all year <TextStar /></p>
        <p><TextStar /> Long Term Rentals are welcome. Enjoy your winter months in the sun <TextStar /></p>

        <div className='text-center font-sm pt-5 pb-3'>
          <p><i>Any other questions? Please contact us and we'd be happy to help.</i></p>
        </div>
      </div>
    ),
    [ELanguage.French]: (
      <div className="details-text">
        <p><TextStar /> GRATUIT - Inclus dans le prix :</p>
        <ul>
          <li>Climatisation et chauffage - PAS DE MACHINE À PIÈCES</li>
          <li>Internet et Wi-Fi rapide</li>
          <li>Draps de lit et serviettes de bain de luxe 100 % coton (2 inclus dans le prix - les suppléments sont de 16 euros chacun)</li>
          <li>Garage Parking à l'intérieur du portail</li>
          <li>Accès par carte de sécurité à 2 piscines privées</li>
        </ul>

        <br />

        <p><TextStar /> Télévision SMART ÉCRAN PLAT 65" avec NETFLIX et des centaines de chaînes (françaises, allemandes, anglaises, espagnoles) <TextStar /></p>
        <p><TextStar /> À 5 minutes à pied de la plage de sable privée EL PENONCILLO. La plage El Penoncillo est à 200 mètres et dispose de restaurants de plage qui proposent une cuisine de poisson frais et de fruits de mer tous les jours <TextStar /></p>
        <p><TextStar /> DEUX grandes PISCINES EXTÉRIEURES luxueuses avec de beaux jardins verdoyants. Il y a des chaises longues, un parasol et deux piscines peu profondes pour les enfants. Les piscines sont fermées et surveillées par un système de carte de sécurité pour assurer l'intimité et l'exclusivité <TextStar /></p>
        <p><TextStar /> LA MACHINE À LAVER et LA SÈCHE-LINGE sont à l'intérieur de l'appartement pour votre confort <TextStar /></p>
        <p><TextStar /> PARKING privé GRATUIT pour votre voiture dans un parking couvert garage appartenant à l'appartement avec un ascenseur à 10 mètres pour vous emmener directement à votre appartement en quelques minutes <TextStar /></p>
        <p><TextStar /> 40 minutes de l'aéroport de Malaga <TextStar /></p>
        <p><TextStar /> Complexe RESORT récemment construit avec granit, sols en marbre poli, équipements de qualité et appareils Bosch. L'appartement dispose de 2 chambres, 2 salles de bains et une cuisine entièrement équipée. Il est au dernier étage (avec ascenseur) <TextStar /></p>
        <p><TextStar /> ATTRIBUTIONS TOURISTIQUES passionnantes à visiter quotidiennement dans toutes les directions <TextStar /></p>
        <p><TextStar /> C'est une propriété très bien entretenue et ENTIÈREMENT équipée. Elle a tout ce dont un client pourrait avoir besoin pour assurer de merveilleuses vacances <TextStar /></p>
        <p><TextStar /> Utilisation d'un grand parasol et de tapis de plage <TextStar /></p>
        <p><TextStar /> Parfait pour des vacances romantiques, de retraite ou en famille. Soleil espagnol garanti toute l'année <TextStar /></p>
        <p><TextStar /> Les locations à long terme sont les bienvenues. Profitez de vos mois d'hiver au soleil <TextStar /></p>

        <div className='text-center font-sm pt-5 pb-3'>
          <p><i>D'autres questions ? Veuillez nous contacter et nous serons heureux de vous aider.</i></p>
        </div>
      </div>
    ),
    [ELanguage.German]: (
      <div className="details-text">
        <p><TextStar /> KOSTENLOS – Im Preis inbegriffen:</p>
        <ul>
          <li>Kühlung, Klimaanlage und Heizung – KEIN MÜNZAUTOMATEN</li>
          <li>Internet und schnelles WLAN</li>
          <li>Luxusbettwäsche und Badetücher aus 100 % Baumwolle (2 im Preis inbegriffen – zusätzliche kosten jeweils 16 Euro)</li>
          <li>Garagenparkplatz hinter dem Tor</li>
          <li>Zugang zu 2 privaten Pools mit Sicherheitskarte</li>
        </ul>

        <br />

        <p><TextStar /> 65-Zoll-Flachbildfernseher mit NETFLIX und Hunderten von Kanälen (Französisch, Deutsch, Englisch, Spanisch) <TextStar /></p>
        <p><TextStar /> 5 Gehminuten zum privaten Sandstrand EL PENONCILLO. Der Strand El Penoncillo ist 200 Meter entfernt und bietet Strandrestaurants, die täglich frischen Fisch und Meeresfrüchte anbieten <TextStar /></p>
        <p><TextStar /> ZWEI große, luxuriöse AUSSENPOOLS mit wunderschönen grünen Gärten. Es gibt Sonnenliegen, Sonnenschirme und zwei flache Pools für Kinder. Die Pools sind eingezäunt und werden mit einem Sicherheitskarten-Passsystem überwacht, um Privatsphäre und Exklusivität zu gewährleisten <TextStar /></p>
        <p><TextStar /> WASCHMASCHINE und TROCKNER befinden sich für Ihre Bequemlichkeit im Apartment <TextStar /></p>
        <p><TextStar /> KOSTENLOSER privater PARKPLATZ für Ihr Auto in einer überdachten Garage gehört zur Wohnung mit einem Aufzug in 10 Metern Entfernung, der Sie in wenigen Minuten direkt zu Ihrer Wohnung bringt <TextStar /></p>
        <p><TextStar /> 40 Minuten vom Flughafen Malaga entfernt <TextStar /></p>
        <p><TextStar /> Neu gebauter RESORT-Komplex mit Granit, polierten Marmorböden, hochwertigen Armaturen und Bosch-Geräten. Die Wohnung hat 2 Schlafzimmer, 2 Badezimmer und eine voll ausgestattete Küche. Sie befindet sich im obersten Stockwerk (mit Aufzug) <TextStar /></p>
        <p><TextStar /> Spannende TOURISTENATTRAKTIONEN, die man täglich in alle Richtungen besuchen kann <TextStar /></p>
        <p><TextStar /> Dies ist ein sehr gepflegtes und VOLL ausgestattetes Anwesen. Es hat alles, was ein Gast jemals brauchen könnte, um einen wundervollen Urlaub zu gewährleisten <TextStar /></p>
        <p><TextStar /> Nutzung eines großen Sonnenschirms und Strandmatten <TextStar /></p>
        <p><TextStar /> Perfekt für einen romantischen Urlaub, einen Ruhestand oder einen Familienurlaub. Garantierter spanischer Sonnenschein das ganze Jahr über <TextStar /></p>
        <p><TextStar /> Langzeitmieten sind willkommen. Genießen Sie Ihre Wintermonate in der Sonne <TextStar /></p>

        <div className='text-center font-sm pt-5 pb-3'>
          <p><i>Noch Fragen? Bitte kontaktieren Sie uns und wir helfen Ihnen gerne weiter.</i></p>
        </div>
      </div>
    ),
    [ELanguage.Spanish]: (
      <div className="details-text">
        <p><TextStar /> GRATIS - Incluido en el precio:</p>
        <ul>
          <li>Aire acondicionado y calefacción - NO HAY MÁQUINA DE MONEDAS</li>
          <li>Internet y Wi-Fi rápido</li>
          <li>Ropa de cama y toallas de baño de lujo 100 % algodón (2 incluidas en el precio; las adicionales cuestan 16 euros cada una)</li>
          <li>Estacionamiento en garaje dentro de la puerta</li>
          <li>Acceso con tarjeta de seguridad a 2 piscinas privadas</li>
        </ul>

        <br />

        <p><TextStar /> Televisión SMART DE PANTALLA PLANA DE 65" con NETFLIX y cientos de canales (francés, alemán, inglés, español) <TextStar /></p>
        <p><TextStar /> CAMINE 5 minutos hasta la PLAYA PRIVADA DE ARENA EL PENONCILLO. La Playa El Peñóncillo está a 200 metros y tiene restaurantes de playa que ofrecen pescado fresco y mariscos todos los días <TextStar /></p>
        <p><TextStar /> DOS PISCINAS AL AIRE LIBRE grandes y lujosas con hermosos jardines verdes. Hay tumbonas, sombrillas y dos piscinas poco profundas para niños. Las piscinas están cerradas y monitoreadas con un sistema de pase de tarjeta de seguridad para garantizar la privacidad y la exclusividad <TextStar /></p>
        <p><TextStar /> LA LAVADORA y la SECADORA están dentro del apartamento para su comodidad <TextStar /></p>
        <p><TextStar /> ESTACIONAMIENTO privado GRATUITO para Su coche en un garaje cubierto perteneciente al apartamento con un ascensor a 10 metros de distancia para llevarlo directamente a su apartamento en minutos <TextStar /></p>
        <p><TextStar /> A 40 minutos del aeropuerto de Málaga <TextStar /></p>
        <p><TextStar /> Complejo RESORT de nueva construcción con granito, suelos de mármol pulido, accesorios de calidad y electrodomésticos Bosch. El apartamento tiene 2 dormitorios, 2 baños y una cocina completamente equipada. Está en un piso superior (con ascensor) <TextStar /></p>
        <p><TextStar /> Atractivos turísticos emocionantes para visitar a diario en todas las direcciones <TextStar /></p>
        <p><TextStar /> Esta es una propiedad muy bien mantenida y TOTALMENTE equipada. Tiene todo lo que un huésped pueda necesitar para garantizar unas maravillosas vacaciones <TextStar /></p>
        <p><TextStar /> Uso de una gran sombrilla de playa y colchonetas de playa <TextStar /></p>
        <p><TextStar /> Perfecto para unas vacaciones románticas, de jubilación o familiares. Sol español garantizado todo el año <TextStar /></p>
        <p><TextStar /> Alquileres a largo plazo son bienvenidos. Disfrute de sus meses de invierno bajo el sol <TextStar /></p>

        <div className='text-center font-sm pt-5 pb-3'>
          <p><i>¿Alguna otra pregunta? Por favor, póngase en contacto con nosotros y estaremos encantados de ayudarle.</i></p>
        </div>
      </div>
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

