import React from "react";
import {
  ListOfAllExperts,
  ZodiacSignsData,
  AstrologyServicesData,
  ClientsTestimoinialData,
} from "@/components/features/services/homePagaData";
import "swiper/css";
import "swiper/css/navigation";
import NextLink from "next/link";
import Image from "next/image";
const Link = NextLink as any;
import ProductsCarousel from "@/components/features/shop/ProductsCarousel";
import ExpertCard from "@/components/features/experts/ExpertCard";
import homePageData from "../../public/data/home-page-data.json";

const HomePage: React.FC = () => {
  const { hero, whyChooseUs } = homePageData;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 text-gray-900 bg-orange/5">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-12">
            <div className="lg:w-7/12 w-full text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-gray-900">
                Connect with
                <span className="text-orange block mt-2">
                  Verified Experts
                </span>
                Online
              </h1>
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 max-w-2xl mx-auto lg:mx-0">
                {hero.subtitle}
              </h4>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {hero.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto lg:mx-0">
                {hero.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-check text-[10px]"></i>
                    </div>
                    <span className="font-bold text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-3 px-10 py-4 bg-orange text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-premium hover:shadow-2xl hover:bg-orange/90 transition-all no-underline translate-y-0 hover:-translate-y-1"
              >
                <span>Start Consultation</span>
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </a>
            </div>

            <div className="lg:w-5/12 w-full relative">
              <div className="relative z-10 animate-float translate-y-4">
                <Image
                  src="/images/Expert.png"
                  alt="Expert"
                  width={500}
                  height={600}
                  priority
                  className="w-full h-auto object-contain max-w-[450px] mx-auto filter drop-shadow-2xl"
                />
              </div>
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange/20 rounded-full blur-[100px] -z-10"></div>
            </div>
          </div>

          {/* User Hero Stats/Quick Links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-20 pt-10">
            {hero.cards.map((card) => (
              <NextLink key={card.id} href={card.link} className="no-underline group">
                <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 border border-white hover:border-orange shadow-premium hover:shadow-2xl transition-all duration-500 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-orange/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <h5 className="text-base font-black text-gray-900 mb-2 truncate max-w-full">
                    {card.title}
                  </h5>
                  <p className="text-xs text-gray-500 font-bold m-0 leading-relaxed truncate max-w-full">
                    {card.description}
                  </p>
                </div>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Listing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 pb-4 relative inline-block">
                Find Your Expert
                <div className="absolute bottom-0 left-0 w-20 h-1.5 bg-orange rounded-full"></div>
              </h2>
              <p className="text-gray-500 font-bold text-sm">
                Search and connect with India's most trusted Vedic experts.
              </p>
            </div>

            <div className="w-full md:w-96 relative group">
              <input
                type="text"
                placeholder="Search Expert By Name..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all outline-none font-bold text-sm"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange transition-colors"></i>
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-orange text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange/90 transition-all shadow-lg shadow-orange/20">
                Search
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {ListOfAllExperts.map((item) => (
              <ExpertCard
                key={item.id}
                expertData={{
                  ...item,
                  id: String(item.id),
                  is_available: true,
                  video: item.video || "",
                }}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-12 py-4 bg-white border-2 border-orange text-orange rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange hover:text-white transition-all duration-300 shadow-premium no-underline"
            >
              <span>View All Experts</span>
              <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-2"></i>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange/5 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-orange/10 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 inline-block relative">
              Choose Your Zodiac Sign
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-orange rounded-full"></div>
            </h2>
            <p className="text-gray-500 font-bold text-sm mt-6">
              Discover Your Daily, Monthly and Yearly Horoscope
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {ZodiacSignsData.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <NextLink href={`/horoscope/${item.title.toLowerCase()}`} className="no-underline">
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white hover:border-orange shadow-premium hover:shadow-2xl transition-all duration-500 text-center h-full flex flex-col items-center group-hover:-translate-y-2">
                    <div className="w-20 h-20 rounded-2xl bg-orange/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2 truncate w-full">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">
                      {item.date}
                    </p>
                    <div className="mt-4 w-8 h-8 rounded-full bg-gray-50 text-gray-300 flex items-center justify-center group-hover:bg-orange group-hover:text-white transition-all transform group-hover:rotate-45">
                      <i className="fa-solid fa-plus text-[10px]"></i>
                    </div>
                  </div>
                </NextLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Astrology Services Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 pb-4 relative inline-block">
              Astrology Siuiuiuervices
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-orange rounded-full"></div>
            </h2>
            <div className="w-full h-px bg-gray-100 absolute bottom-0 left-0 -z-10"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {AstrologyServicesData.map((item) => (
              <div
                key={item.id}
                className="group relative bg-orange/5 p-10 rounded-[2.5rem] border border-transparent hover:border-orange/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl text-center"
              >
                <div className="mb-8 relative inline-block">
                  <div className="absolute inset-0 bg-orange/20 rounded-full scale-150 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="object-contain relative z-10 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h4 className="text-xl font-black mb-4 text-gray-900 group-hover:text-orange transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm font-bold leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Carousel Section */}
      <section className="py-24 bg-orange/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 inline-block relative">
              🔮 Our Astrological Products
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-orange rounded-full"></div>
            </h2>
          </div>
          <div className="relative group p-8 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white shadow-premium">
            <ProductsCarousel />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 inline-block relative">
              {whyChooseUs.title}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-orange rounded-full"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="space-y-8 order-2 lg:order-1">
              {whyChooseUs.promises.slice(0, 3).map((promise, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-6 p-6 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:border-orange/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-white text-orange shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-orange group-hover:text-white transition-all duration-500">
                    <i className={`${promise.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h6 className="font-black text-gray-900 mb-1">
                      {promise.title}
                    </h6>
                    <p className="text-gray-500 text-xs font-bold leading-relaxed m-0">
                      {promise.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Column (Image) */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-orange/5 p-4 flex items-center justify-center relative z-10 bg-white shadow-2xl overflow-hidden">
                  <Image
                    src="/images/Expert.png"
                    alt="Expert talking"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover translate-y-4"
                  />
                </div>
                {/* Rotating Badge / Background Elements */}
                <div className="absolute inset-0 bg-orange/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8 order-3">
              {whyChooseUs.promises.slice(3, 6).map((promise, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-6 p-6 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:border-orange/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-white text-orange shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-orange group-hover:text-white transition-all duration-500">
                    <i className={`${promise.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h6 className="font-black text-gray-900 mb-1">
                      {promise.title}
                    </h6>
                    <p className="text-gray-500 text-xs font-bold leading-relaxed m-0">
                      {promise.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-orange/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 inline-block relative">
              What Our Clients Say
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-orange rounded-full"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ClientsTestimoinialData.map((client) => (
              <div key={client.id} className="group h-full">
                <div className="bg-white p-10 rounded-[2.5rem] border border-white shadow-premium hover:shadow-2xl transition-all duration-500 h-full flex flex-col items-center text-center group-hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-orange/5 flex items-center justify-center mb-8 group-hover:bg-orange group-hover:text-white transition-all duration-500">
                    <i className="fa-solid fa-quote-left text-2xl text-orange group-hover:text-white transition-colors"></i>
                  </div>
                  <p className="text-gray-600 text-sm font-bold leading-relaxed mb-8 flex-1 italic">
                    "{client.review}"
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Image
                        src="/images/dummy-expert.jpg"
                        alt={client.name}
                        width={64}
                        height={64}
                        className="rounded-2xl border-2 border-white shadow-md object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-[10px] border-2 border-white shadow-sm">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    </div>
                    <h6 className="font-black text-gray-900 mb-2 truncate">
                      {client.name}
                    </h6>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`fa-solid fa-star text-xs ${
                            i < Math.floor(client.rating)
                              ? "text-orange"
                              : "text-gray-200"
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experts Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 font-black">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 inline-block relative">
              Meet Our Trusted Experts
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-orange rounded-full"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ListOfAllExperts.filter((astro) => astro.ratings >= 4.5)
              .slice(0, 3)
              .map((item) => (
                <ExpertCard
                  key={item.id}
                  expertData={{
                    ...item,
                    id: String(item.id),
                    is_available: true,
                    video: item.video || "",
                  }}
                  cardClassName="border-0 shadow-premium !rounded-[2.5rem] !p-8"
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
