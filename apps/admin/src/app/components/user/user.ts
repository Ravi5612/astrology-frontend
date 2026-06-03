export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at?: string | Date | null;
  created_at?: string;
  updated_at?: string;
  avatar?: string;
  is_blocked: boolean;

  profile_client?: {
    id: string;
    phone_number?: string;
    gender?: string;
    date_of_birth?: string | Date | null;
    addresses?: {
      id: string;
      house_no?: string;
      line1?: string;
      city?: string;
      district?: string;
      state?: string;
      country?: string;
      pincode?: string;
      tag?: string;
    }[];
  };

  // UI / Logic derived fields
  phone?: string;
  total_spent?: number;
  total_consultations?: number;
  wallet_balance?: number;
}



