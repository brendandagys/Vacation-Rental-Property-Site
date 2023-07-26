import { ReactNode, useState } from 'react';
import { getText } from '../static/text';

interface ITextContainerProps {
  buttonColor?: 'blue' | 'green' | 'red' | 'yellow';
  buttonText?: string;
  children: ReactNode;
}

export const TextContainer = ({ buttonColor, buttonText, children }: ITextContainerProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={`text-container ${expanded ? '' : 'text-container--collapsed overflow-hidden'}`}
      >
        {children}
      </div>

      <div className="text-center pt-4">
        <button
          className={`button button--small button--${buttonColor ?? ''}`}
          onClick={() => setExpanded((old) => !old)}
        >
          {
            expanded
              ? getText('text-container-close-button')
              : buttonText ?? getText('text-container-read-more-button')
          }
        </button>
      </div>
    </>
  );
};
