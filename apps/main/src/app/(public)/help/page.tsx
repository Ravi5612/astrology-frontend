"use client";

import React, { useEffect, useState } from "react";
import SupportTab from "@/components/features/profile/SupportTab";
import { getSupportSettings, SupportSettings } from "@/libs/api-profile";
import { HiOutlineSparkles } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";

const HelpSupportPage = () => {
  const [supportSettings, setSupportSettings] = useState<SupportSettings>({
    email: 'support@astrologyinbharat.com',
    phone: '+919876543210',
    whatsapp: '+919876543210'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const [data, _error] = await getSupportSettings();
        if (data) {
          setSupportSettings(data);
        }
      } catch (error) {
        console.error("Failed to load support settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSupport();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center py-32 px-4 overflow-hidden">
      {/* Celestial Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"></div>
      
      <div className="max-w-4xl w-full relative z-10 space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-md rounded-full border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
            <HiOutlineSparkles className="text-orange text-xs" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Help & Support Center</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-none tracking-tighter uppercase">
            How Can We <br/>
            <span className="text-orange italic underline underline-offset-[12px] decoration-orange/20">Help You?</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-slate-200 shadow-premium animate-pulse">
            <FaSpinner className="animate-spin text-orange text-3xl mb-4" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em]">Igniting Support Channels</p>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-premium border border-slate-100 overflow-hidden transform hover:-translate-y-2 transition-transform duration-700 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="relative">
              {/* Subtle accent line inside the card */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange to-indigo-600"></div>
              <SupportTab supportSettings={supportSettings} />
            </div>
          </div>
        )}

        <div className="text-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
           <div className="inline-flex items-center gap-4 px-8 py-3 bg-white rounded-full border border-slate-100 shadow-sm">
             <i className="fa-solid fa-shield-check text-orange text-xs"></i>
             <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Secure Communication Channel v2.4</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
