import React, { useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { EStars } from "../types/testimonial";

interface StarRatingProps {
  value: EStars;
  onChange: (value: EStars) => void;
  disabled?: boolean;
}

// Map indices (0-10) to enum values for half-step increments
const order: EStars[] = [
  EStars.Zero,
  EStars.Half,
  EStars.One,
  EStars.OneAndAHalf,
  EStars.Two,
  EStars.TwoAndAHalf,
  EStars.Three,
  EStars.ThreeAndAHalf,
  EStars.Four,
  EStars.FourAndAHalf,
  EStars.Five,
];

const enumFromIndex = (i: number): EStars =>
  order[Math.min(Math.max(i, 0), order.length - 1)];

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const idx = order.indexOf(value);

  const displayStars = useMemo(() => {
    // We want to show 5 star glyphs. Each click zone (10) corresponds to half increments.
    // We'll overlay half buttons using a wrapper.
    return [0, 1, 2, 3, 4];
  }, []);

  const handleClick = useCallback(
    (i: number) => {
      if (!disabled) {
        onChange(enumFromIndex(i));
      }
    },
    [onChange, disabled]
  );

  return (
    <div
      className="testimonial-star-rating"
      role="radiogroup"
      aria-label="Star rating"
    >
      {displayStars.map((starIndex) => {
        // Determine the two indices representing half steps for this star
        const leftIdx = starIndex * 2 + 1; // half
        const fullIdx = starIndex * 2 + 2; // full
        const isFull = idx >= fullIdx;
        const isHalf = !isFull && idx === leftIdx;

        return (
          <div
            key={starIndex}
            className="star-wrapper position-relative d-inline-block"
          >
            <button
              type="button"
              className="star-button star-button-half"
              aria-label={`${starIndex + 0.5} stars`}
              aria-checked={idx === leftIdx}
              role="radio"
              onClick={() => handleClick(leftIdx)}
              disabled={disabled}
            >
              <FontAwesomeIcon
                icon={
                  isFull || isHalf
                    ? isHalf
                      ? faStarHalfStroke
                      : solidStar
                    : regularStar
                }
              />
            </button>

            <button
              type="button"
              className="star-button star-button-full"
              aria-label={`${starIndex + 1} stars`}
              aria-checked={idx === fullIdx}
              role="radio"
              onClick={() => handleClick(fullIdx)}
              disabled={disabled}
            >
              <FontAwesomeIcon
                icon={
                  isFull ? solidStar : isHalf ? faStarHalfStroke : regularStar
                }
              />
            </button>
          </div>
        );
      })}

      <span className="ms-2 small">{(idx * 0.5).toFixed(1)} / 5</span>
    </div>
  );
};
