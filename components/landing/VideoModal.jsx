"use client";
import { X, PlayCircle } from "lucide-react";
import "./VideoModal.css";
import { useModalStore } from "@/stores/modal.store";
import { useRef, useState } from "react";

function VideoModal() {
  const { closeVideoModal } = useModalStore();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <div className="video-modal">
      <div className="hamos-video-demo">
        <div className="video-top">
          <p>Hamos Barkey Demo Video</p>
          <X onClick={closeVideoModal} className="X" />
        </div>
        <div className="video-div video-wrapper">
          <video
            ref={videoRef}
            src="/videos/ads.mp4"
            className="video-player"
          />
          {!isPlaying && (
            <div className="video-overlay" onClick={handlePlay}>
              <PlayCircle size={80} color="white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
