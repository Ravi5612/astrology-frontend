"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { expertVerifyEmailAction } from "@/src/actions/auth";
import { useAuthStore } from "@/store/useAuthStore";

const VerifyEmailContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuthStore();
    const token = searchParams.get("verification_token") || searchParams.get("token");
    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
    const [message, setMessage] = useState("Verifying your email...");
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid verification link. Please check your email for the correct link.");
            return;
        }

        const verifyEmail = async () => {
            try {
                // Using server action for Httponly cookies
                const result = await expertVerifyEmailAction(token);

                if (result.error) {
                    throw new Error(result.error);
                }

                if (result.success) {
                    if (result.user) {
                        await login("", result.user);
                    }
                    setStatus("success");
                    setMessage("Email verified successfully!");
                    toast.success("Email verified successfully!");
                    
                    const timer = setInterval(() => {
                        setCountdown((prev) => {
                            if (prev <= 1) {
                                clearInterval(timer);
                                const roles = result.user?.roles || [];
                                const isExpert = roles.some((r: any) => 
                                    ["expert", "expert", "Expert", "Expert", "EXPERT"].includes(String(typeof r === 'object' ? r.name : r))
                                );

                                if (isExpert) {
                                    router.push("/dashboard");
                                } else {
                                    const mainUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3000' : window.location.origin.replace('expert.', 'www.'));
                                    window.location.href = `${mainUrl}/profile`;
                                }
                                return 0;
                            }
                            return prev - 1;
                        });
                    }, 1000);
                }
            } catch (err: any) {
                console.error("Verification error:", err);
                setStatus("error");
                const backendMsg = err.message || "Verification failed. The link may be expired or invalid.";
                setMessage(backendMsg);
                toast.error(backendMsg);
            }
        };

        verifyEmail();
    }, [token, router, login]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl text-center border border-gray-100">
                {status === "verifying" && (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-yellow-500 mb-6"></div>
                        <h2 className="text-2xl font-bold text-gray-800">Verifying Email...</h2>
                        <p className="text-gray-500 mt-3">Aligning your profile with our stellar database.</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center animate-in zoom-in duration-500">
                        <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 text-3xl shadow-inner">
                            ✓
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Verified!</h2>
                        <p className="text-gray-600 mt-4 font-medium">{message}</p>
                        
                        <div className="mt-8 px-8 py-3 bg-green-500 text-white rounded-full text-sm font-black uppercase tracking-widest shadow-xl shadow-green-200">
                            Redirecting in {countdown}s
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center animate-in fade-in duration-500">
                        <div className="h-20 w-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 text-3xl shadow-inner">
                            ✕
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Verification Failed</h2>
                        <p className="text-red-500 mt-4 leading-relaxed px-4">{message}</p>
                        <button
                            onClick={() => router.push("/")}
                            className="mt-8 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
                        >
                            Back to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}


