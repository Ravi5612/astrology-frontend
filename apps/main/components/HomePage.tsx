import React from "react";
import {
  ListOfAllAstrologers,
  ZodiacSignsData,
  AstrologyServicesData,
  ClientsTestimoinialData,
} from "@/components/features/services/homePagaData";
import "swiper/css";
import "swiper/css/navigation";
import NextLink from "next/link";
const Link = NextLink as any;
import ProductsCarousel from "@/components/features/shop/ProductsCarousel";
import AstrologerCard from "@/components/features/astrologers/AstrologerCard";
import homePageData from "@/public/data/home-page-data.json";

const HomePage: React.FC = () => {
  const { hero, whyChooseUs } = homePageData;

  return (
    <>
      {/* Hero Section */}
      <section className="banner-part ">
        <div className="overlay-hero">
          <div className="container">
            <div className="row align">
              <div className="col-lg-7 col-md-12">
                <h1>
                  Connect with
                  <span style={{ color: "#daa23e" }}>
                    Verified <br /> Astrologers{" "}
                  </span>
                  Online
                </h1>
                <h4 className="card-title mt-4 mb-4">
                  {hero.subtitle}
                </h4>
                <p>
                  {hero.description}
                </p>
                <ul className="list-check">
                  {hero.benefits.map((benefit, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-check"></i> {benefit}
                    </li>
                  ))}
                </ul>
                <a href="#" className="bg-orange hover:opacity-90 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all mt-4 mb-4 inline-block text-decoration-none">
                  Start Consultation
                </a>
              </div>
              <div className="col-lg-5 col-md-12">
                <div className="right-hero">
                  <img
                    src="images/Astrologer.png"
                    alt="Astrologer"
                    className="Astrologer-img"
                  />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              {hero.cards.map((card) => (
                <div key={card.id} className="col-sm-3 col-6">
                  <a href={card.link}>
                    <div className="card-hero vert-move">
                      <img src={card.image} alt={card.title} />
                      <h5>{card.title}</h5>
                      <p>{card.description}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Astrologer Listing */}
      <section className="astrologer-list">
        <div className="container">
          <h2>Find Your Astrologer</h2>

          <div className="search-box">
            <input type="text" placeholder="Search Astrologer By Name..." />
            <button className="bg-primary hover:bg-primary-hover text-white transition-all">Search</button>
          </div>

          <div className="astro-grid">
            {ListOfAllAstrologers.map((item) => (
              <AstrologerCard key={item.id} astrologerData={{
                ...item,
                is_available: true,
                video: item.video || ""
              }} />
            ))}
          </div>

          <div className="view-all">
            <a href="#" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all m-auto flex items-center justify-center w-fit text-decoration-none">
              View All Astrologers
            </a>
          </div>
        </div>
      </section>

      <section className="horoscopes-container">
        <div className="container">
          <div className="row">
            <h2 className="text-center mt-3 mb-2 horoscopes-heading">
              Choose Your Zodiac Sign
            </h2>
            <p className="text-center horoscopes-heading">
              Discover Your Daily, Monthly and Yearly Horoscope
            </p>

            {ZodiacSignsData.map((item) => (
              <div className="col-lg-2 col-sm-6 col-md-4 col-6" key={item.id}>
                <a href="#">
                  <div className="horoscopes-items">
                    <img src={item.image} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p className="fw-normal">{item.date}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 !bg-white overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-12 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-[#301118] mb-4 pb-4 relative inline-block">
              Astrologfdhf   y Services
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange"></div>
            </h2>
            <div className="w-full h-[1px] bg-gray-200 absolute bottom-0 left-0 -z-10"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {AstrologyServicesData.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#fdfaf5] p-8 rounded-2xl border border-orange/10 hover:border-orange/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center"
              >
                <div className="mb-6 relative inline-block">
                  <div className="absolute inset-0 bg-orange/5 rounded-full scale-150 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10 animate-bounce-slow"
                  />
                </div>
                <h4 className="text-xl font-bold mb-3 text-[#301118] group-hover:text-orange transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="product-slider-section py-50 bg-cream">
        <div className="container">
          <h2 className="text-center mb-5 heading section-title">
            🔮 Our Astrological Products
          </h2>
          <div className="product-slider-container">
            <ProductsCarousel />
          </div>
        </div>
      </section>

      <section className="py-50 why-choose-us text-white">
        <div className="container">
          <h2 className="text-center  mb-5 heading text-black">
            {whyChooseUs.title}
          </h2>
          <div className="row d-flex align-items-center">
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
              <div className="d-flex flex-column gap-3">
                {whyChooseUs.promises.slice(0, 3).map((promise, idx) => (
                  <div key={idx} className="promise-item p-3 border border-secondary rounded-3 d-flex align-items-center">
                    <i className={`${promise.icon} fa-2x me-3 text-sand`}></i>
                    <div className="text-start">
                      <h6 className="fw-bold mb-0 text-black">{promise.title}</h6>
                      <small className="text-muted">{promise.description}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4 col-md-12 text-center my-4 my-lg-0">
              <img
                src="/images/Astrologer.png"
                alt="Astrologer talking"
                className="img-fluid rounded-circle border border-gray"
                style={{ width: "300px", height: "300px", objectFit: "cover" }}
              />
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="d-flex flex-column gap-3">
                {whyChooseUs.promises.slice(3, 6).map((promise, idx) => (
                  <div key={idx} className="promise-item p-3 border border-secondary rounded-3 d-flex align-items-center">
                    <i className={`${promise.icon} fa-2x me-3 text-sand`}></i>
                    <div className="text-start">
                      <h6 className="fw-bold mb-0 text-black">{promise.title}</h6>
                      <small className="text-muted">{promise.description}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section bg-cream py-50">
        <div className="container text-center">
          <h2 className="section-heading heading mb-5">What Our Clients Say</h2>
          <div className="row">
            {ClientsTestimoinialData.map((client) => (
              <div className="col-lg-4 col-md-6 mb-4" key={client.id}>
                <div className="ser-card p-4 h-100 vert-move">
                  <i
                    className="fa-solid fa-quote-left fa-2x mb-3"
                    style={{ color: "#daa23e" }}
                  ></i>
                  <p>{client.review}</p>
                  <div className="mt-3 d-flex align-items-center justify-content-center flex-column">
                    <img
                      src="/images/dummy-astrologer.jpg"
                      alt={client.name}
                      className="rounded-circle mb-2"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                    <strong>{client.name}</strong>
                    <div className="rating-star">
                      {"★".repeat(Math.floor(client.rating))}
                      {client.rating % 1 !== 0 ? "½" : ""}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-astrologers  py-50 ">
        <div className="container text-center">
          <h2 className="section-heading heading mb-5">
            Meet Our Trusted Astrologers
          </h2>
          <div className="row justify-content-center">
            {ListOfAllAstrologers.filter((astro) => astro.ratings >= 4.5)
              .slice(0, 3)
              .map((item) => (
                <div className="col-lg-4 col-md-6 mb-4 " key={item.id}>
                  <div
                    className="astro-card  ser-card card h-100 border border-gray shadow position-relative overflow-hidden"
                    style={{
                      borderRadius: "15px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    <div className="position-relative p-4 pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-circle  border-3 border-warning shadow"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                      <span
                        className="badge position-absolute"
                        style={{
                          background:
                            "linear-gradient(45deg, #f7d774, #e0a800)",
                          color: "#000",
                          top: "20px",
                          right: "20px",
                          fontSize: "0.8rem",
                        }}
                      >
                        ⭐ Top Rated
                      </span>
                    </div>

                    <div className="card-body mt-3">
                      <h5 className="fw-bold astro-name">{item.name}</h5>
                      <p className="card-subtitle mb-2 text-muted">
                        {item.expertise}
                      </p>

                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <div
                          className="rating-star text-warning"
                          style={{ fontSize: "1.1rem" }}
                        >
                          {"★".repeat(Math.floor(item.ratings))}
                        </div>
                        <small className="ms-2 text-muted">
                          {item.ratings.toFixed(1)} / 5 ({item.ratings} reviews)
                        </small>
                      </div>

                      <div className="d-flex justify-content-between text-muted small mb-2">
                        <span>
                          Experience:{" "}
                          <span className="fw-bold">{item.experience}</span>
                        </span>
                        <span>
                          Consultations:{" "}
                          <span className="fw-bold">{item.ratings}</span>
                        </span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0 fw-bold text-success">
                          ₹{item.price}/min
                        </h6>
                        <span className="badge bg-success">● Online</span>
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn"
                          style={{
                            background:
                              "linear-gradient(45deg, #ff9800, #f57c00)",
                            color: "white",
                            fontWeight: "600",
                            borderRadius: "25px",
                            padding: "10px",
                          }}
                        >
                          <i className="bi bi-chat-dots-fill me-2"></i> Chat Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
