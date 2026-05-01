import { useEffect, useRef, memo } from "react";
import Hls from "hls.js";

const BackgroundVideo = memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = "https://stream.mux.com/hUT6X11m1Vkw1QMxPOLgI761x2cfpi9bHFbi5cNg4014.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover -z-10"
    />
  );
});

BackgroundVideo.displayName = "BackgroundVideo";

export default BackgroundVideo;
