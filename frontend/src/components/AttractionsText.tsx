import { useLanguage } from '../context/languageContext';

export const AttractionsText = () => {
  const { getText } = useLanguage();

  return <>{getText('attractions-content')}</>;
};
