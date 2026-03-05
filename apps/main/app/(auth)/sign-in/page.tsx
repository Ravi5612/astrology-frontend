import { Metadata } from "next";
import SignInPageClient from "@/components/features/auth/SignInPageClient";

export const metadata: Metadata = {
  title: "Sign In - Astrology Bharat",
  description: "Sign in to your account and unlock personalized astrology insights.",
};

export default function SignInPage() {
  return <SignInPageClient />;
}
