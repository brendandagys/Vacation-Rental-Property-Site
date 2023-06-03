import { ReactNode, useState } from 'react';

interface ITextContainerProps {
  buttonColor?: 'blue' | 'green' | 'yellow';
  children: ReactNode;
}

export const TextContainer = ({ buttonColor, children }: ITextContainerProps) => {
  const [ expanded, setExpanded ] = useState(false);

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
          {expanded ? 'Close' : 'Read more'}
        </button>
      </div>
    </>
  );
};
