import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { ELanguage, textData as data } from "../static/text";

interface LanguageContext {
  language: ELanguage;
  getText: (name: string) => string | ReactElement;
  setLanguage: (language: ELanguage) => void;
}

const LanguageContext = createContext({} as LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<ELanguage>(ELanguage.English);

  const getText = (name: string): string | ReactElement =>
    data[name]?.[language] || data[name]?.[ELanguage.English];

  return (
    <LanguageContext.Provider
      value={{
        language,
        getText,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
