import React from "react";
import homepageData from "../../../public/data/homepage.json";

const Testimonial = () => {
  return (
    <section className="!bg-[#edeef1] py-10 md:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="bg-white p-5 md:p-6 rounded-[3px] shadow-[0_4px_9px_0_rgba(0,0,0,0.08)]">
          <h2 className="text-[32px] font-semibold mb-[35px] relative pb-[15px] text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#a9a9a92b] after:w-full">
            <span className="relative after:content-[''] after:bg-orange after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-15px]">
              What Our Users Say
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepageData.testimonials.map((testi) => (
              <div key={testi.id} className="h-full">
                <div className="bg-white rounded-[18px] p-6 transition-all duration-300 border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1.5 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={testi.image}
                      alt={testi.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-orange p-0.5"
                    />
                    <div className="ml-4">
                      <h5 className="text-lg font-bold text-[#32131a] m-0">
                        {testi.name}
                      </h5>
                      <span className="text-sm text-gray-500 font-medium">
                        {testi.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-orange text-2xl mb-2 tracking-[2px]">
                    {"★".repeat(testi.rating)}
                  </div>
                  <p className="text-base text-[#311219] leading-relaxed flex-grow italic">
                    "{testi.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
