import { ReactNode, useState } from "react"

interface ITextContainerProps {
  children: ReactNode;
}

export const TextContainer = ({ children }: ITextContainerProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={`${expanded ? '' : 'overflow-hidden'}`}
        style={{ maxHeight: expanded ? undefined : 500 }}
      >
        {children}
      </div>

      <div className="text-center pt-4">
        <button
          className="button button--small button--shadow"
          onClick={() => setExpanded((old) => !old)}
        >
          {expanded ? 'Close' : 'Read more'}
        </button>
      </div>
    </>
  )
}
