import { useLanguage } from '../context/languageContext';

export const MoreDetailsText = () => {
  const { getText } = useLanguage();

  return <>{getText('details-content')}</>;
};
