"use client";

import React from "react";

interface UserDetailFormHeroProps {
  astrologerName: string;
}

const UserDetailFormHero: React.FC<UserDetailFormHeroProps> = ({ astrologerName }) => {
  return (
    <section className="banner-part">
      <div className="overlay-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <h1 className="mb-3">
                Book Your <span style={{ color: "#daa23e" }}>Consultation</span>
              </h1>
              <p className="text-white" style={{ fontSize: "18px" }}>
                Share your details and schedule a session with {astrologerName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetailFormHero;
