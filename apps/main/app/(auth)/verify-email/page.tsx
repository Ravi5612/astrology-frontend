"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getApiUrl } from "@/utils/api-config";
import { useLanguageStore } from "@/store/languageStore";
import { authTranslations } from "@/lib/translations/auth";

import safeFetch from "@packages/safe-fetch/safeFetch";
import { VerificationResponse } from "@/lib/types";
import { verifyEmailAction } from "@/actions/auth";
import { useAuthStore } from "@/store/useAuthStore";

// --- API ---
// (API endpoint is now handled via server action verifyEmailAction)

// Disable static generation for this page
export const dynamic = 'force-dynamic';

const VerifyEmailContent: React.FC = () => {
    const { lang } = useLanguageStore();
    const t = authTranslations[lang as keyof typeof authTranslations] || authTranslations.en;
    const { clientLogin } = useAuthStore();

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('verification_token');

    console.log("[VerifyEmail] Search Params:", searchParams.toString()); // Debug log
    console.log("[VerifyEmail] Extracted Token:", token); // Debug log

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                console.warn("[VerifyEmail] Token missing from URL parameters");
                setError(t.resetPassword.errors.invalidToken);
                setIsLoading(false);
                return;
            }

            try {
                const result = await verifyEmailAction(token);

                if (result.error) {
                    setError(result.error);
                } else if (result.success) {
                    setSuccessMessage(result.message || t.verifyEmail.successMessage);
                    
                    // Handle automatic login
                    if (result.user) {
                        clientLogin(result.user);
                    }

                    const countdownInterval = setInterval(() => {
                        setCountdown((prev) => {
                            if (prev <= 1) { 
                                clearInterval(countdownInterval); 
                                
                                // Redirection Logic
                                const roles = result.user?.roles || [];
                                const isExpert = roles.some(r => 
                                    ["expert", "astrologer", "Expert", "Astrologer", "EXPERT"].includes(String(r))
                                );

                                if (isExpert) {
                                    const dashboardUrl = process.env.NEXT_PUBLIC_ASTROLOGER_DASHBOARD_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3003' : window.location.origin.replace('www.', 'astrologer.'));
                                    window.location.href = `${dashboardUrl}/dashboard`;
                                } else {
                                    router.push('/profile'); 
                                }
                                return 0; 
                            }
                            return prev - 1;
                        });
                    }, 1000);
                }
                setIsLoading(false);
            } catch {
                setError(t.resetPassword.errors.unexpected);
                setIsLoading(false);
            }
        };

        verifyEmail();
    }, [token, router]);

    return (
        <section className="signin-part">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="form-data shadow-sm p-5 rounded-xl bg-white text-center">
                            <div className="mb-4">
                                <Image
                                    src="/images/dummy-astrologer.jpg"
                                    alt="Astrology Bharat"
                                    height={100}
                                    width={100}
                                    className="mx-auto"
                                />
                            </div>

                            <h2
                                className="mb-4"
                                style={{ color: "var(--primary-color)", fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {t.verifyEmail.title}
                            </h2>

                            {isLoading && (
                                <div className="text-center py-4">
                                    <div className="spinner-border text-primary mb-3" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="text-muted" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                        {t.verifyEmail.verifying}
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger mb-4" role="alert">
                                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                                    <strong>Error:</strong> {error}
                                </div>
                            )}

                            {successMessage && (
                                <div className="alert alert-success mb-4" role="alert">
                                    <i className="fa-solid fa-circle-check me-2"></i>
                                    <strong style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                        {t.resetPassword.successTitle}
                                    </strong> {successMessage}
                                    <div className="mt-3">
                                        <p className="mb-0" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                            {lang === "hi" ? `आपको ${countdown} सेकंड में आपके डैशबोर्ड पर ले जाया जा रहा है...` : `Redirecting to your dashboard in ${countdown} seconds...`}
                                        </p>
                                    </div>
                                </div>
                            )}

                             {error && (
                                <div className="mt-4">
                                    <Link
                                        href="/sign-in"
                                        className="btn w-100 py-2 fw-semibold bg-primary hover:bg-primary-hover text-white border-0 transition-all font-bold"
                                        style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                    >
                                        {t.verifyEmail.goToSignIn}
                                    </Link>
                                </div>
                            )}

                            {error && (
                                <div className="mt-3">
                                    <p className="text-muted mb-0" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                        {t.verifyEmail.resendTitle}{" "}
                                        <Link href="/register" className="text-decoration-none">
                                            {t.verifyEmail.resendButton}
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Page: React.FC = () => {
    return (
        <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
};

export default Page;


