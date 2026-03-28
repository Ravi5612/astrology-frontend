"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";
import NextImage from "next/image";

interface VerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  buttonText?: string;
}

export const VerificationPopup: React.FC<VerificationPopupProps> = ({
  isOpen,
  onClose,
  email,
  title = "Verify Your Email",
  description,
  icon,
  buttonText = "I Understand",
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Small delay to allow element to be mounted before triggering transition
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300); // Wait for transition out
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-0 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 mb-6 bg-orange/10 rounded-full flex items-center justify-center animate-pulse">
            {icon || <CheckCircle className="w-10 h-10 text-orange" />}
          </div>

          <h3 className="text-2xl font-black text-gray-900 mb-2">
            {title}
          </h3>
          
          <div className="text-gray-600 mb-6 leading-relaxed">
            {description || (
              <>
                We've sent a verification link to <br />
                <span className="font-bold text-gray-900">{email}</span>
                <br />
                Please check your inbox (and spam folder) to activate your account.
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-2xl bg-orange text-white font-bold text-base shadow-[0_8px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_10px_25px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

