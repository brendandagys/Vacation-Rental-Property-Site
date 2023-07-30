import { FooterText } from './FooterText';

export const Footer = () => (
  <div id="map" className='d-flex flex-column justify-content-center align-items-center footer'>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3197.4067387539094!2d-3.935007073487389!3d36.736806972265285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCalle%20Cipr%C3%A9s%2C%20Bloque%206%2C%20Apto%206132!5e0!3m2!1sen!2sca!4v1683338409221!5m2!1sen!2sca" // eslint-disable-line max-len
      width="95%"
      height="92%"
      loading="lazy"
    />

    <FooterText />
  </div>
);
