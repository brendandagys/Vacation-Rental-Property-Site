import { useRef } from 'react';
import { tourVideo } from '../static/images';

export const Video = () => {
  const videoRef = useRef(null);

  const setPlayback = () => {
    if (videoRef.current) {
      (videoRef.current as { playbackRate: number }).playbackRate = 1.75;
    }
  };

  return (
    <div style={{ width: '100%', height: 550 }}>
      <video
        controls
        autoPlay
        width="100%"
        height="100%"
        id="video"
        loop
        style={{ objectFit: 'cover' }}
        muted
        onCanPlay={setPlayback}
        ref={videoRef}
      >
        <source src={tourVideo} type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
