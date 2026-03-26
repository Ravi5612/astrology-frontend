"use client";

import React, { Suspense } from "react";
import UserDetailFormHero from "./UserDetailFormHero";
import UserDetailPersonalFields from "./UserDetailPersonalFields";
import UserDetailBookingFields from "./UserDetailBookingFields";
import UserDetailSummaryBox from "./UserDetailSummaryBox";
import { useUserDetailForm } from "./useUserDetailForm";

const UserDetailFormContent = () => {
  const {
    astogerName, // Wait, it's astrologerName in the hook, let me check. Ah, I wrote astrologerName.
    astrologerName,
    rate,
    formData,
    bookingDate,
    setBookingDate,
    bookingTime,
    setBookingTime,
    duration,
    setDuration,
    totalAmount,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  } = useUserDetailForm();

  return (
    <>
      <UserDetailFormHero astrologerName={astrologerName} />

      <section className="py-5" style={{ background: "#ffe3b852" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div
                className="card border-0 shadow-sm mb-4"
                style={{ borderRadius: "15px", border: "solid 1px #daa23e73" }}
              >
                <div className="card-body p-4 text-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <i
                      className="fa-solid fa-star"
                      style={{
                        color: "#daa23e",
                        fontSize: "24px",
                        marginRight: "10px",
                      }}
                    ></i>
                    <h5
                      className="mb-0"
                      style={{ color: "#732882", fontWeight: "600" }}
                    >
                      Why We Need Your Birth Details
                    </h5>
                  </div>
                  <p className="mb-0 text-muted">
                    Your birth details help our expert astrologers create an
                    accurate birth chart and provide personalized predictions
                    based on planetary positions at your birth time.
                  </p>
                </div>
              </div>

              <div
                className="leftcard border-0 shadow-lg"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h4 className="mb-4 text-center">
                    <strong style={{ color: "#732882" }}>
                      Personal Details
                    </strong>
                  </h4>

                  <form onSubmit={handleSubmit}>
                    <UserDetailPersonalFields
                      formData={formData}
                      errors={errors}
                      handleChange={handleChange}
                    />

                    <UserDetailBookingFields
                      bookingDate={bookingDate}
                      bookingTime={bookingTime}
                      duration={duration}
                      errors={errors}
                      setBookingDate={setBookingDate}
                      setBookingTime={setBookingTime}
                      setDuration={setDuration}
                      clearError={(field) =>
                        setErrors((prev) => ({ ...prev, [field]: "" }))
                      }
                    />

                    <UserDetailSummaryBox
                      rate={rate}
                      duration={duration}
                      totalAmount={totalAmount}
                    />

                    <div className="text-center mt-4 mt-md-5">
                      <button
                        type="submit"
                        className="submit-button px-5 py-3 text-white fw-semibold"
                        style={{
                          background:
                            "linear-gradient(45deg, #732882, #8a3399)",
                          border: "none",
                          borderRadius: "50px",
                          fontSize: "18px",
                          boxShadow: "0 4px 15px rgba(115, 40, 130, 0.3)",
                          minWidth: "250px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 6px 20px rgba(115, 40, 130, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 15px rgba(115, 40, 130, 0.3)";
                        }}
                      >
                        Proceed to Pay{" "}
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                      </button>
                    </div>

                    <p
                      className="text-center text-muted mt-4 mb-0"
                      style={{ fontSize: "14px" }}
                    >
                      <i className="fa-solid fa-lock me-1"></i>
                      Your information is secure and will only be used for
                      astrological consultation
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const UserDetailForm = () => {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <UserDetailFormContent />
    </Suspense>
  );
};

export default UserDetailForm;
