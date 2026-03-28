export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    created_at?: Date | string;
    createdAt?: Date | string;
}

export interface LeaveDate {
    id: number;
    date: string;
    reason: string;
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export interface Address {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    tag?: string;
}

export interface Profile {
    name: string;
    email: string;
    gender: Gender;
    specialization: string;
    bio?: string;
    experience_in_years: number;
    date_of_birth?: string;
    languages: string[];
    price: number;
    chat_price?: number;
    call_price?: number;
    video_call_price?: number;
    report_price?: number;
    horoscope_price?: number;
    bank_details: string;
    is_available: boolean;
    profilePic?: string;
    kycStatus?: string;
    kycCompleted: boolean;
    addresses: Address[];
    phoneNumber?: string; // Mobile number field
    // Detailed address fields
    houseNo?: string;
    state?: string;
    district?: string;
    country?: string;
    pincode?: string;
    certificates?: string[];
    gallery: string[];
    videos: string[];
    video?: string; // Main introduction video
    detailed_experience: ExperienceItem[];
    custom_services?: CustomService[];
    pujas: PujaService[];
    documents?: DocumentItem[]; // KYC Documents
}

export interface PujaService {
    id?: number;
    type: 'online' | 'home_visit';
    name: string;
    duration_hours: number;
    cost: number;
    description: string;
    districts?: string[];
    samagri_list: SamagriItem[];
}

export interface SamagriItem {
    name: string;
    quantity: string;
}

export interface ExperienceItem {
    id: number;
    title?: string; // Kept for backward compatibility if needed, but not primary
    organization?: string;
    role: string;
    company: string;
    startDate: string;
    endDate: string; // or 'Present'
    description: string;
    isCurrent: boolean;
}

export interface CustomService {
    id: string;
    name: string;
    price: number;
    unit: string;
    description?: string;
}

export interface DocumentItem {
    id: number;
    name: string;
    type: string;
    size?: string;
    url: string;
    uploadedAt?: Date;
    category?: 'aadhar' | 'pan' | 'other';
    side?: 'front' | 'back';
}


