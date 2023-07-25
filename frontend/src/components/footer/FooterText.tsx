import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { scrollTo } from '../Navbar';

export const FooterText = () => (
  <>
    <button className="button button--small mb-1 mt-5" onClick={() => scrollTo('home')}>
      Back to top
    </button>

    <div className='mt-5 mb-5'>
      <p className='font-xs app__copyright'>
        <FontAwesomeIcon icon={faCopyright} /> 2023 All rights reserved
      </p>
    </div>
  </>
);
