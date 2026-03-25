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

// --- API ---
const API_ENDPOINT = `${getApiUrl()}/auth/email/verify`;

// Disable static generation for this page
export const dynamic = 'force-dynamic';

const VerifyEmailContent: React.FC = () => {
    const { lang } = useLanguageStore();
    const t = authTranslations[lang as keyof typeof authTranslations] || authTranslations.en;

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

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
                const [data, fetchError] = await safeFetch<any>(`${API_ENDPOINT}?token=${token}`, {
                    headers: { "Content-Type": "application/json" },
                });

                if (fetchError) {
                    const status = fetchError.status;
                    const msg = fetchError.body?.message || fetchError.body?.error || fetchError.message || `Server responded with status ${status}.`;
                    
                    if (status === 400 || status === 404) {
                        setError(t.verifyEmail.failedMessage);
                    } else if (status >= 500) {
                        setError(t.resetPassword.errors.failed);
                    } else {
                        setError(msg);
                    }
                } else {
                    setSuccessMessage(data?.message || t.verifyEmail.successMessage);
                    const countdownInterval = setInterval(() => {
                        setCountdown((prev) => {
                            if (prev <= 1) { clearInterval(countdownInterval); router.push('/sign-in'); return 0; }
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
                                            {lang === "hi" ? `${countdown} सेकंड में साइन इन पेज पर पुनर्निर्देशित किया जा रहा है...` : `Redirecting to sign in page in ${countdown} seconds...`}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {!isLoading && (
                                <div className="mt-4">
                                    <Link
                                        href="/sign-in"
                                        className="btn w-100 py-2 fw-semibold bg-primary hover:bg-primary-hover text-white border-0 transition-all font-bold"
                                        style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                    >
                                        {error ? t.verifyEmail.goToSignIn : t.resetPassword.goToSignIn}
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


