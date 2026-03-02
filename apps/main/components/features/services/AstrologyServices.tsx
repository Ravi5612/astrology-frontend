import React from "react";
import homepageData from "../../../public/data/homepage.json";
import ServiceCard from "./ServiceCard";
import NextLink from "next/link";

const Link = NextLink as any;

const AstrologyServices = () => {
  return (
    <section className="!bg-[#edeef1] py-10 md:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="bg-white p-5 md:p-6 rounded-[3px] shadow-[0_4px_9px_0_rgba(0,0,0,0.08)] mt-4">
          <h2 className="text-[32px] font-semibold mb-[35px] relative pb-[15px] text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#a9a9a92b] after:w-full">
            <span className="relative after:content-[''] after:bg-orange after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-15px]">
              Astrology Services
            </span>
          </h2>
          <div className="overflow-hidden">
            <div className="h-[550px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-orange/50 [&::-webkit-scrollbar-thumb]:rounded-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {homepageData.astrologyServices.map((service) => (
                  <div key={service.id} className="mb-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="block h-full no-underline hover:text-inherit"
                    >
                      <ServiceCard item={service} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AstrologyServices;
