"use client";
import React, { useState } from "react";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { rating: number; review: string; name: string }) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError("Please select a star rating.");
            return;
        }
        if (!review.trim()) {
            setError("Please write a review.");
            return;
        }
        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }

        onSubmit({ rating, review, name });
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setRating(0);
        setHoverRating(0);
        setReview("");
        setName("");
        setError(null);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-premium overflow-hidden animate-in zoom-in-95 fade-in duration-500">
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center text-[#732882]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#732882]/10 text-[#732882] flex items-center justify-center text-xl">
              <i className="fa-solid fa-pen-fancy"></i>
            </div>
            <div>
              <h2 className="text-xl font-black m-0">Share Your Story</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1 m-0">Rate your experience</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-[#732882] hover:text-white transition-all duration-300 hover:rotate-90"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="px-10 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Star Rating */}
            <div className="flex flex-col items-center">
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`text-4xl transition-all duration-300 transform hover:scale-125 ${
                      star <= (hoverRating || rating) ? "text-orange scale-110" : "text-gray-100"
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <i className={`${star <= (hoverRating || rating) ? "fa-solid" : "fa-regular"} fa-star`}></i>
                  </button>
                ))}
              </div>
              <div className="mt-4 px-4 py-1.5 bg-orange/10 rounded-full text-orange font-black text-xs uppercase tracking-widest">
                {rating > 0 ? `${rating} / 5 Stars` : "Tap a star to rate"}
              </div>
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div className="group">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#732882]/30 focus:bg-white focus:ring-4 focus:ring-[#732882]/5 transition-all outline-none font-bold text-sm"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Review Textarea */}
              <div className="group">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">
                  Write a Review
                </label>
                <textarea
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#732882]/30 focus:bg-white focus:ring-4 focus:ring-[#732882]/5 transition-all outline-none font-bold text-sm min-h-[140px] resize-none"
                  placeholder="Tell us about your experience..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center gap-3 font-bold text-sm animate-in slide-in-from-top-2">
                <i className="fa-solid fa-circle-exclamation text-lg"></i>
                {error}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full py-5 bg-[#732882] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-premium hover:shadow-2xl hover:bg-[#732882]/90 transition-all flex items-center justify-center gap-3"
              >
                <i className="fa-solid fa-paper-plane"></i>
                Submit Review
              </button>
              <button
                type="button"
                className="w-full py-5 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center gap-3"
                onClick={handleClose}
              >
                <i className="fa-solid fa-xmark"></i>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;


