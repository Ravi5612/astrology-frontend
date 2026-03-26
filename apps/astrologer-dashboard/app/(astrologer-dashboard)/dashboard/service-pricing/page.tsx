"use client";

import React, { useState, useEffect } from 'react';
import { Star, Edit3, Gift, Loader2, Trash2, Plus, MessageSquare, Phone, Video, Sparkles } from "lucide-react";
import { getProfile, updateProfile } from "@/lib/profile";
import { Profile } from "@/components/ProfileManagement/types";
import { toast } from "react-toastify";
import { ServiceModal, ServiceModalService } from "@/components/shared/ServiceModal";

// ---- Static standard services ----
const buildServices = (profile: Profile | null) => [
  {
    key: "chat_price",
    name: "Chat Consultation",
    price: profile?.chat_price ?? 0,
    unit: "/ min",
    description: "Quick answers through chat with expert astrologers.",
    offer: "10% off first session",
    icon: MessageSquare,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    isCustom: false,
  },
  {
    key: "call_price",
    name: "Voice Call",
    price: profile?.call_price ?? 0,
    unit: "/ min",
    description: "Direct voice consultation with our astrologers.",
    offer: "15% off first session",
    icon: Phone,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    isCustom: false,
  },
  {
    key: "video_call_price",
    name: "Video Call",
    price: profile?.video_call_price ?? 0,
    unit: "/ min",
    description: "Face-to-face video consultation for detailed guidance.",
    offer: "25% off weekends",
    icon: Video,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    isCustom: false,
  },
  ...(profile?.custom_services || []).map(s => ({
    key: `custom-${s.id}`,
    name: s.name,
    price: s.price,
    unit: s.unit,
    description: s.description || "Custom service provided by expert.",
    offer: "",
    icon: Sparkles,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    isCustom: true,
    id: s.id,
  }))
];

const ServicePricingPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<ServiceModalService | undefined>();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      if (data) setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load pricing data.");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (svc: ServiceModalService) => {
    setEditTarget(svc);
    setModalMode("edit");
  };

  const openAdd = () => {
    setEditTarget(undefined);
    setModalMode("add");
  };

  const handleSaved = (updated: Profile) => {
    setProfile(updated);
    setModalMode(null);
  };

  const handleDeleteService = async (id: string) => {
    if (!profile) return;
    if (!window.confirm("Are you sure you want to remove this service?")) return;
    try {
      const updated = (profile.custom_services || []).filter(s => s.id !== id);
      await updateProfile({ custom_services: updated });
      setProfile({ ...profile, custom_services: updated });
      toast.success("Service removed successfully!");
    } catch (error) {
      console.error("Failed to delete service:", error);
      toast.error("Failed to remove service.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-600" />
      </div>
    );
  }

  const services = buildServices(profile);

  return (
    <div className="p-4 sm:p-8 min-h-screen">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-700 tracking-tight">
          Services &amp; Pricing
        </h1>
        <p className="text-gray-600 mt-3 text-sm sm:text-lg">
          Manage your services, set attractive pricing, and create offers for your clients.
        </p>
        <button
          onClick={openAdd}
          className="mt-6 flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-full shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Custom Service
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {services.map((service: any) => (
          <div
            key={service.key}
            className={`relative bg-white p-6 sm:p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all border ${service.isCustom ? 'border-yellow-200' : 'border-gray-200'} group flex flex-col`}
          >
            {/* Icon Badge */}
            <div className={`absolute -top-4 -right-4 p-2.5 rounded-full shadow-lg group-hover:scale-110 transition-transform ${service.isCustom ? 'bg-gradient-to-tr from-yellow-500 to-yellow-600' : 'bg-gradient-to-tr from-yellow-500 to-yellow-600'}`}>
              <service.icon className="w-4 h-4 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed min-h-[40px]">
              {service.description}
            </p>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-yellow-700">
                  ₹{service.price}
                </span>
                <span className="text-gray-500 text-sm font-medium">{service.unit}</span>
              </div>
            </div>

            {/* Offer */}
            {service.offer && (
              <div className="inline-flex items-center px-3 py-1 mb-6 text-xs font-bold text-green-700 bg-green-50 rounded-full border border-green-100 w-fit">
                <Gift className="w-3.5 h-3.5 mr-1" /> {service.offer}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() =>
                  openEdit({
                    key: service.key,
                    name: service.name,
                    price: service.price,
                    unit: service.unit,
                    description: service.description,
                    isCustom: service.isCustom,
                    id: service.id,
                  })
                }
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-xl text-sm shadow-sm transition-all active:scale-95"
              >
                <Edit3 className="w-4 h-4" />
                Edit Pricing
              </button>

              {service.isCustom && (
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="flex items-center justify-center px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-xl transition-colors"
                  aria-label="Delete service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Shared Service Modal */}
      {modalMode && (
        <ServiceModal
          mode={modalMode}
          service={editTarget}
          profile={profile}
          onClose={() => setModalMode(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};

export default ServicePricingPage;
