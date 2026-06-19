import React from "react";
import Image from "next/image";
import { AstrologyServicesData } from "@/components/features/services/homePagaData";

const AstrologyServices = () => {
  return (
    <section className="bg-edeef1 space-section">
      <div className="container">
        <div className="light-card mt-4">
          <h2 className="title-line mb-3 text-black font-black" style={{ fontSize: 'clamp(1.1rem, 4vw, 2.25rem)' }}>
            <span>Astrology Services </span>
          </h2>
          <div className="overflow-hidden">
            <div className="h-[550px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="row mx-0">
                {AstrologyServicesData.map((service) => (
                  <div className="col-6 col-md-4 col-lg-3 px-2 mb-4" key={service.id}>
                    <div className="bg-white overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.08)] border-[0.5px] border-primary text-center p-2 sm:p-3 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-md h-full flex flex-col cursor-pointer">
                      <div className="flex-grow">
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={260}
                          height={150}
                          className="rounded-lg border border-[#daa23ea1] w-full h-[90px] sm:h-[150px] object-cover mb-1 sm:mb-2"
                        />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800 mt-1 sm:mt-2 px-1 leading-tight sm:leading-normal">
                        {service.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <br className="mobile-none" />


      </div>
    </section>
  );
};

export default AstrologyServices;


