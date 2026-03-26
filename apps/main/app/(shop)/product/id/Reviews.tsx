"use client";

import React from "react";
import { Swiper as Sw, SwiperSlide as Ss } from "swiper/react";
const Swiper = Sw as any;
const SwiperSlide = Ss as any;
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

interface ReviewStat {
  stars: number;
  count: number;
}

interface ReviewsProps {
  avgRating: number;
  totalRatings: number;
  reviewStats: ReviewStat[];
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) =>
  Array.from({ length: 5 }, (_, i) => (
    <i
      key={i}
      className={`fas fa-star ${i < rating ? "text-warning" : "text-muted"}`}
    ></i>
  ));

const Reviews: React.FC<ReviewsProps> = ({
  avgRating,
  totalRatings,
  reviewStats,
}) => {
  return (
    <section className="mt-5">
      <h3 className="fw-bold mb-4 text-center" style={{ color: "#732882" }}>
        Authentic Customer Reviews
      </h3>
      <div className="d-flex align-items-center justify-content-center mb-3">
        <h1
          className="me-3 mb-0 display-4 fw-bold"
          style={{ color: "#d9a03d" }}
        >
          {avgRating}
        </h1>
        <div>
          <StarRating rating={avgRating} />
          <p className="ms-2 mb-0 text-muted small mt-1">
            {totalRatings.toLocaleString()} verified ratings
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          {reviewStats.map((r, idx) => (
            <div className="d-flex align-items-center mb-2" key={idx}>
              <span
                className="me-2 fw-bold"
                style={{ width: "50px", color: "#732882" }}
              >
                {r.stars} <i className="fas fa-star text-warning"></i>
              </span>
              <div
                className="progress flex-grow-1"
                style={{ height: "10px", background: "#f0f0f0" }}
              ></div>
              <span className="ms-3 text-muted" style={{ width: "60px" }}>
                {r.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-outline-secondary px-4">
          Write a Review
        </button>
      </div>

      <hr className="my-5" />

      {/* Testimonials Section */}
      <section className="mb-5">
        <h3 className="fw-bold mb-4 text-center" style={{ color: "#732882" }}>
          Stories from Our Customers
        </h3>
        <div className="row g-4 justify-content-center">
          <div className="col-md-10">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper"
            >
              {[
                {
                  name: "Amit Sharma",
                  img: "/images/dummy-astrologer.jpg",
                  rating: 5,
                  text: "The moment I put on this bracelet, I felt a shift in my energy. It's beautiful and powerful. Fast delivery and excellent quality.",
                },
                {
                  name: "Priya Verma",
                  img: "/images/dummy-astrologer.jpg",
                  rating: 4,
                  text: "A truly beautiful product. The packaging was exquisite, and the positive vibes were immediate. Highly recommend to anyone seeking balance.",
                },
                {
                  name: "Rohit Mehta",
                  img: "/images/dummy-astrologer.jpg",
                  rating: 5,
                  text: "Impeccable quality and authenticity. The design is so elegant, it feels like it was made just for me. A must-have for daily wear.",
                },
                {
                  name: "Sneha Patel",
                  img: "/images/dummy-astrologer.jpg",
                  rating: 5,
                  text: "I've been wearing it for a month, and I've noticed a significant improvement in my focus and overall well-being. Thank you for this magical piece!",
                },
              ].map((review, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className="card my-5  border border-gray shadow-sm rounded-lg"
                    style={{ background: "#fcfcfb" }}
                  >
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <img
                          src={review.img}
                          alt={review.name}
                          className="rounded-circle mb-3 border border-3 border-warning"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <h5
                          className="fw-bold mb-1"
                          style={{ color: "#732882" }}
                        >
                          {review.name}
                        </h5>
                        <div className="mb-2">
                          <StarRating rating={review.rating} />
                        </div>
                        <p
                          className="text-muted"
                          style={{ fontSize: "0.95rem" }}
                        >
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Reviews;
