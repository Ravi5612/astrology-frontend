import React from "react";
import WhyChooseUs from "@/components/layout/main/WhyChooseUs";
import CTA from "@/components/layout/main/CTA";

export default function AstrologyConsultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <WhyChooseUs />
      <CTA />
    </>
  );
}
