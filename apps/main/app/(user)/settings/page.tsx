import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiClient } from "../../../lib/api-client";
import SettingsForm, { type ProfileData } from "./SettingsForm";
import { PATHS } from "@repo/routes";

const DEFAULT_ADDRESS = {
  street: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  tag: "",
};

// ─── Server Component — fetches profile data before render ───────────────────
export default async function ClientSettingsPage() {
  let initialData: ProfileData;

  try {
    // cookies() makes this request dynamic (no caching) — always fresh data
    cookies(); // opt into dynamic rendering

    const res = await apiClient.get<any>("/client/profile");
    const data = res ?? {};

    initialData = {
      full_name: data.user?.name || "",
      email: data.user?.email || "",
      date_of_birth: data.date_of_birth || "",
      gender: data.gender || "",
      phone: data.phone || "",
      preferences: data.preferences || "",
      language_preference: data.language_preference || "",
      addresses: data.addresses?.length ? data.addresses : [DEFAULT_ADDRESS],
    };
  } catch (err: any) {
    // 401 or network error → redirect to sign in
    if (err?.status === 401 || err?.status === 403) {
      redirect(PATHS.SIGN_IN);
    }
    // For other errors, show empty form (user can still fill manually)
    initialData = {
      full_name: "",
      email: "",
      date_of_birth: "",
      gender: "",
      phone: "",
      preferences: "",
      language_preference: "",
      addresses: [DEFAULT_ADDRESS],
    };
  }

  return <SettingsForm initialData={initialData} />;
}

