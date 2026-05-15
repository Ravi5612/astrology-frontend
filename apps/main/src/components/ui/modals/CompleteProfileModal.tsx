"use client";

import React from "react";
import AddressField from "./AddressField";
import { useCompleteProfile } from "./useCompleteProfile";

interface CompleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
}

const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
  isOpen,
  onClose,
  onSkip,
}) => {
  const {
    formData,
    isLoading,
    error,
    successMessage,
    handleInputChange,
    handleAddressChange,
    handleAddAddress,
    handleRemoveAddress,
    handleSubmit,
    handleReset,
  } = useCompleteProfile(onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-premium overflow-hidden animate-in zoom-in-95 fade-in duration-500 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange/10 text-orange flex items-center justify-center text-xl">
              <i className="fa-solid fa-user-edit"></i>
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 m-0">Complete Your Profile</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Enhance your experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-orange hover:text-white transition-all transition-transform hover:rotate-90 duration-300"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-10 py-8 custom-scrollbar">
          <form onSubmit={handleSubmit} id="profile-form" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DOB */}
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">
                  Date of Birth <span className="text-gray-400 italic lowercase font-bold ml-1">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all outline-none font-bold text-sm"
                    name="date_of_birth"
                    value={formData.date_of_birth || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all outline-none font-bold text-sm appearance-none cursor-pointer"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Preferences */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">
                  Preferences <span className="text-gray-400 italic lowercase font-bold ml-1">(Optional)</span>
                </label>
                <textarea
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all outline-none font-bold text-sm min-h-[120px] resize-none"
                  name="preferences"
                  value={formData.preferences || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your astrology preferences..."
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="pt-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-gray-900">Delivery Addresses</h3>
                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange/90 transition-all shadow-lg shadow-orange/20"
                >
                  <i className="fa-solid fa-plus"></i>
                  Add New
                </button>
              </div>

              <div className="space-y-6">
                {formData.addresses?.map((address, index) => (
                  <AddressField
                    key={index}
                    address={address}
                    index={index}
                    totalAddresses={formData.addresses?.length || 0}
                    handleAddressChange={handleAddressChange}
                    handleRemoveAddress={handleRemoveAddress}
                  />
                ))}
              </div>
            </div>

            {/* Error/Success Messages */}
            {(error || successMessage) && (
              <div className="space-y-4">
                {error && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center gap-3 font-bold text-sm animate-in slide-in-from-top-2">
                    <i className="fa-solid fa-circle-exclamation text-lg"></i>
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center gap-3 font-bold text-sm animate-in slide-in-from-top-2">
                    <i className="fa-solid fa-check-circle text-lg"></i>
                    {successMessage}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-4 sticky bottom-0 z-20">
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-orange hover:text-orange transition-all flex items-center justify-center gap-3"
            onClick={handleReset}
            disabled={isLoading}
          >
            <i className="fa-solid fa-rotate-left"></i>
            Reset Form
          </button>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-gray-900 transition-all"
              onClick={onSkip}
              disabled={isLoading}
            >
              Skip for now
            </button>
            <button
              type="submit"
              form="profile-form"
              className="w-full sm:w-auto px-10 py-4 bg-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-premium hover:shadow-2xl hover:bg-orange/90 transition-all flex items-center justify-center gap-3 min-w-[180px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-save"></i>
                  Save Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileModal;
