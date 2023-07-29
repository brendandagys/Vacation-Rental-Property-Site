import { useRef } from 'react';
import { tourVideo } from '../static/images';
import { useViewportWidth } from '../hooks/useViewportWidth';

export const Video = () => {
  const width = useViewportWidth();

  const videoRef = useRef(null);

  const setPlayback = () => {
    if (videoRef.current) {
      (videoRef.current as { playbackRate: number; }).playbackRate = 1.5;
    }
  };

  return (
    <div id="tour" className="d-flex justify-content-center bg-black">
      <video
        controls
        autoPlay
        width={width < 1200 ? '100%' : '70%'}
        height="100%"
        id="video"
        loop
        style={{ objectFit: 'cover' }}
        muted
        onCanPlay={setPlayback}
        ref={videoRef}
      >
        <source src={tourVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
