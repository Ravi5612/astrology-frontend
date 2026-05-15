export interface AddressDto {
    id?: number;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    zip_code?: string;
    is_primary?: boolean;
    tag?: string;
}

export interface ClientProfileData {
    id?: number;
    userId?: number;
    full_name?: string;
    username?: string;
    date_of_birth?: string;
    time_of_birth?: string;
    place_of_birth?: string;
    gender?: 'male' | 'female' | 'other';
    phone?: string;
    preferences?: string;
    language_preference?: string;
    profile_picture?: string;
    marital_status?: 'single' | 'married' | 'divorced' | 'widowed' | 'other' | string;
    occupation?: string;
    about_me?: string;
    addresses?: AddressDto[];
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

export interface UserDetails {
    name: string;
    gender: "male" | "female" | "other" | "";
    dateOfBirth: string;
    timeOfBirth: string;
    birthLocation: string;
}
export interface UserDetailPersonalFieldsProps {
    formData: UserDetails;
    errors: Partial<Record<keyof UserDetails, string>>;
    handleChange: (e: any) => void;
}

export interface UserDetailBookingFieldsProps {
    bookingDate: string;
    bookingTime: string;
    duration: string;
    errors: Partial<Record<"bookingDate" | "bookingTime", string>>;
    setBookingDate: (date: string) => void;
    setBookingTime: (time: string) => void;
    setDuration: (duration: string) => void;
    clearError: (field: "bookingDate" | "bookingTime") => void;
}

export interface UserDetailFormHeroProps {
    expertName: string;
}

export interface UserDetailSummaryBoxProps {
    rate: string;
    duration: string;
    totalAmount: number;
}
