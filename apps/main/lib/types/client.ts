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
