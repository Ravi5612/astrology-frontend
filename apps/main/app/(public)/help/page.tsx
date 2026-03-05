"use client";

import React, { useEffect, useState } from "react";
import SupportTab from "@/components/features/profile/SupportTab";
import { getSupportSettings, SupportSettings } from "@/libs/api-profile";

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
        const data = await getSupportSettings();
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
    <section className="banner-part light-back p-5 md:py-10 min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="shadow-lg rounded-4 overflow-hidden">
                <SupportTab supportSettings={supportSettings} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSupportPage;
