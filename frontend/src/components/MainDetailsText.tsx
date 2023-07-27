import { useLanguage } from '../context/languageContext';

export const MainDetailsText = () => {
  const { getText } = useLanguage();

  return <>{getText('main-details-text')}</>;
};
