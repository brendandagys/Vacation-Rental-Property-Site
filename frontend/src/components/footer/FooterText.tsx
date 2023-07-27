import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { scrollTo } from '../Navbar';
import { useLanguage } from '../../context/languageContext';

export const FooterText = () => {
  const { getText } = useLanguage();

  return (
    <>
      <button className="button button--small mb-1 mt-5" onClick={() => scrollTo('home')}>
        {getText('back-to-top-button')}
      </button>

      <div className='mt-5 mb-5'>
        <p className='font-xs app__copyright'>
          <FontAwesomeIcon icon={faCopyright} /> {getText('trademark')}
        </p>
      </div>
    </>
  );
};
