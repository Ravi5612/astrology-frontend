"use client";

import React from "react";
import NextImage from "next/image";
import { X } from "lucide-react";

const Image = NextImage as any;
const XIcon = X as any;

interface AstrologerMediaModalsProps {
  astrologerName: string;
  selectedVideo: string | null;
  setSelectedVideo: (url: string | null) => void;
  selectedImage: string | null;
  setSelectedImage: (url: string | null) => void;
}

const AstrologerMediaModals: React.FC<AstrologerMediaModalsProps> = ({
  astrologerName,
  selectedVideo,
  setSelectedVideo,
  selectedImage,
  setSelectedImage,
}) => {
  return (
    <>
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors backdrop-blur-md"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full max-h-[80vh]"
                controlsList="nodownload"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="bg-white p-4 flex items-center justify-between border-t border-gray-100">
              <h4 className="text-base font-bold text-gray-800">Playing Video</h4>
              <span className="text-xs text-gray-500">Astrologer {astrologerName}</span>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedVideo(null)}></div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors bg-white/10 rounded-full backdrop-blur-md"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
              <Image src={selectedImage} alt="Full view" fill className="object-contain" />
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedImage(null)}></div>
        </div>
      )}
    </>
  );
};

export default AstrologerMediaModals;
