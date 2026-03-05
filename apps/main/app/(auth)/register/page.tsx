import { Metadata } from "next";
import RegisterPageClient from "@/components/features/auth/RegisterPageClient";

export const metadata: Metadata = {
  title: "Sign Up - Astrology Bharat",
  description: "Create your free account and start your cosmic journey today.",
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
